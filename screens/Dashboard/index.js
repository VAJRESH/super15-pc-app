import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonMenuToggle,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical, ellipsisVerticalOutline, menu } from "ionicons/icons";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "../../atom/user.atom";
import IconHeadingText from "../../components/IconHeadingText";
import SideMenu from "../../components/SideMenu";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [user, setUser] = useRecoilState(currentUserAtom);
  const router = useRouter();

  return (
    <IonSplitPane when="sm" contentId="main-content">
      <SideMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonMenuToggle>
                <IonButton>
                  <IonIcon slot="icon-only" icon={ellipsisVertical} color="black"></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle>Hello, Joy</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {/* Not compatible with firebase 9. Please update your app. */}
          <div className={styles.dashboardBody}>
            <div className={styles.dashboardKpis}></div>
            <div className={styles.dashboardBtns}>
              <button>Play Demo</button>
              <button>Play Quiz</button>
            </div>
            <div className={styles.dashboardEdits}>
              <IconHeadingText
                img="/images/dashicons_email-alt2.png"
                heading="Update Email Address"
                data={user.email}
              />
              <IconHeadingText
                img="/images/carbon_password.png"
                heading="Change Password"
                data="* * * * * * * * * *"
              />
              <p style={{ margin: "20px", textAlign: "center" }}>
                Rules and Guidelines?{" "}
                <button onClick={() => router.push("/dashboard")}>
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
