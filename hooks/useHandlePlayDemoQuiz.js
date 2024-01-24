import { IsLoadingAtom } from "@/atom/global.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import { DEFAULTS, DEMO_QUIZ_DATA } from "@/helper/constants.helper";
import { getFormatedDate } from "@/helper/utils.helper";
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

  const quizData = {
    quizId: "demo",
    date: getFormatedDate(),
    totalQuestions: 15,
    questions: DEMO_QUIZ_DATA || [],
  };

  // check for current question number based on time
  useEffect(() => {
    if (timer !== 1000) return;

    setUserQuizMap((prev) => {
      if (prev?.[currentQuestionIndex]?.result !== 1) {
        router.push("/lose?message=You are knocked out of quiz");

        return [];
      }

      return prev;
    });
    setCurrentQuestionIndex((prev) => prev + 1);
    setTimer(DEFAULTS?.demoQuizQuestionTime);
  }, [timer]);

  // update timeleft
  useEffect(() => {
    if (currentQuestionIndex > 14) return;

    const t = setTimeout(() => setTimer((prev) => prev - 1000), 1000);

    return () => clearTimeout(t);
  }, [timer, currentQuestionIndex]);

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

    setUserQuizMap((prev) =>
      [...(prev || []), userQuizAttempt]?.sort((m1, m2) =>
        m1?.qId < m2?.qId ? -1 : 1,
      ),
    );
    if (!isCorrect) router.push("/lose?message=You are knocked out of quiz");
  }

  return {
    currentQuestionIndex,
    hanldeOpSelection,
    userQuizMap,
    quizData,
    timer,
  };
}
