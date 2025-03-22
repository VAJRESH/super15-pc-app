import useHandleUserData from "@/hooks/useHandleUserData";
import {
  IonContent,
  IonImg,
  IonList,
  IonPage,
  IonSplitPane,
  IonCheckbox,
} from "@ionic/react";
import { useRouter } from "next/router";
import FormInput from "../../components/FormInput";
import { logo } from "./register.module.css";
import Footer from "@/components/Footer/index";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(true);
  const { userTemp, handleUpdateUserTemp, handleRegister } =
    useHandleUserData();

  return (
    <>
      <IonSplitPane when="sm" contentId="main-content">
        <IonPage id="main-content">
          <IonContent className="ion-padding">
            <IonImg
              src="/images/Super15 Logo.png"
              alt="Logo"
              className={logo}></IonImg>
            <h4 style={{ textAlign: "center" }}>Register on Super 15</h4>

            <form onSubmit={handleRegister}>
              <IonList>
                <FormInput
                  label="Username : "
                  placeholder="username"
                  onIonInput={(e) =>
                    handleUpdateUserTemp({ displayName: e.target.value })
                  }
                  value={userTemp?.displayName}
                />
                <FormInput
                  label="Email Id : "
                  placeholder="Email Id"
                  onIonInput={(e) =>
                    handleUpdateUserTemp({ email: e.target.value })
                  }
                  value={userTemp?.email}
                />
                <FormInput
                  type="password"
                  label="Enter Password : "
                  placeholder="Enter Password"
                  onIonInput={(e) =>
                    handleUpdateUserTemp({ password: e.target.value })
                  }
                  value={userTemp?.password}
                />
                <FormInput
                  type="password"
                  label="Confirm Password : "
                  placeholder="Confirm Password"
                  onIonInput={(e) =>
                    handleUpdateUserTemp({ cnfPassword: e.target.value })
                  }
                  value={userTemp?.cnfPassword}
                />

                <IonCheckbox
                  labelPlacement="end"
                  checked={isChecked}
                  style={{ margin: "10px 50%", transform: "translateX(-50%)" }}
                  onIonChange={() => setIsChecked(!isChecked)}>
                  I agree to the below terms
                </IonCheckbox>
              </IonList>

              <br />
              <ion-button
                disabled={!isChecked}
                type="submit"
                expand="full"
                shape="round">
                Submit
              </ion-button>
            </form>

            <p style={{ margin: "20px", textAlign: "center" }}>
              Already have an account?{" "}
              <button onClick={() => router.push("/login")}>LOGIN</button>
            </p>

            <Footer />
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
