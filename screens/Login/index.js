import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonList,
  IonMenuButton,
  IonMenuToggle,
  IonNavLink,
  IonPage,
  IonProgressBar,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { menu } from "ionicons/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "../../atom/user.atom";
import FormInput from "../../components/FormInput";
import SideMenu from "../../components/SideMenu";
import { signIn } from "../../helper/firebase.helper";
import Register from "../Register";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [user, setUser] = useRecoilState(currentUserAtom);

  const [present] = useIonToast();

  const Toaster = (message) => {
    present({
      message: message,
      duration: 1500,
      position: "bottom",
    });
  };

  const validateEmail = (email) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };
  const setEmailFn = (e) => {
    const email = e.target.value;
    if (email === "") return;
    validateEmail(email) !== null ? setEmail(email) : Toaster("Invalid Email");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let signInResponse = await signIn(email, password);
      // console.log(signInResponse);
      Toaster("Login Successful.");
      setUser({
        uid: signInResponse?.user.uid,
        email: signInResponse?.user.email,
        photoURL: signInResponse?.user.photoURL,
        accessToken: signInResponse?.user.accessToken,
        refreshToken: signInResponse?.user?.refreshToken,
        email: signInResponse?.user?.email,
        uid: signInResponse?.user?.uid,
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      Toaster("Login Failed.");
    }
  };

  return (
    <>
      <IonPage id="main-content">
        <IonContent className="ion-padding">
          <IonImg
            src="/images/Super15 Logo.png"
            alt="Logo"
            className="logo"
          ></IonImg>
          <h4 style={{ textAlign: "center" }}>Login to Super 15</h4>
          <form
            onSubmit={onSubmit}
            style={{ maxWidth: "350px", margin: "20px auto" }}
          >
            <IonList>
              <FormInput
                label="Email Id : "
                placeholder="Email Id"
                value={email}
                onIonBlur={setEmailFn}
              />
              <FormInput
                type="password"
                label="Enter Password : "
                placeholder="Enter Password"
                value={password}
                onIonBlur={(e) => setPassword(e.target.value)}
              />
            </IonList>

            <ion-button type="submit" expand="full" shape="round">
              Login
            </ion-button>
          </form>
          <p style={{ margin: "20px", textAlign: "center" }}>
            Don't have an account?{" "}
            <button onClick={() => router.push("/register")}>REGISTER</button>
          </p>
        </IonContent>
      </IonPage>
    </>
  );
}
