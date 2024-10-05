import IconHeadingText from "@/components/IconHeadingText/index";
import { DEFAULTS, QUESTION_TIMES } from "@/helper/constants.helper";
import { formatTime } from "@/helper/utils.helper";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonSplitPane,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import SideMenu from "../../components/SideMenu";

export default function Details() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(null);

  let totalTimeForPreviousQuestions = 0;
  for (const questionTime of QUESTION_TIMES) {
    totalTimeForPreviousQuestions += questionTime.timeLimit;
  }

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
                <IonLabel>Super 15 Rules</IonLabel>
              </IonItem>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <h3>Brief explanation about this quiz</h3>
            <IconHeadingText
              img="/images/document.svg"
              heading="15 Questions or 11 Questions?"
              data={"Understanding the twist."}
              handleClick={() => setActiveSection(1)}
            />

            <IconHeadingText
              img="/images/clock.svg"
              heading={formatTime(totalTimeForPreviousQuestions, true)}
              data={"Total duration of the quiz. Read more."}
              handleClick={() => setActiveSection(2)}
            />

            {!activeSection && (
              <>
                <h3>
                  Please read the text below carefully so you can understand it
                </h3>

                <IonItem>
                  <IonLabel>
                    Answer each question within the given time to continue.
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Tap on options to select the correct answer
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Click submit if you are sure you want to submit the answer.
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Once submitted your answer cannot be changed even if there
                    is time left.
                  </IonLabel>
                </IonItem>
              </>
            )}

            {activeSection === 1 && (
              <>
                <h4>
                  After 10th question there will be an option in front of all
                  remaining players, to
                </h4>

                <IonItem>
                  <IonLabel>
                    Either quit now and divides the prize pool between them
                    equally.
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Play the SUPER rounds (next 5 questions) and win
                    individually.
                  </IonLabel>
                </IonItem>

                <h5>
                  Super rounds are normal rounds but with one exception. Only
                  the fastest answers will be eligible for next round.
                </h5>
                <IonItem>
                  <IonLabel>
                    Question 11: SUPER 100 - Top {QUESTION_TIMES?.[10]?.cuttOff}{" "}
                    users will be allowed in Question 12.
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Question 12: SUPER 50 - Top {QUESTION_TIMES?.[11]?.cuttOff}{" "}
                    users will be allowed in Question 13.
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Question 13: SUPER 20 - Top {QUESTION_TIMES?.[12]?.cuttOff}{" "}
                    users will be allowed in Question 14.
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Question 14: SUPER 10 - Top {QUESTION_TIMES?.[13]?.cuttOff}{" "}
                    users will be allowed in Question 15.
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Question 15: SUPER FINALE - One winner is declared.
                  </IonLabel>
                </IonItem>
              </>
            )}

            {activeSection === 2 && (
              <>
                <IonGrid>
                  {QUESTION_TIMES?.map((q, i) => {
                    const qStartTime = new Date(
                      `${new Date().toDateString()} ${DEFAULTS.quizStartTime}`,
                    ).getTime();
                    const startTime = new Date(qStartTime);
                    const endTime = new Date(qStartTime);

                    let totalTimeForPreviousQuestions = 0;
                    for (const questionTime of QUESTION_TIMES.slice(0, i)) {
                      totalTimeForPreviousQuestions += questionTime.timeLimit;
                    }

                    if (i > 0)
                      startTime.setMilliseconds(totalTimeForPreviousQuestions);
                    endTime.setMilliseconds(
                      totalTimeForPreviousQuestions +
                        QUESTION_TIMES?.[i]?.timeLimit -
                        DEFAULTS.gapTime,
                    );

                    return (
                      <IonRow>
                        <IonCol size="4" style={{ border: "1px solid black" }}>
                          {q?.questionNumber}
                        </IonCol>
                        <IonCol style={{ border: "1px solid black" }}>
                          {startTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                          {" to "}
                          {endTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </IonCol>
                      </IonRow>
                    );
                  })}
                  <IonRow>
                    <IonCol size="4" style={{ border: "1px solid black" }}>
                      Total Time
                    </IonCol>
                    <IonCol style={{ border: "1px solid black" }}>
                      {formatTime(totalTimeForPreviousQuestions, true)}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </>
            )}

            <IonButton
              expand="full"
              size="large"
              className="ion-margin"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </IonButton>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
