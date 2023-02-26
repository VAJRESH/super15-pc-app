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
  useIonAlert,
} from "@ionic/react";
import { ellipsisVertical, logIn } from "ionicons/icons";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { questionAtom } from "../../atom/question.atom";
import SideMenu from "../../components/SideMenu";
import { db } from "../../helper/firebase.helper";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getCountFromServer,
  Timestamp,
} from "firebase/firestore";

import styles from "./createQuiz.module.css";
import { currentUserAtom } from "../../atom/user.atom";
import SuperIcons from "../../components/SuperIcons";

export default function CreateQuiz() {
  const [createQuizState, setCreateQuizState] = useState(0);
  const [user, setUser] = useRecoilState(currentUserAtom);
  const [question, setQuestion] = useRecoilState(questionAtom);

  const [loading, setloading] = useState(true);

  const router = useRouter();
  const [presentAlert] = useIonAlert();
  const datetime = useRef(null);

  const reset = () => {
    datetime.current?.reset();
  };
  const confirm = () => {
    datetime.current?.confirm();
  };

  function onConfirm(e) {
    setQuestion({
      ...question,
      date: e.detail?.value?.split("T")[0],
    });
    setCreateQuizState(1);
  }

  function hasDuplicates(array) {
    return new Set(array).size !== array.length;
  }
  const clearQuestionRecoil = () => {
    console.log('function called!')
    setQuestion({
      qId: "",
      date: "",
      qSeq: "",
      qText: "",
      qOpt1: "",
      qOpt2: "",
      qOpt3: "",
      qOpt4: "",
      qOptCorrect: false,
      createdAt: "",
      createdBy: "",
      updatedAt: "",
      updatedBy: "",
      status: "",
    });
  };
  const qCollectionRef = collection(db, "questions");

  const addQuestion = (newQuestion) => {
    return addDoc(qCollectionRef, newQuestion);
  };

  async function saveQuestionToFirestore() {
    if (!question.qText) {
      presentAlert({
        header: "Alert",
        subHeader: "Question is empty",
        message: "Quiz must have some question texts.",
        buttons: ["OK"],
      });
      return;
    }
    if (
      !question.qOpt1 ||
      !question.qOpt2 ||
      !question.qOpt3 ||
      !question.qOpt4
    ) {
      presentAlert({
        header: "Alert",
        subHeader: "Option is empty",
        message: "Quiz must have 4 options",
        buttons: ["OK"],
      });
      return;
    }
    if (!question.qOptCorrect) {
      presentAlert({
        header: "Alert",
        subHeader: "Choose Correct Option",
        message: "Quiz must have one correct option",
        buttons: ["OK"],
      });
      return;
    }

    let optionArr = [
      question.qOpt1,
      question.qOpt2,
      question.qOpt3,
      question.qOpt4,
    ];
    if (hasDuplicates(optionArr)) {
      presentAlert({
        header: "Alert",
        subHeader: "Duplicate Options",
        message: "Cannot have same option more than once.",
        buttons: ["OK"],
      });
      return;
    }
    if (!optionArr.includes(question.qOptCorrect)) {
      presentAlert({
        header: "Alert",
        subHeader: "Reselect Options Again",
        message: "Correct answer does not match any of the options",
        buttons: ["OK"],
      });
      return;
    }

    const { qId, ...sendToStore } = question;

    try {
      await addQuestion({
        ...sendToStore,
        createdAt: Timestamp.fromDate(new Date()),
        createdBy: user?.uid,
      });
      presentAlert({
        header: "Alert",
        subHeader: "Saved in database",
        message: "This question has been saved in the database.",
        buttons: ["OK"],
      });
    } catch (error) {
      console.log(error);
    }
    console.log(question);
  }

  useEffect(() => {
    if (!question?.date) {
      setCreateQuizState(0);
    }
    console.log(question);
  }, [question]);

  useEffect(async () => {
    const q = query(qCollectionRef, where("date", "==", question.date));
    const snapshot = await getCountFromServer(q);
    const currentQcount = snapshot.data().count;
    if (currentQcount === 15) {
      setCreateQuizState(2);
      // setloading(false);
      return;
    } 
    
    // setloading(false);

    setQuestion({
      ...question,
      qSeq: ++currentQcount,
    });
  }, [createQuizState]);

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
            {!loading && createQuizState === 0 && (
              <>
                <h4>Select Quiz Date</h4>
                <IonDatetime ref={datetime} onIonChange={onConfirm}>
                  <IonButtons slot="buttons">
                    <IonButton color="danger" onClick={reset}>
                      Reset
                    </IonButton>
                    <IonButton color="primary" onClick={confirm}>
                      Confirm
                    </IonButton>
                  </IonButtons>
                </IonDatetime>
              </>
            )}
            {!loading && createQuizState === 1 && (
              <>
                <SuperIcons qSeq={question?.qSeq} />
                <div className={styles.createQuizHeader}>
                  <div>
                    <h4>Quiz Date</h4>
                    <p>
                      {question.date}{" "}
                      <img
                        src="/images/carbon_edit (1).png"
                        alt=""
                        onClick={() => {
                          setCreateQuizState(0);
                        }}
                      />
                    </p>
                  </div>
                  <div>
                    <h4>Question Number</h4>
                    <p>{question.qSeq}</p>
                    {/* <IonList>
                      <IonItem>
                        <IonSelect
                          placeholder="Select Q. No."
                          onIonChange={(e) => {
                            setQuestion({
                              ...question,
                              qSeq: e.target?.value,
                            });
                          }}
                        >
                          <IonSelectOption value="1">1</IonSelectOption>
                          <IonSelectOption value="2">2</IonSelectOption>
                          <IonSelectOption value="3">3</IonSelectOption>
                          <IonSelectOption value="4">4</IonSelectOption>
                          <IonSelectOption value="5">5</IonSelectOption>
                          <IonSelectOption value="6">6</IonSelectOption>
                          <IonSelectOption value="7">7</IonSelectOption>
                          <IonSelectOption value="8">8</IonSelectOption>
                          <IonSelectOption value="9">9</IonSelectOption>
                          <IonSelectOption value="10">10</IonSelectOption>
                          <IonSelectOption value="11">11</IonSelectOption>
                          <IonSelectOption value="12">12</IonSelectOption>
                          <IonSelectOption value="13">13</IonSelectOption>
                          <IonSelectOption value="14">14</IonSelectOption>
                          <IonSelectOption value="15">15</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    </IonList> */}
                  </div>
                </div>
                <h4>Add Question</h4>
                <IonItem>
                  <IonTextarea
                    placeholder="Add question here"
                    autoGrow={true}
                    spellcheck={true}
                    rows={4}
                    value={question.qText}
                    onIonBlur={(e) =>
                      setQuestion({
                        ...question,
                        qText: e.target?.value,
                      })
                    }
                  ></IonTextarea>
                </IonItem>
                <h4>Enter options and choose correct answer</h4>
                <IonRadioGroup
                  value={question?.qOptCorrect}
                  //   allowEmptySelection={true}
                  onIonChange={(e) => {
                    if (e.target?.value === null) {
                      presentAlert({
                        header: "Alert",
                        subHeader: "Option is empty",
                        message: "Please add all four options!",
                        buttons: ["OK"],
                      });
                      e.target.attributes("checked", false);
                      return;
                    }
                    setQuestion({
                      ...question,
                      qOptCorrect: e.target?.value,
                    });
                  }}
                >
                  <div>
                    Option 1{" "}
                    <input
                      type="text"
                      value={question?.qOpt1}
                      onChange={(e) => {
                        setQuestion({
                          ...question,
                          qOpt1: e.target?.value,
                        });
                      }}
                    />
                    <IonRadio
                      mode="md"
                      slot="end"
                      value={question?.qOpt1}
                      disabled={!question?.qOpt1}
                    ></IonRadio>
                  </div>
                  <div>
                    Option 2{" "}
                    <input
                      type="text"
                      value={question?.qOpt2}
                      onChange={(e) => {
                        setQuestion({
                          ...question,
                          qOpt2: e.target?.value,
                        });
                      }}
                    />
                    <IonRadio
                      mode="md"
                      slot="end"
                      value={question?.qOpt2}
                      disabled={!question?.qOpt2}
                    ></IonRadio>
                  </div>
                  <div>
                    Option 3{" "}
                    <input
                      type="text"
                      value={question?.qOpt3}
                      onChange={(e) => {
                        setQuestion({
                          ...question,
                          qOpt3: e.target?.value,
                        });
                      }}
                    />
                    <IonRadio
                      mode="md"
                      slot="end"
                      value={question?.qOpt3}
                      disabled={!question?.qOpt3}
                    ></IonRadio>
                  </div>
                  <div>
                    Option 4{" "}
                    <input
                      type="text"
                      value={question?.qOpt4}
                      onChange={(e) => {
                        setQuestion({
                          ...question,
                          qOpt4: e.target?.value,
                        });
                      }}
                    />
                    <IonRadio
                      mode="md"
                      slot="end"
                      value={question?.qOpt4}
                      disabled={!question?.qOpt4}
                    ></IonRadio>
                  </div>
                </IonRadioGroup>
                <div className={styles.buttonGrp}>
                  <button
                    className={styles.save}
                    onClick={saveQuestionToFirestore}
                  >
                    Save & Next
                  </button>
                  {/* <button className={styles.next}>Next</button> */}
                </div>
              </>
            )}
            {!loading && createQuizState === 2 && (
              <>
                <h4>Date : {question.date}</h4>
                <h4>15 Questions already added for this date.</h4>
                <IonButton
                  color="danger"
                  onClick={() => {
                    // setQuestion({
                    //   ...question,
                    //   date: "",
                    // });
                    clearQuestionRecoil();
                    setCreateQuizState(0);
                  }}
                >
                  Select a new date
                </IonButton>
              </>
            )}
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
