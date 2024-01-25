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

export default function Dashboard() {
  const user = useRecoilValue(CurrentUserAtom);
  const router = useRouter();

  const { handlePlayQuiz } = useHandlePlayQuiz();

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
                Hello, <b>{user?.displayName?.split(" ")[0] || ""}</b>
              </IonLabel>
            </IonItem>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {/* Not compatible with firebase 9. Please update your app. */}
          <div className={styles.dashboardBody}>
            <div className={styles.dashboardKpis}></div>
            <div className={styles.dashboardBtns}>
              <IonButton
                size="large"
                onClick={() => router.push("/play-quiz-demo")}
              >
                Play Demo
              </IonButton>
              <IonButton size="large" onClick={handlePlayQuiz}>
                Play Quiz
              </IonButton>
            </div>

            <div className={styles.dashboardEdits}>
              <IconHeadingText
                img="/images/dashicons_email-alt2.png"
                heading="Your Email Address"
                data={user?.email}
              />
              <IconHeadingText
                img="/images/carbon_password.png"
                heading="Change Password"
                data="* * * * * * * * * *"
              />
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
