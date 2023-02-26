import { useState } from "react";
import styles from "./questionBlock.module.css";

export default function QuestionBlock({ data, setCurrentQ }) {
  const [ansCheck, setAnsCheck] = useState(false);
  function onAnswer(e) {
    const userAnswer = e.target.value;
    if (userAnswer === data?.qOptCorrect) {
      // console.log("correct answer for q no = ", data.qSeq);
      setAnsCheck(userAnswer);
      setTimeout(() => {
        setAnsCheck(false);
        if (data.qSeq === 15) {
          setCurrentQ(0);
        } else setCurrentQ(data.qSeq);
      }, 1000);
    } else {
      setAnsCheck("wrong" + userAnswer);
      console.log("Wrong answer !");
    }
  }

  function saveUserAnswerToDB(user, qSeq, userAnswer) {

  }
  return (
    <>
      <div className={styles.questionBlock}>
        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Super 15</h3>
        <div className={styles.question}>{data?.qText || "Loading..."}</div>
        <h4 style={{ textAlign: "center" }}>Choose your answer</h4>
        <div className={styles.options}>
          <button
            className={`${styles.option} ${
              ansCheck
                ? ansCheck === data?.qOpt1
                  ? styles.correct
                  : ansCheck === "wrong" + data?.qOpt1
                  ? styles.incorrect
                  : ""
                : ""
            }`}
            value={data?.qOpt1}
            onClick={onAnswer}
          >
            {data?.qOpt1 || "Loading..."}
          </button>
          <button
            className={`${styles.option} ${
              ansCheck
                ? ansCheck === data?.qOpt2
                  ? styles.correct
                  : ansCheck === "wrong" + data?.qOpt2
                  ? styles.incorrect
                  : ""
                : ""
            }`}
            value={data?.qOpt2}
            onClick={onAnswer}
          >
            {data?.qOpt2 || "Loading..."}
          </button>
          <button
            className={`${styles.option} ${
              ansCheck
                ? ansCheck === data?.qOpt3
                  ? styles.correct
                  : ansCheck === "wrong" + data?.qOpt3
                  ? styles.incorrect
                  : ""
                : ""
            }`}
            value={data?.qOpt3}
            onClick={onAnswer}
          >
            {data?.qOpt3 || "Loading..."}
          </button>
          <button
            className={`${styles.option} ${
              ansCheck
                ? ansCheck === data?.qOpt4
                  ? styles.correct
                  : ansCheck === "wrong" + data?.qOpt4
                  ? styles.incorrect
                  : ""
                : ""
            }`}
            value={data?.qOpt4}
            onClick={onAnswer}
          >
            {data?.qOpt4 || "Loading..."}
          </button>
        </div>
      </div>
    </>
  );
}
