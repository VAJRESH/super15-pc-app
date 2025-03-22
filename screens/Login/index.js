import Footer from "@/components/Footer/index";
import useHandleUserData from "@/hooks/useHandleUserData";
import { IonContent, IonImg, IonList, IonPage } from "@ionic/react";
import { useRouter } from "next/router";
import FormInput from "../../components/FormInput";

export default function Login() {
  const router = useRouter();
  const { userTemp, handleLogin, handleUpdateUserTemp } = useHandleUserData();

  return (
    <>
      <IonPage id="main-content">
        <IonContent className="ion-padding">
          <IonImg
            src="/images/Super15 Logo.png"
            alt="Logo"
            className="logo"></IonImg>
          <h4 style={{ textAlign: "center" }}>Login to Super 15</h4>

          <form
            onSubmit={handleLogin}
            style={{ maxWidth: "350px", margin: "20px auto" }}>
            <IonList>
              <FormInput
                type="email"
                label="Email Id : "
                placeholder="Email Id"
                value={userTemp?.email}
                onIonInput={(e) =>
                  handleUpdateUserTemp({ email: e.target.value })
                }
              />
              <FormInput
                type="password"
                label="Enter Password : "
                placeholder="Enter Password"
                value={userTemp?.password}
                onIonInput={(e) =>
                  handleUpdateUserTemp({ password: e.target.value })
                }
              />
            </IonList>

            <ion-button type="submit" expand="full" shape="round">
              Login
            </ion-button>
          </form>

          <p style={{ margin: "20px 0 10px", textAlign: "center" }}>
            Forgot Password?{" "}
            <button onClick={() => router.push("/reset-password")}>
              RESET
            </button>
          </p>
          <p style={{ margin: "0px", textAlign: "center" }}>
            Don't have an account?{" "}
            <button onClick={() => router.push("/register")}>REGISTER</button>
          </p>

          <Footer />
        </IonContent>
      </IonPage>
    </>
  );
}
