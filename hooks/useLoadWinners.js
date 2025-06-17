import { COLLECTIONS } from "@/helper/constants.helper";
import {
  getDataWithFilter,
  listenToCollectionWithId,
} from "@/helper/firebase.helper";
import { getFormatedDate } from "@/helper/utils.helper";
import { loadLeaderBoardData } from "@/services/queries.services";
import { where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useLoadWinners() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [vpaData, setVpaData] = useState([]);

  const leaderboardData = Object.values(leaderboard)?.filter((item) =>
    Array.isArray(item),
  );

  // const quizId = "2024-10-04";
  const quizId = getFormatedDate();

  // load quiz data
  useEffect(() => {
    loadLeaderBoardData(quizId)
      .then((res) => setLeaderboard)
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!quizId) return;

    const unsubscribe = listenToCollectionWithId(
      COLLECTIONS.leaderboards,
      quizId,
      setLeaderboard,
    );

    return unsubscribe;
  }, [quizId]);

  // load vpa
  useEffect(() => {
    if (!leaderboardData.length) return;
    const userIds = [];
    leaderboardData?.forEach((item) =>
      item?.forEach((user) => userIds.push(user.userId)),
    );

    getDataWithFilter(COLLECTIONS?.vpa, [
      where("userId", "in", [...new Set(userIds)]),
    ])
      .then(setVpaData)
      .catch((err) => console.log(err));
  }, [leaderboardData.length]);

  return {
    quizId,
    leaderboard: leaderboardData?.map((item) => {
      item.forEach((user) => {
        user.vpa = vpaData.find((vpa) => vpa.userId === user?.userId)?.vpa;
      });

      return item;
    }),
  };
}
