import { IonToast } from "@ionic/react";
import { useState } from "react";

export default function Toaster({ message, show = true }) {
  const [showToast, setShowToast] = useState(show);
  return (
    <IonToast
      isOpen={true}
      onDidDismiss={() => setShowToast(false)}
      message={message}
      duration={1500}
    />
  );
}
