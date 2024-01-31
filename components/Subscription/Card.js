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
  name = "",
  amount = 0,
  description = "",
  type = "secondary",
}) {
  return (
    <>
      <IonCard color={type}>
        <IonCardHeader>
          <IonCardTitle>{name}</IonCardTitle>
          <IonCardSubtitle>&#8377; {amount} /- Only</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <p>
            {description}
            {/* Pay and enjoy the quiz for whole month and earn rewards on winning. */}
          </p>

          <div>
            <IonButton color="light" onClick={handleClick}>
              Subscribe
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </>
  );
}
