import { IsLoadingAtom, SubscriptionAtom } from "@/atom/global.atom";
import {
  LeaderBoardAtom,
  PollDataAtom,
  QuizAtom,
  UserQuizMapAtom,
  getPollDataObj,
  getQuizDataObj,
  getUserQuizMapDataObj,
} from "@/atom/quiz.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import {
  COLLECTIONS,
  DEFAULTS,
  QUESTION_TIMES,
} from "@/helper/constants.helper";
import {
  addUpdateFirestoreData,
  getDataWithId,
  listenToCollectionWithId,
} from "@/helper/firebase.helper";
import {
  getCurrentQuestionIndex,
  getFormatedDate,
} from "@/helper/utils.helper";
import {
  loadLeaderBoardData,
  loadPollData,
  loadQuestionsData,
  loadQuizData,
  loadUserQuizMap,
} from "@/services/queries.services";
import { useIonToast } from "@ionic/react";
import { arrayUnion } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useHandleSubscription from "./useHandleSubscription";

export default function useHandlePlayQuiz() {
  const user = useRecoilValue(CurrentUserAtom);
  const subscription = useRecoilValue(SubscriptionAtom);

  const [leaderboard, setLeaderboard] = useRecoilState(LeaderBoardAtom);
  const [userQuizMap, setUserQuizMap] = useRecoilState(UserQuizMapAtom);
  const [quizData, setQuizData] = useRecoilState(QuizAtom);
  const [isLoading, setIsLoading] = useRecoilState(IsLoadingAtom);
  const [pollData, setPollData] = useRecoilState(PollDataAtom);

  const [superRoundPoll, setSuperRoundPoll] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [timer, setTimer] = useState(null);
  const router = useRouter();

  const [present] = useIonToast();
  const { loadUserSubscription } = useHandleSubscription();

  const quizId = getFormatedDate();

  const isSuperRoundActive =
    currentQuestionIndex < 9
      ? true
      : pollData?.continue?.length > pollData?.quit?.length;

  // set initial time left
  useEffect(() => {
    if (currentQuestionIndex != null) return;

    loadInitialTime();
  }, [currentQuestionIndex]);

  // load and set poll data for 10th question
  useEffect(() => {
    if (currentQuestionIndex !== 9) return;
    if (userQuizMap?.[currentQuestionIndex]?.result !== 1) return;

    loadPollData(quizId)
      .then((res) => {
        if (res?.continue?.includes(user?.uid)) return;
        if (res?.quit?.includes(user?.uid)) return;

        setSuperRoundPoll(true);
      })
      .catch((err) => console.log(err));
  }, [currentQuestionIndex, userQuizMap?.length]);

  // listen to poll data
  useEffect(() => {
    if (currentQuestionIndex < 9) return;

    const unsub = listenToCollectionWithId(
      COLLECTIONS?.superRoundVotes,
      quizId,
      (res) => setPollData(getPollDataObj(res)),
    );

    return unsub;
  }, [currentQuestionIndex]);

  // update timeleft
  useEffect(() => {
    if (currentQuestionIndex == null) return;
    if (timer == null) return;

    const t = setTimeout(() => {
      const currentQ = getCurrentQuestionIndex();

      if (currentQ !== currentQuestionIndex) return loadInitialTime();

      setCurrentQuestionIndex(currentQ);
      setTimer((prev) => prev - 1000);
    }, 1000);
    return () => clearTimeout(t);
  }, [timer, currentQuestionIndex]);

  // load quiz data
  useEffect(() => {
    loadQuizData(quizId)
      .then(async (res) => {
        if (!res) return;

        const questions = (await loadQuestionsData(quizId)) || [];

        setQuizData(getQuizDataObj({ ...(res || {}), questions }));
        loadInitialTime();
      })
      .catch((err) => console.log(err));

    if (!leaderboard?.length && router.pathname === "/play-quiz") {
      loadLeaderBoardData(quizId)
        .then(setLeaderboard)
        .catch((err) => console.log(err));
    }
  }, []);

  // load user quiz map data
  useEffect(() => {
    if (!user?.uid) return;
    if (!quizData?.quizId) return;
    if (userQuizMap?.length) return;

    loadUserQuizMap(user?.uid, quizId)
      .then((res) => {
        const userQuizAttempt = res?.map((r) => getUserQuizMapDataObj(r));
        setUserQuizMap(userQuizAttempt);
        const currentQ = getCurrentQuestionIndex();
        const isQuizPage = router.pathname.includes("/play-quiz");

        // user has no attempts and is on quiz page
        if (!userQuizAttempt?.length) {
          if (isQuizPage) return router.push("/dashboard");

          return;
        }

        if (
          currentQ < 15 &&
          ((userQuizAttempt?.length < 15 &&
            userQuizAttempt?.[currentQ]?.result === 1) ||
            (userQuizAttempt?.length === currentQ &&
              userQuizAttempt?.[currentQ - 1]?.result === 1))
        )
          router.push("/play-quiz");

        if (
          currentQ !== 0 &&
          (userQuizAttempt?.some((quizMap) => quizMap?.result === 0) ||
            currentQ >= 15 ||
            userQuizAttempt?.[currentQ - 1]?.result !== 1)
        )
          router.push("/dashboard");
      })
      .catch((err) => console.log(err));
  }, [user?.uid, userQuizMap?.length, quizData?.quizId]);

  // to check if user is still not knocked out
  useEffect(() => {
    if (!currentQuestionIndex) return;
    if (!userQuizMap?.length && router.pathname !== "/play-quiz") return;

    if (
      currentQuestionIndex !== 0 &&
      !!userQuizMap?.length &&
      (userQuizMap?.some((quizMap) => quizMap?.result === 0) ||
        userQuizMap?.[currentQuestionIndex - 1]?.result !== 1) &&
      router.pathname === "/play-quiz"
    )
      router.push("/lose?message=You are knocked out of quiz");
  }, [currentQuestionIndex]);

  // leaderboard check
  const cuttOff = QUESTION_TIMES?.[currentQuestionIndex]?.cuttOff;
  const leaderboardCount = leaderboard?.[currentQuestionIndex + 1]?.length || 0;
  useEffect(() => {
    if (typeof cuttOff !== "number" || typeof leaderboardCount !== "number")
      return;
    if (cuttOff > leaderboardCount) return;

    router.push("/lose?message=You are knocked out of quiz");
  }, [leaderboardCount, cuttOff]);

  // helper functions
  function alertBox(title, message) {
    present({
      header: title,
      message: message,
      buttons: ["OK"],
    });
  }

  function loadInitialTime() {
    const currentQ = getCurrentQuestionIndex();
    const currentTime = new Date();
    const timeElapsed =
      currentTime.getTime() -
      new Date(
        `${new Date().toDateString()} ${DEFAULTS.quizStartTime}`,
      ).getTime();

    let totalTimeForPreviousQuestions = 0;
    for (const questionTime of QUESTION_TIMES.slice(0, currentQ)) {
      // Iterate only up to Q4
      totalTimeForPreviousQuestions += questionTime.timeLimit;
    }

    const timeLeft =
      QUESTION_TIMES?.[currentQ]?.timeLimit -
      (timeElapsed - totalTimeForPreviousQuestions);

    setCurrentQuestionIndex(currentQ);
    setTimer(timeLeft > 0 ? timeLeft : null);
  }

  async function handlePlayQuiz() {
    // vpa check
    if (!user?.vpa)
      return alertBox("No VPA", "Please add your upi id in profile");

    if (!subscription?.userId) {
      const subData = await loadUserSubscription();
      if (!subData?.userId)
        return alertBox(
          "Please Subscribe",
          "Please Subscribe from subscription tab",
        );
    }

    // if today quiz is not completed
    if (quizData?.totalQuestions !== DEFAULTS.totalQuestions)
      return alertBox(
        "No Quiz",
        "Today there is no quiz. Please come back tomorrow",
      );

    // time check
    const now = new Date();
    const quizStartTime = new Date(
      `${getFormatedDate()}T${DEFAULTS?.quizStartTime}`,
    );
    if (now?.getHours() < quizStartTime?.getHours())
      return alertBox("Not Started", "Quiz has not yet started!");

    // if today quiz is not completed
    if (quizData?.totalQuestions !== DEFAULTS.totalQuestions)
      return alertBox(
        "No Quiz",
        "Today there is no quiz. Please come back tomorrow",
      );

    // if user has not played quiz within first question time limit
    const currentQ = getCurrentQuestionIndex();
    if (currentQ !== 0 && !userQuizMap?.length)
      return alertBox(
        "Quiz Time Up",
        "The time to participate in quiz is over for today. Please come back tomorrow",
      );

    // user has failed today
    if (
      currentQ !== 0 &&
      !!userQuizMap?.length &&
      (userQuizMap?.some((quizMap) => quizMap?.result === 0) ||
        userQuizMap?.[currentQ - 1]?.result !== 1)
    )
      return alertBox(
        "Quiz Failed",
        "You were knocked out for today. Please come back tomorrow",
      );

    router.push("/play-quiz");
  }

  function hanldeOpSelection(op) {
    const isCorrect =
      op?.value === quizData?.questions?.[currentQuestionIndex]?.qOptCorrect;

    const currentQuestion = quizData?.questions?.[currentQuestionIndex];

    const userQuizAttempt = {
      userId: user?.uid,
      quizId: quizData?.quizId,
      qId: currentQuestion?.qSeq,
      answer: op?.value,
      result: isCorrect ? 1 : 0, // 0 for fail, 1 for pass

      createdBy: user?.uid,
    };

    setIsLoading(true);

    addUpdateFirestoreData(
      COLLECTIONS.userQuizAttempts,
      userQuizAttempt,
      `${quizData?.quizId}/${user.uid}/${currentQuestion?.qSeq}`,
      {},
      { createNew: true },
    )
      .then(async () => {
        let shouldSaveToLeaderBoard = null;
        if (isCorrect) shouldSaveToLeaderBoard = true;
        if (currentQuestion === 0) shouldSaveToLeaderBoard = true;
        if (shouldSaveToLeaderBoard) {
          const isLeaderboardPresent = await getDataWithId(
            COLLECTIONS?.leaderboards,
            quizId,
          );

          addUpdateFirestoreData(
            COLLECTIONS.leaderboards,
            {
              [currentQuestion?.qSeq]: arrayUnion({
                userId: user?.uid,
                name: user?.displayName,
                email: user?.email,
                profileImg: user?.photoURL,
                isCorrect,
              }),
            },
            `${quizData?.quizId}`,
            {},
            { createNew: !isLeaderboardPresent },
          );
        }

        setUserQuizMap((prev) =>
          [...(prev || []), userQuizAttempt]?.sort((m1, m2) =>
            m1?.qId < m2?.qId ? -1 : 1,
          ),
        );

        if (!isCorrect)
          router.push("/lose?message=You are knocked out of today's quiz");
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  async function handleVote(isQuit = false) {
    const pollData = await loadPollData(quizId);

    const data = { [isQuit ? "quit" : "continue"]: arrayUnion(user?.uid) };

    setIsLoading(true);
    addUpdateFirestoreData(
      COLLECTIONS.superRoundVotes,
      data,
      quizData?.quizId,
      {},
      { createNew: pollData == null },
    )
      .then(async () => setSuperRoundPoll(null))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  return {
    timer,
    currentQuestionIndex,
    handlePlayQuiz,
    hanldeOpSelection,
    handleVote,
    superRoundPoll,
    isSuperRoundActive,
  };
}
