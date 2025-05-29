import { DEFAULTS } from "@/helper/constants.helper";
import { getFormatedDate } from "@/helper/utils.helper";
import useHandleCreatQuiz from "@/hooks/useHandleCreatQuiz";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenuToggle,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonSplitPane,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { getQuestionObj } from "../../atom/quiz.atom";
import SideMenu from "../../components/SideMenu";
import SuperIcons from "../../components/SuperIcons";
import styles from "./createQuiz.module.css";
import DailyPrize from "@/components/DailyPrize/index";
import { useState } from "react";

export default function CreateQuiz() {
  const {
    ionDatetimePickerRef,
    monthlyQuizDataArr,
    quizData,
    handleQuizDataUpdate,
    handleDateConfirm,

    questionData,
    handleQuestionDataUpdate,
    handleSaveQuestion,
  } = useHandleCreatQuiz();

  const [dailyPrize, setDailyPrize] = useState(false);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

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

              <IonTitle>Create Quiz</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            {quizData?.date == null && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1em",
                  }}
                >
                  <h4>Select Quiz Date</h4>
                  <IonDatetime
                    ref={ionDatetimePickerRef}
                    id="calendar"
                    presentation="date"
                    min={getFormatedDate(minDate)}
                    highlightedDates={monthlyQuizDataArr?.map((quiz) => {
                      const isQuizComplete =
                        quiz?.totalQuestions === DEFAULTS?.totalQuestions;

                      return {
                        date: quiz?.date,
                        textColor: isQuizComplete ? "#09721b" : "#800080",
                        backgroundColor: isQuizComplete ? "#c8e5d0" : "#ffc0cb",
                      };
                    })}
                    onIonChange={(e) =>
                      handleDateConfirm(e?.detail?.value?.split("T")?.[0])
                    }
                  >
                    <IonButtons slot="buttons">
                      <IonButton
                        color="danger"
                        onClick={() => ionDatetimePickerRef?.current?.reset()}
                      >
                        Reset
                      </IonButton>
                      <IonButton
                        color="primary"
                        onClick={() => ionDatetimePickerRef?.current?.confirm()}
                      >
                        Confirm
                      </IonButton>
                    </IonButtons>
                  </IonDatetime>
                </div>
              </>
            )}

            {quizData?.date != null && (
              <>
                {questionData?.qSeq != null ? (
                  <>
                    <SuperIcons qSeq={questionData?.qSeq} />
                    <div className={styles.createQuizHeader}>
                      <div>
                        <h4>Quiz Date</h4>
                        <p>
                          {new Date(quizData?.date)?.toDateString()}{" "}
                          <img
                            src="/images/carbon_edit (1).png"
                            alt=""
                            onClick={() => handleQuizDataUpdate({ date: null })}
                          />
                        </p>
                      </div>

                      <div>
                        <h4>Question Number</h4>
                        <p>{questionData.qSeq}</p>
                      </div>
                    </div>

                    <IonList>
                      <IonItem>
                        <IonSelect
                          selectedText={`Select Question Number: ${questionData?.qSeq}`}
                          value={questionData?.qSeq}
                          onIonChange={(e) => {
                            const qSeq = e.target?.value;
                            if (qSeq < 0) return setDailyPrize(true);

                            const questionData =
                              quizData?.questions?.[qSeq - 1];

                            handleQuestionDataUpdate(
                              getQuestionObj({
                                ...(questionData || {}),
                                qSeq,
                              }),
                            );
                          }}
                        >
                          <IonSelectOption value={-1}>
                            Set Prize
                          </IonSelectOption>
                          {Array(DEFAULTS?.totalQuestions)
                            .fill()
                            .map((_, index) => (
                              <IonSelectOption
                                key={index}
                                value={index + 1}
                                disabled={quizData?.totalQuestions < index}
                              >
                                {index + 1}
                              </IonSelectOption>
                            ))}
                        </IonSelect>
                      </IonItem>
                    </IonList>

                    <h4>Add Question</h4>
                    <IonItem>
                      <IonTextarea
                        placeholder="Add question here"
                        autoGrow={true}
                        spellcheck={true}
                        rows={4}
                        class={styles.textarea}
                        value={questionData.qText}
                        onIonChange={(e) =>
                          handleQuestionDataUpdate({
                            qText: e.target?.value,
                          })
                        }
                      ></IonTextarea>
                    </IonItem>

                    <h4>Enter options and choose correct answer</h4>
                    <IonRadioGroup
                      value={questionData?.qOptCorrectIndex}
                      onIonChange={(e) =>
                        handleQuestionDataUpdate({
                          qOptCorrectIndex: e.target?.value,
                        })
                      }
                    >
                      {Array(4)
                        .fill()
                        .map((_, index) => (
                          <div key={index}>
                            Option {index + 1}{" "}
                            <input
                              type="text"
                              value={questionData?.[`qOpt${index + 1}`]}
                              onChange={(e) =>
                                handleQuestionDataUpdate({
                                  [`qOpt${index + 1}`]: e.target?.value,
                                })
                              }
                            />
                            <IonRadio
                              mode="md"
                              slot="end"
                              value={index + 1}
                              disabled={!questionData?.[`qOpt${index + 1}`]}
                            ></IonRadio>
                          </div>
                        ))}
                    </IonRadioGroup>

                    <div className={styles.buttonGrp}>
                      <button
                        className={styles.back}
                        onClick={() => handleQuizDataUpdate({ date: null })}
                      >
                        Back
                      </button>

                      <button
                        className={styles.save}
                        disabled={
                          !quizData?.quizId ||
                          !questionData?.qSeq ||
                          !questionData?.qText ||
                          !questionData?.qOpt1 ||
                          !questionData?.qOpt2 ||
                          !questionData?.qOpt3 ||
                          !questionData?.qOpt4 ||
                          !questionData?.qOptCorrectIndex
                        }
                        onClick={handleSaveQuestion}
                      >
                        {questionData?.qSeq <= quizData?.totalQuestions
                          ? "Update"
                          : "Save & Next"}
                      </button>
                    </div>
                  </>
                ) : (
                  questionData?.qSeq == null && (
                    <>
                      <h4>Date : {new Date(quizData?.date)?.toDateString()}</h4>
                      <h4>
                        {DEFAULTS?.totalQuestions} Questions already added for
                        this date.
                      </h4>

                      <IonList>
                        <IonItem>
                          <IonSelect
                            selectedText={`Select Question Number: ${
                              questionData?.qSeq || ""
                            }`}
                            value={questionData?.qSeq}
                            onIonChange={(e) => {
                              const qSeq = e.target?.value;
                              const questionData =
                                quizData?.questions?.[qSeq - 1];

                              handleQuestionDataUpdate(
                                getQuestionObj({
                                  ...(questionData || {}),
                                  qSeq,
                                }),
                              );
                            }}
                          >
                            <IonSelectOption value={-1}>
                              Set Prize
                            </IonSelectOption>
                            {Array(DEFAULTS?.totalQuestions)
                              .fill()
                              .map((_, index) => (
                                <IonSelectOption
                                  key={index}
                                  value={index + 1}
                                  disabled={quizData?.totalQuestions < index}
                                >
                                  {index + 1}
                                </IonSelectOption>
                              ))}
                          </IonSelect>
                        </IonItem>
                      </IonList>

                      <IonButton
                        color="danger"
                        onClick={() => handleQuizDataUpdate({ date: null })}
                      >
                        Select a new date
                      </IonButton>
                    </>
                  )
                )}
              </>
            )}

            <DailyPrize
              isOpen={dailyPrize}
              onClose={() => setDailyPrize(false)}
              date={quizData?.date}
            />
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
