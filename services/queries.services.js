import { BASE_URL, COLLECTIONS } from "@/helper/constants.helper";
import { getDataWithId, getSubCollectionData } from "@/helper/firebase.helper";

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

  return await getDataWithId(COLLECTIONS?.leaderboards, quizId)
    .then((res) => res)
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

  return await getSubCollectionData(
    COLLECTIONS.userQuizAttempts,
    quizId,
    userId,
  )
    .then((res) => res?.sort((q1, q2) => (q1?.qId < q2?.qId ? -1 : 1)) || [])
    .catch((err) => console.error(err));
}

export async function loadSubscriptionData(userId) {
  return await fetch(`${BASE_URL}/api/subscriptions?userId=${userId}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
