import useHandlePlayDemoQuiz from "@/hooks/useHandlePlayDemoQuiz";
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
  IonText,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { useRouter } from "next/router";
import Leaderboard from "../../components/Leaderboard";
import QuestionBlock from "../../components/QuestionBlock";
import SideMenu from "../../components/SideMenu";
import SuperIcons from "../../components/SuperIcons";

export default function DemoQuiz() {
  const router = useRouter();

  const { userQuizMap, quizData, currentQuestionIndex, hanldeOpSelection } =
    useHandlePlayDemoQuiz();
  console.log(currentQuestionIndex);

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
                <IonLabel>Demo Quiz</IonLabel>
              </IonItem>
            </IonToolbar>
          </IonHeader>

          {currentQuestionIndex <= 14 ? (
            <>
              <IonContent className="ion-padding">
                <SuperIcons qSeq={currentQuestionIndex + 1} />
                <QuestionBlock
                  qText={quizData?.questions?.[currentQuestionIndex]?.qText}
                  options={Array(4)
                    .fill()
                    ?.map((_, i) => ({
                      id: i,
                      value:
                        quizData?.questions?.[currentQuestionIndex]?.[
                          `qOpt${i + 1}`
                        ],
                    }))}
                  handleOpSelection={hanldeOpSelection}
                  selectedOp={userQuizMap?.[currentQuestionIndex]?.answer}
                  isCorrect={userQuizMap?.[currentQuestionIndex]?.result}
                />

                <Leaderboard currentQuestionIndex={currentQuestionIndex} />
              </IonContent>
            </>
          ) : (
            <>
              <IonContent style={{ textAlign: "center", fontWeight: "bold" }}>
                <IonText color="secondary">
                  <h1>You Won</h1>
                </IonText>

                <img
                  alt=""
                  src="/images/winner.png"
                  style={{ maxHeight: "350px" }}
                />

                <IonText color="primary">
                  <h2>Congrats!</h2>

                  <p>You have completed demo quiz. Now try real quiz</p>
                </IonText>

                <IonButton onClick={() => router.push("/dashboard")}>
                  Dashboard
                </IonButton>
              </IonContent>
            </>
          )}
        </IonPage>
      </IonSplitPane>
    </>
  );
}
