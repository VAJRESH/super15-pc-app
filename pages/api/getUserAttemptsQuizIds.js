import { adminApp } from "@/helper/backend.helper";
import { COLLECTIONS } from "@/helper/constants.helper";

export default async function getUserAttemptsQuizIds(req, res) {
  const userId = req.query.userId;

  return new Promise(async (resolve) => {
    const db = adminApp;
    const data = await db
      .collection(COLLECTIONS.userQuizAttempts)
      .doc(userId)
      .listCollections();
    const quizIds = data
      .map((q) => q.id)
      ?.sort((q1, q2) => (new Date(q1) > new Date(q2) ? -1 : 1));

    res.status(200).json(quizIds || []);
    resolve();
  });
}
