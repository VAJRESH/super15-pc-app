import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { home, key, lockOpen, menu, person } from "ionicons/icons";
import SideMenu from "../../components/SideMenu";

export default function Profile() {
  return (
    <>
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

              <IonTitle>Profile</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            Tap the button in the toolbar to open the menu.
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
