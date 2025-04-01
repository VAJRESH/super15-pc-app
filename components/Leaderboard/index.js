import { DEFAULTS } from "@/helper/constants.helper";
import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import styles from "./leaderboard.module.css";

export default function Leaderboard({ leaderboard = [] }) {
  return (
    <>
      <h4 style={{ textAlign: "center" }}>Leaderboard</h4>
      <div className={styles.board}>
        {leaderboard?.map((user) => {
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
