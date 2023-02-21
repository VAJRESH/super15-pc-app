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
import { menu } from "ionicons/icons";
import SideMenu from "../../components/SideMenu";

export default function Dashboard() {
  return (
    <IonSplitPane when="sm" contentId="main-content">
      <SideMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            {/* <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons> */}

            <IonButtons slot="start">
              <IonMenuToggle>
                <IonButton>
                  <IonIcon slot="icon-only" icon={menu}></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>

            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          Tap the button in the toolbar to open the menu.
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
}
