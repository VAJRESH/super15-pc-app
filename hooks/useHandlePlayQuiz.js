import { QuizAtom, getQuizDataObj } from "@/atom/quiz.atom";
import { loadQuestionsData, loadQuizData } from "@/services/queries.services";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function useHandlePlayQuiz() {
  const [quizData, setQuizData] = useRecoilState(QuizAtom);

  useEffect(() => {
    // const quizId = getFormatedDate();
    const quizId = "2024-01-11";

    loadQuizData(quizId)
      .then(async (res) => {
        if (!res) return;

        const questions = (await loadQuestionsData(quizId)) || [];

        setQuizData(getQuizDataObj({ ...(res || {}), questions }));
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(quizData);

  return { quizData };
}
