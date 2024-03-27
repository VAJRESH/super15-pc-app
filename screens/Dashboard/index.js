import { CurrentUserAtom } from "@/atom/user.atom";
import { DEFAULTS } from "@/helper/constants.helper";
import useHandlePlayQuiz from "@/hooks/useHandlePlayQuiz";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonPage,
  IonSplitPane,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import IconHeadingText from "../../components/IconHeadingText";
import SideMenu from "../../components/SideMenu";
import styles from "./dashboard.module.css";
import { showFullScreenAd } from "@/components/Admob";

export default function Dashboard() {
  const user = useRecoilValue(CurrentUserAtom);
  const router = useRouter();

  const { handlePlayQuiz } = useHandlePlayQuiz();
  const userName = user?.displayName?.split(" ")[0] || "";

  return (
    <IonSplitPane when="sm" contentId="main-content">
      <SideMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonMenuToggle>
                <IonButton>
                  <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>

            <IonItem lines="none" onClick={() => router.push("/profile")}>
              <IonAvatar slot="start">
                <img src={user?.photoURL || DEFAULTS?.profilePic} />
              </IonAvatar>
              <IonLabel>
                Hello{!userName?.length ? "!" : ","} <b>{userName}</b>
              </IonLabel>
            </IonItem>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {/* Not compatible with firebase 9. Please update your app. */}
          <div className={styles.dashboardBody}>
            <div className={styles.dashboardKpis}>
              <img src="/images/dashboard-img.jpg" alt="" />
            </div>

            <div className={styles.dashboardBtns}>
              <IonButton
                size="large"
                onClick={() => {
                  showFullScreenAd();
                  router.push("/play-quiz-demo");
                }}
              >
                Play Demo
              </IonButton>
              <IonButton size="large" onClick={handlePlayQuiz}>
                Play Quiz
              </IonButton>
            </div>

            <div className={styles.dashboardEdits}>
              <p style={{ margin: "20px", textAlign: "center" }}>
                Rules and Guidelines?{" "}
                <button onClick={() => router.push("/details")}>
                  Read Here
                </button>
              </p>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
}
