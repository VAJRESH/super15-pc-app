import { QuizAtom, UserQuizMapAtom } from "@/atom/quiz.atom";
import useHandlePlayQuiz from "@/hooks/useHandlePlayQuiz";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
import { useRecoilValue } from "recoil";
import Leaderboard from "../../components/Leaderboard";
import QuestionBlock from "../../components/QuestionBlock";
import SideMenu from "../../components/SideMenu";
import SuperIcons from "../../components/SuperIcons";
import { useRouter } from "next/router";

export default function PlayQuiz() {
  const userQuizMap = useRecoilValue(UserQuizMapAtom);
  const quizData = useRecoilValue(QuizAtom);

  const router = useRouter();

  const { currentQuestionIndex, hanldeOpSelection } = useHandlePlayQuiz();

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

                  <p>You will recieve your cashback soon on your UPI Id</p>
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
