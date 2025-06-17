import Leaderboard from "@/components/Leaderboard/index";
import SideMenu from "@/components/SideMenu/index";
import useLoadWinners from "@/hooks/useLoadWinners";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuToggle,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";

export default function Winners() {
  const { leaderboard } = useLoadWinners();

  return (
    <>
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

              <IonTitle>Winners</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            {leaderboard?.map((item, i) => (
              <Leaderboard
                key={i}
                leaderboard={item}
                isAdmin
                title={`Question ${i + 1}`}
              />
            ))}
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
