import { CurrentUserAtom, getUserDataObj } from "@/atom/user.atom";
import { loadVpaData } from "@/services/queries.services";
import { createContactAccount } from "@/services/razorpayX.services";
import { IonButton, useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import FormInput from "../FormInput/index";
import styles from "./vpaInput.module.css";

export default function VpaInput() {
  const [user, setUser] = useRecoilState(CurrentUserAtom);
  const [vpaData, setVpaData] = useState({
    id: null,
    vpa: user?.vpa || "",
  });

  const [present] = useIonToast();

  // load vpa
  useEffect(() => {
    if (!user?.uid) return;

    loadVpaData(user?.uid)
      .then((res) => setVpaData({ id: res?.id, vpa: res?.vpa?.address || "" }))
      .catch((err) => console.log(err));
  }, [user?.uid]);

  // helper functions
  function alertBox(title, message) {
    present({
      header: title,
      message: message,
      buttons: ["OK"],
    });
  }

  // add or update vpa
  function addUpdateVpa() {
    if (!user?.uid) return alertBox("User Id is missing");
    if (!user?.email) return alertBox("Email is missing");
    if (!vpaData) return alertBox("Enter VPA");

    createContactAccount({
      userId: user?.uid,
      email: user?.email,
      name: user?.displayName,
      vpa: vpaData?.vpa,
    }).then((res) => {
      console.log(res);
      if (!res || !!res?.error)
        return alertBox(res?.error || "Something went wrong");

      setUser((prev) => getUserDataObj({ ...(prev || {}), vpa: vpaData?.vpa }));
      alertBox("VPA added successfully");
    });
  }

  return (
    <>
      <div className={`${styles.vpaInputBox} ion-padding`}>
        <h4>Enter VPA</h4>

        <FormInput
          label="VPA"
          placeholder="upi_name@okhdfc"
          value={vpaData?.vpa}
          onIonInput={(e) =>
            setVpaData((prev) => ({ ...(prev || {}), vpa: e.target.value }))
          }
        />

        <div>
          <small>Enter VPA mindfully, it cannot be updated</small>
        </div>

        <IonButton onClick={addUpdateVpa} disabled={!!vpaData?.id}>
          Submit
        </IonButton>
      </div>
    </>
  );
}
