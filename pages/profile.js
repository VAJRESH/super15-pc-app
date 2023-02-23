import { IonApp } from "@ionic/react";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../screens/Profile";

export default function ProfileScreen() {
  return (
    <>
      <IonApp>
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      </IonApp>
    </>
  );
}
