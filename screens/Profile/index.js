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
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { menu } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../atom/user.atom";
import SideMenu from "../../components/SideMenu";
import { db } from "../../helper/firebase.helper";

export default function Profile() {
  const user = useRecoilValue(currentUserAtom);

  console.log(user);
  const qCollectionRef = collection(db, "questions");

  const getAllQuestions = () => {
    return getDocs(qCollectionRef);
  };

  const [dbQuestions, setDbQuestions] = useState([]);
  
  useEffect(() => {
    const unsub = onSnapshot(qCollectionRef, (querySnapshot) => {
      let qarray = [];
      querySnapshot.forEach((docu) => {
        qarray.push(docu.data().qText);
        console.log(docu.id, " => ", docu.data().qText);
      });
      setDbQuestions(qarray);
    });
    unsub();
  }, []);

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
          <IonContent className="ion-padding">{dbQuestions.map(q => { return <>{q} <br /></> })}</IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
