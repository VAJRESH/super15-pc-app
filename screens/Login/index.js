import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonProgressBar,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { menu } from "ionicons/icons";
import SideMenu from "../../components/SideMenu";

export default function Login() {
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

              <IonTitle>Login</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            Enter your email and password to login.
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
