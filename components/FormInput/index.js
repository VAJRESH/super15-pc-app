import { IonInput, IonItem, IonLabel } from "@ionic/react";

export default function FormInput({
  label = "",
  type = "text",
  name = "",
  placeholder = "",
  onIonInput = () => {},
  onIonBlur = () => {},
  disabled = false,
  value = "",
}) {
  return (
    <IonItem style={{ margin: "20px auto" }}>
      <IonLabel position="floating">{label}</IonLabel>
      <IonInput
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onIonInput={onIonInput}
        onIonBlur={onIonBlur}
        disabled={disabled}
      ></IonInput>
    </IonItem>
  );
}
