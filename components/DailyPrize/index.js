import { COLLECTIONS } from "@/helper/constants.helper";
import {
  addUpdateFirestoreData,
  getDataWithId,
} from "@/helper/firebase.helper";
import { getFormatedDate } from "@/helper/utils.helper";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonText,
  useIonToast,
} from "@ionic/react";
import { useState, useEffect } from "react";
import styles from "./dailyPrize.module.css";

export default function DailyPrize({
  isOpen,
  onClose,
  date = getFormatedDate(),
}) {
  const [prizeAmount, setPrizeAmount] = useState("");
  const [present] = useIonToast();

  useEffect(() => {
    const loadDailyPrize = async () => {
      const prize = await getDataWithId(COLLECTIONS.dailyPrizes, date);
      if (prize?.amount) {
        setPrizeAmount(prize.amount.toString());
      }
    };

    if (isOpen) {
      loadDailyPrize();
    }
  }, [isOpen]);

  async function handleSubmit() {
    if (!prizeAmount || isNaN(prizeAmount) || Number(prizeAmount) <= 0) {
      present({
        message: "Please enter a valid prize amount",
        duration: 2000,
        position: "top",
        color: "danger",
      });
      return;
    }

    try {
      await addUpdateFirestoreData(
        COLLECTIONS.dailyPrizes,
        {
          amount: Number(prizeAmount),
          date: date,
        },
        date,
        {},
        { createNew: true },
      );

      present({
        message: "Prize amount updated successfully",
        duration: 2000,
        position: "top",
        color: "success",
      });
      onClose();
    } catch (error) {
      console.error("Error updating prize:", error);
      present({
        message: "Failed to update prize amount",
        duration: 2000,
        position: "top",
        color: "danger",
      });
    }
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent className="ion-padding">
        <h2>Set Daily Prize</h2>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Prize Amount (₹)</IonLabel>
            <IonInput
              type="number"
              value={prizeAmount}
              onIonChange={(e) => setPrizeAmount(e.detail.value)}
              placeholder="Enter prize amount"
            />
          </IonItem>
        </IonList>

        <div className={styles.buttonContainer}>
          <IonButton onClick={handleSubmit}>Save</IonButton>
          <IonButton color="medium" onClick={onClose}>
            Cancel
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
}
