import { SUBSCRIBTIONS } from "@/helper/constants.helper";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
} from "@ionic/react";

export default function Card({
  handleClick = () => {},
  expiryDate = new Date(),
}) {
  return (
    <>
      <IonCard color="secondary">
        <IonCardHeader>
          <IonCardTitle>Monthly Plan</IonCardTitle>
          <IonCardSubtitle>
            &#8377; {SUBSCRIBTIONS?.amount} /- Only (till{" "}
            {expiryDate?.toDateString()})
          </IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <p>
            Pay and enjoy the quiz for whole month and earn rewards on winning.
          </p>

          <div>
            <IonButton color="tertiary" onClick={handleClick}>
              Subscribe
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </>
  );
}
