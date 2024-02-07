import { QuizAtom, UserQuizMapAtom } from "@/atom/quiz.atom";
import useHandlePlayQuiz from "@/hooks/useHandlePlayQuiz";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonModal,
  IonPage,
  IonBadge,
  IonSplitPane,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical, timeOutline } from "ionicons/icons";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Leaderboard from "../../components/Leaderboard";
import QuestionBlock from "../../components/QuestionBlock";
import SideMenu from "../../components/SideMenu";
import SuperIcons from "../../components/SuperIcons";
import styles from "./playQuiz.module.css";
import { formatTime } from "@/helper/utils.helper";

export default function PlayQuiz() {
  const userQuizMap = useRecoilValue(UserQuizMapAtom);
  const quizData = useRecoilValue(QuizAtom);

  const router = useRouter();

  const {
    currentQuestionIndex,
    hanldeOpSelection,
    timer,
    handleVote,
    superRoundPoll,
    isSuperRoundActive,
  } = useHandlePlayQuiz();

  const isQuizActive = currentQuestionIndex <= 14 && isSuperRoundActive;

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
                <IonLabel>
                  {isQuizActive
                    ? `Question ${currentQuestionIndex + 1}`
                    : "Quiz"}
                </IonLabel>

                {!!isQuizActive && (
                  <IonBadge
                    slot="end"
                    style={{ display: "flex", gap: "0.2em" }}
                  >
                    <IonIcon icon={timeOutline}></IonIcon>
                    {formatTime(timer)}
                  </IonBadge>
                )}
              </IonItem>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {!!superRoundPoll && (
              <IonModal
                isOpen={true}
                showBackdrop={true}
                className={styles.superRoundModal}
                style={{ display: "flex" }}
              >
                <div>
                  <h4 className={styles.title}>Quit or Continue</h4>

                  <h6>Quit now & share prize money with all</h6>
                  <p>OR</p>
                  <h6>Continue and become solo winner</h6>

                  <div className={styles.btns}>
                    <IonButton
                      color="danger"
                      fill="outline"
                      onClick={() => handleVote(true)}
                    >
                      Quit
                    </IonButton>
                    <IonButton fill="outline" onClick={() => handleVote(false)}>
                      Continue
                    </IonButton>
                  </div>
                </div>
              </IonModal>
            )}

            {isQuizActive ? (
              <>
                <IonContent className="ion-padding" key={currentQuestionIndex}>
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
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
