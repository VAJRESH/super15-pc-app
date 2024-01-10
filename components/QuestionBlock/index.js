import { useIonToast } from "@ionic/react";
import styles from "./questionBlock.module.css";

export default function QuestionBlock({
  qText = null,
  options = Array(4).fill(),
  selectedOp = null,
  isCorrect = null,
  handleOpSelection = () => {},
}) {
  const selectedOpIndex = options?.findIndex((op) => op?.value === selectedOp);

  const [present] = useIonToast();

  return (
    <>
      <div className={styles.questionBlock}>
        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Super 15</h3>
        <div className={styles.question}>{qText || "Loading..."}</div>

        <h4 style={{ textAlign: "center" }}>Choose your answer</h4>
        <div className={styles.options}>
          {options?.slice(0, 4).map((op, i) => {
            let styleClass = "";
            if (selectedOpIndex === i) {
              styleClass = isCorrect ? styles.correct : styles.incorrect;
            }

            return (
              <button
                key={op?.id}
                className={`${styles.option} ${styleClass}`}
                onClick={() => {
                  if (!!selectedOp)
                    return present({
                      header: "Alert",
                      message:
                        "You have already answered the quiz. Wait for question time to end.",
                      buttons: ["OK"],
                    });

                  handleOpSelection(op);
                }}
              >
                {op?.value || "Loading..."}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
