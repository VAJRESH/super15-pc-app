import { IonApp } from "@ionic/react";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../screens/Dashboard";

export default function DashboardScreen() {
  return (
    <>
      <IonApp>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </IonApp>
    </>
  );
}
