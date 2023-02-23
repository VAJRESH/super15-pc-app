import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonMenuToggle,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { menu } from "ionicons/icons";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../atom/user.atom";
import SideMenu from "../../components/SideMenu";

export default function Profile() {
  const user = useRecoilValue(currentUserAtom);
  console.log("profile screen", user);
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
            {user.uid} <br/>
            Not compatible with firebase 9. Please update your app.
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
