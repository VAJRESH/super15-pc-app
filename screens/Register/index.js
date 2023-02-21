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
import SideMenu from "../../components/SideMenu";
import { logo } from "./register.module.css";

export default function Register() {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState();

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

  const onSubmit = async (data) => {
    console.log(data);
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
                <IonItem>
                  <IonLabel position="floating">Email Id : </IonLabel>
                  <IonInput placeholder="Email Id"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Enter Password : </IonLabel>
                  <IonInput placeholder="Enter Password"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Confirm Password : </IonLabel>
                  <IonInput placeholder="Confirm Password"></IonInput>
                </IonItem>
              </IonList>
              <br />
              <ion-button expand="full" shape="round">
                Submit
              </ion-button>
            </form>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
