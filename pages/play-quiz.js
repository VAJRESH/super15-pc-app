import { IonApp } from "@ionic/react";
import ProtectedRoute from "../components/ProtectedRoute";
import PlayQuiz from "../screens/PlayQuiz";

export default function QuizScreen() {
  return (
    <>
      <IonApp>
        <ProtectedRoute>
          <PlayQuiz />
        </ProtectedRoute>
      </IonApp>
    </>
  );
}
