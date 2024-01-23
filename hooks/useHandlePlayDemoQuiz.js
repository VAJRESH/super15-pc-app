import { IsLoadingAtom } from "@/atom/global.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import { DEFAULTS, DEMO_QUIZ_DATA } from "@/helper/constants.helper";
import { getFormatedDate } from "@/helper/utils.helper";
import { useIonToast } from "@ionic/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function useHandlePlayDemoQuiz() {
  const user = useRecoilValue(CurrentUserAtom);
  const [userQuizMap, setUserQuizMap] = useState([]);
  const [isLoading, setIsLoading] = useRecoilState(IsLoadingAtom);

  const [timer, setTimer] = useState(DEFAULTS?.demoQuizQuestionTime);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();

  const [present] = useIonToast();

  const quizData = {
    quizId: "demo",
    date: getFormatedDate(),
    totalQuestions: 15,
    questions: DEMO_QUIZ_DATA || [],
  };

  // check for current question number based on time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setUserQuizMap((prev) => {
        if (prev?.[currentQuestionIndex]?.result !== 1) {
          alertBox("Failed", "You are knocked out of quiz");

          setTimeout(() => router.push("/dashboard"), 1000);
          return [];
        }

        setCurrentQuestionIndex((prev) => prev + 1);
        setTimer(DEFAULTS?.demoQuizQuestionTime);

        return prev;
      });
    }, DEFAULTS?.demoQuizQuestionTime);

    return () => clearInterval(intervalId); // Clear the interval on cleanup
  }, []);

  // update timeleft
  useEffect(() => {
    const t = setTimeout(() => setTimer((prev) => prev - 1000), 1000);

    return () => clearTimeout(t);
  }, [timer, currentQuestionIndex]);

  // helper functions
  function alertBox(title, message) {
    present({
      header: title,
      message: message,
      buttons: ["OK"],
    });
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

    if (!isCorrect) {
      alertBox("Failed", "You are knocked out of quiz");

      setTimeout(() => router.push("/dashboard"), 1000);
    }

    setUserQuizMap((prev) =>
      [...(prev || []), userQuizAttempt]?.sort((m1, m2) =>
        m1?.qId < m2?.qId ? -1 : 1,
      ),
    );
    setIsLoading(false);
  }

  return {
    currentQuestionIndex,
    hanldeOpSelection,
    userQuizMap,
    quizData,
    timer,
  };
}
