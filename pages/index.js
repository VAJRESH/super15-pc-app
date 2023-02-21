import Quiz from "../components/Quiz";
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonNote,
  IonPage,
  IonProgressBar,
  IonRedirect,
  IonRoute,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  bowlingBall,
  bowlingBallOutline,
  home,
  key,
  lockOpen,
  menu,
  person,
} from "ionicons/icons";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import SideMenu from "../components/SideMenu";
import Profile from "../screens/Profile";

export default function Home() {
  return (
    <>
      <IonApp>
        <Profile />
      </IonApp>
    </>
  );
}
