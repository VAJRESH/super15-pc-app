import { IsLoadingAtom } from "@/atom/global.atom";
import { getQuestionObj, getQuizDataObj } from "@/atom/quiz.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import { COLLECTIONS, DEFAULTS, MONTHS } from "@/helper/constants.helper";
import {
  addUpdateFirestoreData,
  getDataWithFilter,
} from "@/helper/firebase.helper";
import { getFormatedDate } from "@/helper/utils.helper";
import { loadQuestionsData } from "@/services/queries.services";
import { useIonToast } from "@ionic/react";
import { Timestamp, documentId, increment, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function useHandleCreatQuiz() {
  const user = useRecoilValue(CurrentUserAtom);
  const [monthlyQuizDataArr, setMonthlyQuizDataArr] = useState([]);
  const [quizData, setQuizData] = useState(getQuizDataObj());
  const [questionData, setQuestionData] = useState(getQuestionObj());
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);
  const [isLoading, setIsLoading] = useRecoilState(IsLoadingAtom);

  const ionDatetimePickerRef = useRef(null);
  const [present] = useIonToast();

  // listner for month change
  useEffect(() => {
    // https://forum.ionicframework.com/t/how-to-add-event-listener-on-month-change-event-in-an-ion-datetime/221080/3
    getIonCalendarSelectedMonth();
  }, []);

  // load quiz for selected month
  useEffect(() => {
    if (!selectedMonthYear) return;

    const selectedData = selectedMonthYear?.split(" ");
    const selectedMonth = MONTHS.findIndex(
      (month) => month?.toLowerCase() === selectedData?.[0]?.toLowerCase(),
    );
    const selectedYear = selectedData?.[1];

    const startOfMonth = getFormatedDate(
      new Date(selectedYear, selectedMonth, 1),
    );
    const endOfMonth = getFormatedDate(
      new Date(selectedYear, selectedMonth + 1, 0),
    );

    const isSelectedMonthDataPresent = monthlyQuizDataArr?.find(
      (quiz) => quiz?.date?.slice(5, 7) === startOfMonth?.slice(5, 7),
    );
    if (isSelectedMonthDataPresent) return;

    if (!monthlyQuizDataArr?.length) setIsLoading(true);
    getDataWithFilter(COLLECTIONS.quiz, [
      where(documentId(), ">=", startOfMonth),
      where(documentId(), "<=", endOfMonth),
    ])
      .then((res) =>
        setMonthlyQuizDataArr((prev) => [
          ...(prev || []),
          ...res?.map((quiz) =>
            getQuizDataObj({
              ...(quiz || {}),
              createdAt: quiz?.createdAt?.toDate(),
              updatedAt: quiz?.updatedAt?.toDate(),
            }),
          ),
        ]),
      )
      .finally(() => setIsLoading(false));
  }, [selectedMonthYear]);

  // helper functions
  function alertBox(title, message) {
    present({
      header: "Alert",
      subHeader: title,
      message: message,
      buttons: ["OK"],
    });
  }

  function getIonCalendarSelectedMonth() {
    let previous = "";
    const targetNode = document.querySelector("ion-datetime#calendar");
    const config = { attributes: true, childList: true, subtree: true };

    const callback = function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === "attributes") {
          var e = document
            ?.querySelector("ion-datetime#calendar")
            ?.shadowRoot?.querySelector("ion-label")?.textContent;
          if (e !== previous) {
            previous = e;
            setSelectedMonthYear(e);
          }
        }
      }
    };

    if (!targetNode) return;
    try {
      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    } catch (err) {
      console.log(err);
    }
  }

  // state updates
  function handleQuizDataUpdate(obj = {}) {
    setQuizData((prev) => getQuizDataObj({ ...(prev || {}), ...(obj || {}) }));
  }

  function handleQuestionDataUpdate(obj = {}) {
    setQuestionData((prev) =>
      getQuestionObj({ ...(prev || {}), ...(obj || {}) }),
    );
  }

  // mutations
  async function handleDateConfirm(quizId = null) {
    if (!quizId) return;

    setIsLoading(true);
    const _quizData =
      monthlyQuizDataArr?.find((quiz) => quiz?.quizId === quizId) || null;

    const quizDataObj = {
      quizId,
      date: quizId,
      totalQuestions: _quizData?.totalQuestions || 0,

      createdBy: _quizData?.createdBy || user?.uid,
      createdAt: _quizData?.createdAt || Timestamp.fromDate(new Date()),

      updatedBy: user?.uid,
      updatedAt: Timestamp.fromDate(new Date()),
      status: _quizData?.status || "active",
    };

    await addUpdateFirestoreData(
      COLLECTIONS?.quiz,
      quizDataObj,
      quizId,
      {},
      { createNew: !_quizData?.quizId },
    )?.catch((err) =>
      alertBox("Error", err?.message || "Something went wrong"),
    );

    setIsLoading(false);
    const qIndex = monthlyQuizDataArr?.findIndex(
      (quiz) => quiz?.quizId === quizId,
    );

    const allQuizs = [...(monthlyQuizDataArr || [])];
    if (qIndex === -1) allQuizs?.push(quizDataObj);
    if (qIndex !== -1) allQuizs?.splice(qIndex, 1, quizDataObj);

    setMonthlyQuizDataArr(allQuizs);

    const allQuizQuestions = (await loadQuestionsData(quizId)) || [];

    handleQuizDataUpdate({
      ...(quizDataObj || {}),
      questions: allQuizQuestions,
    });

    handleQuestionDataUpdate(
      getQuestionObj({
        qSeq:
          allQuizQuestions?.length === 15 ? null : allQuizQuestions?.length + 1,
        qId: quizDataObj?.quizId,
        date: quizDataObj?.quizId,
        createdBy: user?.uid,

        updatedBy: user?.uid,
      }),
    );
  }

  function hasDuplicateOptions() {
    const optionArr = [
      questionData.qOpt1,
      questionData.qOpt2,
      questionData.qOpt3,
      questionData.qOpt4,
    ];
    return new Set(optionArr).size !== optionArr.length;
  }

  async function handleSaveQuestion() {
    if (!questionData.qText)
      return alertBox(
        "Question is empty",
        "Quiz must have some question texts.",
      );

    if (
      !questionData.qOpt1 ||
      !questionData.qOpt2 ||
      !questionData.qOpt3 ||
      !questionData.qOpt4
    )
      return alertBox("Option is empty", "Quiz must have 4 options");

    if (!questionData.qOptCorrectIndex) {
      return alertBox(
        "Choose Correct Option",
        "Quiz must have one correct option",
      );
    }

    if (hasDuplicateOptions())
      return alertBox(
        "Duplicate Options",
        "Cannot have same option more than once.",
      );

    const isUpdate = questionData?.qSeq <= quizData?.totalQuestions;

    const _questionData = {
      qId: quizData?.quizId || null,
      date: quizData?.quizId || null,
      qSeq: questionData?.qSeq || 1,
      qText: questionData?.qText?.trim() || "",
      qOpt1: questionData?.qOpt1?.trim() || "",
      qOpt2: questionData?.qOpt2?.trim() || "",
      qOpt3: questionData?.qOpt3?.trim() || "",
      qOpt4: questionData?.qOpt4?.trim() || "",
      qOptCorrect:
        questionData?.[`qOpt${questionData?.qOptCorrectIndex}`]?.trim(),
      createdAt: Timestamp.fromDate(new Date()),
      createdBy: user.uid,
    };

    setIsLoading(true);
    await addUpdateFirestoreData(
      COLLECTIONS.quiz,
      _questionData,
      `${quizData?.quizId}/${COLLECTIONS?.questions}/${_questionData?.qSeq}`,
      {},
      { createNew: !isUpdate },
    )?.catch((err) =>
      alertBox("Error", err?.message || "Something went wrong"),
    );

    if (!isUpdate) {
      await addUpdateFirestoreData(
        COLLECTIONS?.quiz,
        { totalQuestions: increment(1) },
        quizData?.quizId,
      )?.catch((err) =>
        alertBox("Error", err?.message || "Something went wrong"),
      );
    }

    setIsLoading(false);

    const quizDataToUpdate = {
      totalQuestions: quizData?.totalQuestions || 0,
      questions: quizData?.questions || [],
    };
    if (isUpdate) {
      quizDataToUpdate?.questions?.splice(
        questionData?.qSeq - 1,
        1,
        questionData,
      );
    } else {
      ++quizDataToUpdate.totalQuestions;
      quizDataToUpdate?.questions?.push(questionData);
    }

    handleQuizDataUpdate(quizDataToUpdate);
    if (questionData?.qSeq === DEFAULTS?.totalQuestions) return;

    setQuestionData(
      getQuestionObj({
        ...(quizData?.questions?.[questionData?.qSeq] || {}),
        qId: quizData?.quizId,
        date: quizData?.quizId,
        qSeq: questionData?.qSeq + 1,
        createdBy: user?.uid,
        updatedBy: user?.uid,
      }),
    );
  }

  return {
    ionDatetimePickerRef,

    monthlyQuizDataArr,
    quizData,
    handleQuizDataUpdate,
    handleDateConfirm,

    questionData,
    handleQuestionDataUpdate,
    handleSaveQuestion,
  };
}
