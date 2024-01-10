import { IsLoadingAtom, SubscriptionAtom } from "@/atom/global.atom";
import {
  QuizAtom,
  UserQuizMapAtom,
  getQuizDataObj,
  getUserQuizMapDataObj,
} from "@/atom/quiz.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import { COLLECTIONS, DEFAULTS } from "@/helper/constants.helper";
import {
  addUpdateFirestoreData,
  getDataWithId,
} from "@/helper/firebase.helper";
import {
  getCurrentQuestionIndex,
  getFormatedDate,
} from "@/helper/utils.helper";
import {
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
  const [userQuizMap, setUserQuizMap] = useRecoilState(UserQuizMapAtom);
  const [quizData, setQuizData] = useRecoilState(QuizAtom);
  const [isLoading, setIsLoading] = useRecoilState(IsLoadingAtom);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const router = useRouter();

  const [present] = useIonToast();
  const { loadUserSubscription } = useHandleSubscription();

  const quizId = getFormatedDate();

  // check for current question number based on time
  useEffect(() => {
    setCurrentQuestionIndex(getCurrentQuestionIndex());

    const intervalId = setInterval(
      () => setCurrentQuestionIndex(getCurrentQuestionIndex()),
      5000,
    );

    return () => clearInterval(intervalId); // Clear the interval on cleanup
  }, []);

  // load quiz data
  useEffect(() => {
    loadQuizData(quizId)
      .then(async (res) => {
        if (!res) return;

        const questions = (await loadQuestionsData(quizId)) || [];

        setQuizData(getQuizDataObj({ ...(res || {}), questions }));
        setCurrentQuestionIndex(getCurrentQuestionIndex());
      })
      .catch((err) => console.log(err));
  }, []);

  // load user quiz map data
  useEffect(() => {
    if (!user?.uid) return;
    if (userQuizMap?.length) return;

    loadUserQuizMap(user?.uid, quizId)
      .then((res) => {
        const userQuizAttempt = res?.map((r) => getUserQuizMapDataObj(r));
        setUserQuizMap(userQuizAttempt);
        const currentQ = getCurrentQuestionIndex();

        if (
          userQuizAttempt?.[currentQ]?.result === 1 ||
          (userQuizAttempt?.length === currentQ &&
            userQuizAttempt?.[currentQ - 1]?.result)
        )
          router.push("/play-quiz");

        if (userQuizMap?.some((quizMap) => quizMap?.result === 0))
          router.push("/dashboard");
      })
      .catch((err) => console.log(err));
  }, [user?.uid]);

  // to check if user is still not knocked out
  useEffect(() => {
    if (!currentQuestionIndex) return;
    if (!userQuizMap?.length && router.pathname !== "/play-quiz") return;

    if (
      userQuizMap?.some((quizMap) => quizMap?.result === 0) ||
      userQuizMap?.[currentQuestionIndex - 1]?.result !== 1
    )
      router.push("/dashboard");
  }, [currentQuestionIndex]);

  // helper functions
  function alertBox(title, message) {
    present({
      header: title,
      message: message,
      buttons: ["OK"],
    });
  }

  function handlePlayQuiz() {
    // TODO: add check for UPI id

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
      userQuizMap?.some((quizMap) => quizMap?.result === 0) ||
      userQuizMap?.[currentQ - 1]?.result !== 1
    )
      return alertBox(
        "Quiz Failed",
        "You were knocked out for today. Please come back tomorrow",
      );

    if (!subscription?.userId) {
      return loadUserSubscription().then((res) => {
        if (!res?.userId) return;

        router.push("/play-quiz");
      });
    }

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
        if (isCorrect) {
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

        if (!isCorrect) {
          alertBox("Failed", "You are knocked out of today's quiz");

          setTimeout(() => router.push("/dashboard"), 1000);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  return {
    currentQuestionIndex,
    handlePlayQuiz,
    hanldeOpSelection,
  };
}
