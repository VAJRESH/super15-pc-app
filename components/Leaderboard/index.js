import { DEFAULTS } from "@/helper/constants.helper";
import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import styles from "./leaderboard.module.css";
import { CurrentUserAtom } from "@/atom/user.atom";
import { useRecoilValue } from "recoil";

export default function Leaderboard({
  leaderboard = [],
  title = "Leaderboard",
  isAdmin = false,
}) {
  const user = useRecoilValue(CurrentUserAtom);
  const userIndex = leaderboard?.findIndex((item) => item.userId === user?.uid);

  return (
    <>
      <h4 style={{ textAlign: "center" }}>{title}</h4>

      {!isAdmin && userIndex !== -1 && (
        <IonItem
          key={user?.userId}
          style={{
            width: "100%",
            marginBottom: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              background: "rgb(136, 255, 136)",
              padding: "10px",
            }}
          >
            <IonLabel style={{ width: "100%" }}>
              {leaderboard?.[userIndex]?.name || (
                <span
                  style={{
                    textAlign: "center",
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  Answer the question to get rank
                </span>
              )}
            </IonLabel>
            <IonLabel style={{ width: "30px" }}>{userIndex + 1 || ""}</IonLabel>
          </div>
        </IonItem>
      )}

      <div className={styles.board}>
        <IonItem
          style={{
            position: "sticky",
            top: 0,
            zIndex: 2,
            width: "100%",
            height: "40px",
            borderBottom: "1px solid gray",
          }}
        >
          <div style={{ display: "flex", width: "100%" }}>
            <IonLabel style={{ width: "100%" }}>Name</IonLabel>
            <IonLabel style={{ width: "40px" }}>Rank</IonLabel>
          </div>
        </IonItem>

        {!leaderboard?.length && (
          <IonItem>
            <IonLabel style={{ textAlign: "center" }}>No Player Data</IonLabel>
          </IonItem>
        )}

        {leaderboard?.map((user, i) => {
          if (!user?.isCorrect) return;

          return (
            <IonItem
              key={user?.userId}
              style={{
                // display: "flex",
                // gridTemplateColumns: "auto 1fr 20px",
                width: "100%",
              }}
            >
              <IonThumbnail slot="start">
                <img alt="" src={user?.profileImg || DEFAULTS?.profilePic} />
              </IonThumbnail>
              <div style={{ display: "flex", width: "100%" }}>
                <IonLabel style={{ width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{user?.name || ""}</span>
                    {isAdmin && (
                      <span style={{ color: "grey" }}>{user?.vpa || ""}</span>
                    )}
                  </div>
                </IonLabel>
                <IonLabel style={{ width: "40px" }}>{i + 1 || ""}</IonLabel>
              </div>
            </IonItem>
          );
        })}
      </div>
    </>
  );
}
