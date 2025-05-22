import { CurrentUserAtom } from "@/atom/user.atom";
import { BASE_URL, COLLECTIONS, DEFAULTS } from "@/helper/constants.helper";
import { getDataWithId } from "@/helper/firebase.helper";
import { getFormatedDate } from "@/helper/utils.helper";
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
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import SideMenu from "../../components/SideMenu";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const user = useRecoilValue(CurrentUserAtom);
  const router = useRouter();
  const [activeSubscribers, setActiveSubscribers] = useState(0);
  const [todayPrize, setTodayPrize] = useState(0);

  const { handlePlayQuiz } = useHandlePlayQuiz();
  const userName = user?.displayName?.split(" ")[0] || "";

  useEffect(() => {
    const fetchActiveSubscribers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/active-subscribers`);
        const data = await response.json();
        setActiveSubscribers(data.activeSubscribers);
      } catch (error) {
        console.error("Error fetching active subscribers:", error);
      }
    };

    const fetchTodayPrize = async () => {
      try {
        const today = getFormatedDate();
        const prize = await getDataWithId(COLLECTIONS.dailyPrizes, today);
        setTodayPrize(prize?.amount || 0);
      } catch (error) {
        console.error("Error fetching today's prize:", error);
      }
    };

    fetchActiveSubscribers();
    fetchTodayPrize();
  }, []);

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
          <div className={styles.dashboardBody}>
            <div className={styles.dashboardKpis}>
              <img src="/images/dashboard-img.jpg" alt="" />
            </div>

            <div className={styles.stats}>
              <div>
                <strong>{activeSubscribers.toLocaleString()}+</strong>
                <p>active subscribers</p>
              </div>
              <div>
                <strong>₹{todayPrize.toLocaleString()}</strong>
                <p>today's prize</p>
              </div>
            </div>

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
