import { LeaderBoardAtom, QuizAtom, UserQuizMapAtom } from "@/atom/quiz.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import { COLLECTIONS, SUBSCRIBTIONS } from "@/helper/constants.helper";
import {
  listenToCollectionWithId,
  getDataWithId,
} from "@/helper/firebase.helper";
import { formatTime, getFormatedDate } from "@/helper/utils.helper";
import useHandlePlayQuiz from "@/hooks/useHandlePlayQuiz";
import {
  IonBadge,
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
  IonSplitPane,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical, timeOutline } from "ionicons/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Leaderboard from "../../components/Leaderboard";
import QuestionBlock from "../../components/QuestionBlock";
import SideMenu from "../../components/SideMenu";
import SuperIcons from "../../components/SuperIcons";
import styles from "./playQuiz.module.css";
import { PlansAtom } from "@/atom/global.atom";

export default function PlayQuiz() {
  const user = useRecoilValue(CurrentUserAtom);
  const plans = useRecoilValue(PlansAtom);
  const userQuizMap = useRecoilValue(UserQuizMapAtom);
  const quizData = useRecoilValue(QuizAtom);

  const [leaderboard, setLeaderboard] = useRecoilState(LeaderBoardAtom);
  const router = useRouter();

  const {
    breakTime,
    currentQuestionIndex,
    hanldeOpSelection,
    timer,
    handleVote,
    superRoundPoll,
    isSuperRoundActive,
    pollData,
    quizId,
  } = useHandlePlayQuiz();

  const [dailyPrize, setDailyPrize] = useState(0);

  useEffect(() => {
    if (!quizId) return;

    const unsubscribe = listenToCollectionWithId(
      COLLECTIONS.leaderboards,
      quizId,
      setLeaderboard,
    );

    return unsubscribe;
  }, [quizId]);

  useEffect(() => {
    const fetchDailyPrize = async () => {
      try {
        const prize = await getDataWithId(COLLECTIONS.dailyPrizes, quizId);
        setDailyPrize(prize?.amount || 0);
      } catch (error) {
        console.error("Error fetching daily prize:", error);
      }
    };

    fetchDailyPrize();
  }, []);

  const isQuizActive = currentQuestionIndex <= 14 && isSuperRoundActive;
  const totalVotes = pollData?.continue?.length + pollData?.quit.length;
  const quitPercentage = ((pollData?.quit?.length / totalVotes) * 100).toFixed(
    2,
  );
  const continuePercentage = (
    (pollData?.continue?.length / totalVotes) *
    100
  ).toFixed(2);
  const isPollDisabled =
    pollData?.continue?.includes(user?.uid) ||
    pollData?.quit?.includes(user?.uid);

  const prizePool = dailyPrize;

  return (
    <>
      <IonSplitPane when="sm" contentId="main-content">
        <SideMenu />

        <IonPage id="main-content">
          {timer === null ? (
            <IonPage id="main-content">
              <IonModal
                isOpen={breakTime != null}
                showBackdrop={true}
                className={styles.superRoundModal}
                style={{ display: "flex" }}
              >
                <video src="/video/ad-video.mp4" autoPlay></video>
              </IonModal>

              <IonContent>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IonItem>
                    Next Question Will start at
                    <IonBadge
                      style={{
                        display: "flex",
                        margin: "10px",
                        gap: "0.2em",
                      }}
                    >
                      <IonIcon icon={timeOutline}></IonIcon>
                      {formatTime(breakTime)}
                    </IonBadge>
                  </IonItem>
                </div>
              </IonContent>
            </IonPage>
          ) : (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="end">
                    <IonMenuToggle>
                      <IonButton>
                        <IonIcon
                          slot="icon-only"
                          icon={ellipsisVertical}
                        ></IonIcon>
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
                {isQuizActive ? (
                  <>
                    <IonContent
                      className="ion-padding"
                      key={currentQuestionIndex}
                    >
                      <SuperIcons qSeq={currentQuestionIndex + 1} />
                      <QuestionBlock
                        prizePool={prizePool}
                        currentUsersCount={
                          leaderboard?.[currentQuestionIndex + 1]?.length
                        }
                        qText={
                          quizData?.questions?.[currentQuestionIndex]?.qText
                        }
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

                      <Leaderboard
                        leaderboard={leaderboard?.[currentQuestionIndex + 1]}
                      />
                    </IonContent>
                  </>
                ) : (
                  <>
                    <IonContent
                      style={{ textAlign: "center", fontWeight: "bold" }}
                    >
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

                        <p>
                          You will recieve your cashback soon on your UPI Id
                        </p>
                      </IonText>

                      <IonButton onClick={() => router.push("/dashboard")}>
                        Dashboard
                      </IonButton>
                    </IonContent>
                  </>
                )}
              </IonContent>
            </>
          )}
        </IonPage>

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
                  disabled={isPollDisabled}
                  style={{
                    background: `linear-gradient(to right, var(--danger) ${quitPercentage}%, transparent 0%)`,
                  }}
                  onClick={() => handleVote(true)}
                >
                  Quit ({quitPercentage}%)
                </IonButton>
                <IonButton
                  fill="outline"
                  style={{
                    background: `linear-gradient(to right, var(--success) ${continuePercentage}%, transparent 0%)`,
                  }}
                  disabled={isPollDisabled}
                  onClick={() => handleVote(false)}
                >
                  Continue ({continuePercentage}%)
                </IonButton>
              </div>
            </div>
          </IonModal>
        )}
      </IonSplitPane>
    </>
  );
}
