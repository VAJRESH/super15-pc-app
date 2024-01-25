import { LeaderBoardAtom } from "@/atom/quiz.atom";
import { COLLECTIONS, DEFAULTS } from "@/helper/constants.helper";
import { listenToCollectionWithId } from "@/helper/firebase.helper";
import { getFormatedDate } from "@/helper/utils.helper";
import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styles from "./leaderboard.module.css";

export default function Leaderboard({ currentQuestionIndex = null }) {
  const [leaderboard, setLeaderboard] = useRecoilState(LeaderBoardAtom);

  const quizId = getFormatedDate();

  useEffect(() => {
    if (!quizId) return;

    const unsubscribe = listenToCollectionWithId(
      COLLECTIONS.leaderboards,
      quizId,
      setLeaderboard,
    );

    return unsubscribe;
  }, [quizId]);

  return (
    <>
      <h4 style={{ textAlign: "center" }}>Leaderboard</h4>
      <div className={styles.board}>
        {leaderboard?.[currentQuestionIndex + 1]?.map((user) => {
          if (!user?.isCorrect) return;

          return (
            <IonItem key={user?.userId}>
              <IonThumbnail slot="start">
                <img alt="" src={user?.profileImg || DEFAULTS?.profilePic} />
              </IonThumbnail>
              <IonLabel>{user?.name || ""}</IonLabel>
            </IonItem>
          );
        })}
      </div>
    </>
  );
}
