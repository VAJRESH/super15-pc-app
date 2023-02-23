import { IonApp } from "@ionic/react";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateQuiz from "../screens/CreateQuiz";

export default function CreateQuizScreen() {
  return (
    <>
      <IonApp>
        {/* <ProtectedRoute> */}
          <CreateQuiz />
        {/* </ProtectedRoute> */}
      </IonApp>
    </>
  );
}
