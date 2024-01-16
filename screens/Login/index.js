import { ERROR_MSG } from "@/helper/constants.helper";
import {
  IonContent,
  IonImg,
  IonList,
  IonPage,
  useIonToast,
} from "@ionic/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CurrentUserAtom } from "../../atom/user.atom";
import FormInput from "../../components/FormInput";
import { signIn } from "../../helper/firebase.helper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [user, setUser] = useRecoilState(CurrentUserAtom);

  const [present] = useIonToast();

  useEffect(() => {
    if (!user?.uid) return;

    router.push("/dashboard");
  }, [user?.uid]);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(validateEmail(email), email, 123);

    if (validateEmail(email) === null) return Toaster("Invalid Email");

    try {
      let signInResponse = await signIn(email, password);
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
      console.log(error, error?.message);
      if (error?.message?.includes("wrong-password"))
        return Toaster(ERROR_MSG?.wrongPassword);

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
                type="email"
                label="Email Id : "
                placeholder="Email Id"
                value={email}
                onIonInput={(e) => setEmail(e.target.value)}
                onIonBlur={(e) => setEmail(e.target.value)}
              />
              <FormInput
                type="password"
                label="Enter Password : "
                placeholder="Enter Password"
                value={password}
                onIonInput={(e) => setPassword(e.target.value)}
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
