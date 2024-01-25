import {
  IonContent,
  IonImg,
  IonList,
  IonPage,
  IonSplitPane,
  useIonToast,
} from "@ionic/react";
import { useRouter } from "next/router";
import { useState } from "react";
import FormInput from "../../components/FormInput";
import { signUp } from "../../helper/firebase.helper";
import { logo } from "./register.module.css";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    );
  };

  async function onSubmit(e) {
    e.preventDefault();

    if (!name) return Toaster("Username is required!");
    if (!email) return Toaster("Email is required!");
    if (!password) return Toaster("Password is required!");
    if (validateEmail(email?.trim()) === null) return Toaster("Invalid Email");
    if (password?.trim() !== confirmPassword?.trim())
      return Toaster("Passwords did not match!");

    try {
      await signUp(email?.trim(), password?.trim(), name?.trim());
      Toaster("Registration Successful.");
      router.push("/login");
    } catch (error) {
      console.log(error);
      Toaster("Registration Failed.");
    }
  }

  return (
    <>
      <IonSplitPane when="sm" contentId="main-content">
        <IonPage id="main-content">
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
                  label="Username : "
                  placeholder="username"
                  onIonInput={(e) => setName(e.target.value)}
                  value={name}
                />
                <FormInput
                  label="Email Id : "
                  placeholder="Email Id"
                  onIonInput={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <FormInput
                  type="password"
                  label="Enter Password : "
                  placeholder="Enter Password"
                  onIonInput={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <FormInput
                  type="password"
                  label="Confirm Password : "
                  placeholder="Confirm Password"
                  onIonInput={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </IonList>
              <br />
              <ion-button type="submit" expand="full" shape="round">
                Submit
              </ion-button>
            </form>
            <p style={{ margin: "20px", textAlign: "center" }}>
              Already have an account?{" "}
              <button onClick={() => router.push("/login")}>LOGIN</button>
            </p>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
