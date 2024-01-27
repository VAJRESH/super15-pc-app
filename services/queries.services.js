import { BASE_URL, COLLECTIONS } from "@/helper/constants.helper";
import {
  getDataWithFilter,
  getDataWithId,
  getSubCollectionData,
} from "@/helper/firebase.helper";
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

export async function loadLeaderBoardData(quizId = null) {
  if (!quizId) return null;

  return await getDataWithFilter(COLLECTIONS?.leaderboards, [
    where("quizId", "==", quizId),
    where("isCorrect", "==", true),
  ])
    .then((res) => {
      console.log("lead", res);
      return res;
    })
    .catch((err) => console.error(err));
}

export async function loadPollData(quizId = null) {
  if (!quizId) return null;

  return await getDataWithId(COLLECTIONS?.superRoundVotes, quizId)
    .then((res) => res)
    .catch((err) => console.error(err));
}

export async function loadUserQuizMap(userId = null, quizId = null) {
  if (!quizId) return null;
  if (!userId) return null;

  return await getSubCollectionData(
    COLLECTIONS.userQuizAttempts,
    quizId,
    userId,
  )
    .then((res) => res?.sort((q1, q2) => (q1?.qId < q2?.qId ? -1 : 1)) || [])
    .catch((err) => console.error(err));
}

export async function loadSubscriptionData(userId) {
  if (!userId) return null;

  return await fetch(`${BASE_URL}/api/subscriptions?userId=${userId}`, {
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => (res?.body == null ? null : res?.json()))
    .catch((err) => console.log(err));
}

export async function loadVpaData(userId) {
  if (!userId) return null;

  return await fetch(`${BASE_URL}/api/contacts/${userId}`, {
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => (res?.body == null ? null : res?.json()))
    .catch((err) => console.log("err", err));
}
