import FormInput from "@/components/FormInput/index";
import { IonAlert, IonContent, IonList, IonPage } from "@ionic/react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/router";
import { useIonToast } from "@ionic/react";
import { useState } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [present] = useIonToast();

  function alertBox(title, message) {
    present({
      subHeader: title,
      message: message,
    });
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      alertBox(
        "Password Reset",
        "A password reset link has been sent to your email.",
      );
      router.push("/login");
    } catch (error) {
      alertBox(
        "Error",
        error?.message?.includes("user-not-found")
          ? "User Not Found"
          : error.message || "An error occurred during password reset.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IonPage id="main-content">
        <IonContent className="ion-padding">
          <h4 style={{ textAlign: "center" }}>Reset Password</h4>

          <form
            onSubmit={handleResetPassword}
            style={{ maxWidth: "350px", margin: "20px auto" }}>
            <IonList>
              <FormInput
                type="email"
                label="Email Id : "
                placeholder="Email Id"
                value={email}
                onIonInput={(e) => setEmail(e.target.value)}
              />
            </IonList>

            <ion-button
              type="submit"
              expand="full"
              shape="round"
              disabled={loading}>
              {loading ? "Sending..." : "Reset Password"}
            </ion-button>
          </form>

          <p style={{ margin: "20px", textAlign: "center" }}>
            Remember your password?{" "}
            <button onClick={() => router.push("/login")}>LOGIN</button>
          </p>
        </IonContent>
      </IonPage>
    </>
  );
}
