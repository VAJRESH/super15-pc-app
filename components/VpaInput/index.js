import { CurrentUserAtom, getUserDataObj } from "@/atom/user.atom";
import { loadVpaData } from "@/services/queries.services";
import { createContactAccount } from "@/services/razorpayX.services";
import { IonButton, useIonToast, IonCheckbox } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import FormInput from "../FormInput/index";
import styles from "./vpaInput.module.css";
import { FOOTER_LINKS } from "@/helper/constants.helper";

export default function VpaInput() {
  const [user, setUser] = useRecoilState(CurrentUserAtom);

  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(null);
  const [vpaData, setVpaData] = useState({
    id: null,
    vpa: user?.vpa || "",
  });

  const [present] = useIonToast();
  const ref = useRef(null);

  /**
   * IonCheckbox will be listening for the native click event here so we need
   * to call stopPropagation when the native click event instead of when the
   * synthetic click event fires.
   */
  useEffect(() => {
    ref.current?.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }, [ref]);

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
    if (!vpaData) return alertBox("Enter UPI Id");

    setIsLoading(true);
    createContactAccount({
      userId: user?.uid,
      email: user?.email,
      name: user?.displayName,
      vpa: vpaData?.vpa,
    }).then((res) => {
      setIsLoading(false);

      if (!res || !!res?.error)
        return alertBox(res?.error || "Something went wrong");

      setUser((prev) => getUserDataObj({ ...(prev || {}), vpa: vpaData?.vpa }));
      setVpaData((prev) => ({ ...(prev || {}), id: res?.fundId }));
      alertBox("UPI id added successfully");
    });
  }

  return (
    <>
      <div className={`${styles.vpaInputBox} ion-padding`}>
        <h4>Enter UPI Id</h4>

        <FormInput
          label="UPI ID"
          placeholder="upi_name@okhdfc"
          value={vpaData?.vpa}
          onIonInput={(e) =>
            setVpaData((prev) => ({ ...(prev || {}), vpa: e.target.value }))
          }
          disabled={!!vpaData?.id || isLoading}
        />
        <IonCheckbox
          labelPlacement="end"
          checked={isChecked}
          style={{ margin: "0 5px", fontSize: "small" }}
          onIonChange={() => setIsChecked(!isChecked)}>
          I agree to the{" "}
          <a href={FOOTER_LINKS.tAndC.link} ref={ref}>
            terms and conditions
          </a>
        </IonCheckbox>

        <div>
          <small>Enter UPI Id mindfully, it cannot be updated</small>
        </div>

        <IonButton
          onClick={addUpdateVpa}
          disabled={!isChecked || !!vpaData?.id || isLoading}>
          Submit
        </IonButton>
      </div>
    </>
  );
}
