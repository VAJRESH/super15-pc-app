import { CurrentUserAtom } from "@/atom/user.atom";
import { COLLECTIONS } from "@/helper/constants.helper";
import { getDataWithFilter, getDataWithId } from "@/helper/firebase.helper";
import { loadLeaderBoardData } from "@/services/queries.services";
import { where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function useLoadWinners(selectedQuizIds) {
  const user = useRecoilValue(CurrentUserAtom);

  // Accepts a single id or array
  const quizIds = Array.isArray(selectedQuizIds)
    ? selectedQuizIds.filter(Boolean)
    : [selectedQuizIds].filter(Boolean);

  const [leaderboard, setLeaderboard] = useState({});
  const [vpaData, setVpaData] = useState([]);
  const [prizeAmt, setPrizeAmt] = useState({});

  const LAST_QUESTION_INDEX = 14;

  // Helper to flatten all leaderboard arrays
  const winnerUserIds = Object.values(leaderboard || {})
    ?.map((item) => item?.[LAST_QUESTION_INDEX]?.[0]?.userId || null)
    ?.filter((id) => !!id);

  // Load quiz data for all quizIds
  useEffect(() => {
    if (!quizIds.length) return;
    let isMounted = true;
    Promise.all(
      quizIds.map((quizId) =>
        loadLeaderBoardData(quizId).then((res) => [quizId, res]),
      ),
    )
      .then((results) => {
        if (!isMounted) return;
        const data = {};
        results.forEach(([quizId, res]) => {
          data[quizId] = res || {};
        });

        setLeaderboard(data);
      })
      .catch((err) => console.log(err));
    return () => {
      isMounted = false;
    };
  }, [quizIds.join(",")]);

  // Load quiz prize for all quizIds
  useEffect(() => {
    if (!quizIds.length) return;
    let isMounted = true;
    Promise.all(
      quizIds.map(async (quizId) => {
        const prize = await getDataWithId(COLLECTIONS.dailyPrizes, quizId);
        return [quizId, prize?.amount || 0];
      }),
    )
      .then((results) => {
        if (!isMounted) return;
        const prizeData = {};
        results.forEach(([quizId, amount]) => {
          prizeData[quizId] = amount;
        });
        setPrizeAmt(prizeData);
      })
      .catch((err) => console.log(err));
    return () => {
      isMounted = false;
    };
  }, [quizIds.join(",")]);

  // // Listen to all quizIds for real-time updates
  // useEffect(() => {
  //   if (!quizIds.length) return;
  //   const unsubscribes = quizIds.map((quizId) =>
  //     listenToCollectionWithId(COLLECTIONS.leaderboards, quizId, (data) => {
  //       setLeaderboard((prev) => ({ ...prev, [quizId]: data }));
  //     }),
  //   );
  //   return () => {
  //     unsubscribes.forEach((unsub) => unsub && unsub());
  //   };
  // }, [quizIds.join(",")]);

  // Load vpa for all users in all leaderboards
  useEffect(() => {
    if (!user?.isAdmin) return;
    if (!winnerUserIds.length) return;

    const userIds = [...new Set(winnerUserIds)];

    if (!userIds.length) return;

    getDataWithFilter(COLLECTIONS?.vpa, [
      where("userId", "in", [...new Set(userIds)]),
    ])
      .then(setVpaData)
      .catch((err) => console.log(err));
  }, [winnerUserIds?.length, selectedQuizIds?.length, user?.isAdmin]);

  // Attach vpa and prize to users in all leaderboards
  const leaderboardWithVpaAndPrize = {};
  Object.entries(leaderboard).forEach(([quizId, item]) => {
    leaderboardWithVpaAndPrize[quizId] = item?.[LAST_QUESTION_INDEX];
    const firstUser = leaderboardWithVpaAndPrize?.[quizId]?.[0];
    if (firstUser)
      leaderboardWithVpaAndPrize[quizId][0].vpa = vpaData?.find(
        (item) => item.userId === firstUser?.userId,
      )?.vpa;
    // Attach prize amount
    if (leaderboardWithVpaAndPrize[quizId]) {
      leaderboardWithVpaAndPrize[quizId].forEach((entry) => {
        entry.prize = prizeAmt[quizId] || null;
      });
    }
  });

  return {
    quizIds,
    leaderboard: leaderboardWithVpaAndPrize,
  };
}
