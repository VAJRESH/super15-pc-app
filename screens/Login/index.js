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
import FormInput from "../../components/FormInput";
import SideMenu from "../../components/SideMenu";
import { signIn } from "../../helper/firebase.helper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();
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
      let signUpResponse = await signIn(email, password);
      console.log(signUpResponse);
      Toaster("Login Successful.");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      Toaster("Login Failed.");
    }
  };

  return (
    <>
      <IonSplitPane when="sm" contentId="main-content">
        <SideMenu />
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              {/* <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons> */}

              <IonButtons slot="start">
                <IonMenuToggle>
                  <IonButton>
                    <IonIcon slot="icon-only" icon={menu}></IonIcon>
                  </IonButton>
                </IonMenuToggle>
              </IonButtons>

              <IonTitle>Login</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonImg
              src="/images/Super15 Logo.png"
              alt="Logo"
              className="logo"
            ></IonImg>
            <h4 style={{ textAlign: "center" }}>Login to Super 15</h4>
            <form onSubmit={onSubmit}>
              <IonList>
                <FormInput
                  label="Email Id : "
                  placeholder="Email Id"
                  onIonBlur={setEmailFn}
                />
                <FormInput
                  type="password"
                  label="Enter Password : "
                  placeholder="Enter Password"
                  onIonBlur={(e) => setPassword(e.target.value)}
                />
              </IonList>
              <br />
              <ion-button type="submit" expand="full" shape="round">
                Submit
              </ion-button>
            </form>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
