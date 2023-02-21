import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuToggle,
  IonNote,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { menu } from "ionicons/icons";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import SideMenu from "../../components/SideMenu";
import { signUp } from "../../helper/firebase.helper";
import { logo } from "./register.module.css";

export default function Register() {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmail = (email) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (e) => {
    const value = e.target.value;
    setIsValid(undefined);
    if (value === "") return;
    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  const setEmailFn = (e) => {
    const email = e.target.value;
    if (email === "") return;
    console.log(email);
    validateEmail(email) !== null
      ? setEmail(email)
      : console.log("invalid email");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords did not match!");
      return;
    }
    console.log(email, password);

    try {
      let signUpResponse = await signUp(email, password);
      console.log(signUpResponse);

    } catch (error) {
      console.log(error);
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

              <IonTitle>Register</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonImg
              src="/images/Super15 Logo.png"
              alt="Logo"
              className={logo}
            ></IonImg>
            <h4 style={{ textAlign: "center" }}>Register on Super 15</h4>
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
                <FormInput
                  type="password"
                  label="Confirm Password : "
                  placeholder="Confirm Password"
                  onIonBlur={(e) => setConfirmPassword(e.target.value)}
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
