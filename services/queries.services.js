import { COLLECTIONS } from "@/helper/constants.helper";
import {
  getDataWithFilter,
  getDataWithId,
  getSubCollectionData,
} from "@/helper/firebase.helper";
import { getFormatedDate } from "@/helper/utils.helper";
import { where } from "firebase/firestore";

export async function loadQuestionsData(quizId = null) {
  if (!quizId) return null;

  return await getSubCollectionData(
    COLLECTIONS.quiz,
    quizId,
    COLLECTIONS.questions,
  )
    .then((res) => res?.sort((q1, q2) => (q1?.qSeq < q2?.qSeq ? -1 : 1)))
    .catch((err) => console.error(err));
}

export async function loadQuizData(quizId = null) {
  if (!quizId) return null;

  return await getDataWithId(COLLECTIONS?.quiz, quizId)
    .then((res) => res)
    .catch((err) => console.error(err));
}

export async function loadSubscriptionData() {
  return await getDataWithFilter(
    COLLECTIONS.subscriptions,
    [where("expiryDate", ">=", getFormatedDate())],
    1,
  )
    .then((res) => res)
    .catch((err) => console.log(err));
}
