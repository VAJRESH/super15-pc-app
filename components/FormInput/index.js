import { IonInput, IonItem, IonLabel } from "@ionic/react";

export default function FormInput({
  label = "",
  type = "text",
  name = "",
  placeholder = "",
  onIonInput = () => {},
  onIonBlur = () => {},
}) {
  return (
    <IonItem>
      <IonLabel position="floating">{label}</IonLabel>
      <IonInput
        type={type}
        name={name}
        placeholder={placeholder}
        onIonInput={onIonInput}
        onIonBlur={onIonBlur}
      ></IonInput>
    </IonItem>
  );
}
