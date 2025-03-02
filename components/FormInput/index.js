import { IonInput, IonItem } from "@ionic/react";
import "@ionic/react/css/core.css";

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
      <IonInput
        label={label}
        labelPlacement="floating"
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
