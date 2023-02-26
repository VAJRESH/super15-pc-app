import {
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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { ellipsisVertical, menu } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../atom/user.atom";
import Leaderboard from "../../components/Leaderboard";
import QuestionBlock from "../../components/QuestionBlock";
import SideMenu from "../../components/SideMenu";
import SuperIcons from "../../components/SuperIcons";
import { db } from "../../helper/firebase.helper";

export default function PlayQuiz() {
  const user = useRecoilValue(currentUserAtom);

  const qCollectionRef = collection(db, "questions");

  const [dbQuestions, setDbQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);

  useEffect(async () => {
    const unsub = onSnapshot(qCollectionRef, (querySnapshot) => {
      let qarray = [];
      querySnapshot.forEach((docu) => {
        qarray.push(docu.data());
        // console.log(docu.id, " => ", docu.data().qText);
      });
      let sortedQuestionArr = qarray.sort((a, b) => a.qSeq - b.qSeq);
      setDbQuestions(sortedQuestionArr);
    });
    // unsub();

    console.log(dbQuestions);
  }, []);


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

              <IonItem lines="none">
                <IonLabel>Quiz</IonLabel>
              </IonItem>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <SuperIcons qSeq={currentQ + 1} />
            <QuestionBlock
              data={dbQuestions[currentQ]}
              setCurrentQ={setCurrentQ}
            />
            <Leaderboard />
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
