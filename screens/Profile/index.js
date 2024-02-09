import {
  IsLoadingAtom,
  PlansAtom,
  SubscriptionAtom,
  getSubscriptionDataObj,
} from "@/atom/global.atom";
import { UserQuizMapAtom } from "@/atom/quiz.atom";
import PopUp from "@/components/PopUp/index";
import VpaInput from "@/components/VpaInput/index";
import { COLLECTIONS, DEFAULTS } from "@/helper/constants.helper";
import UploadImage from "@/lib/UploadImage";
import { updateContact } from "@/services/razorpayX.services";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuToggle,
  IonPage,
  IonSplitPane,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { updateProfile } from "firebase/auth";
import { ellipsisVertical, trashOutline } from "ionicons/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { CurrentUserAtom, getUserDataObj } from "../../atom/user.atom";
import FormInput from "../../components/FormInput";
import SideMenu from "../../components/SideMenu";
import {
  addUpdateFirestoreData,
  auth,
  uploadFileInFirabse,
} from "../../helper/firebase.helper";
import styles from "./profile.module.css";

export default function Profile() {
  const [user, setUser] = useRecoilState(CurrentUserAtom);
  const [loading, setLoading] = useRecoilState(IsLoadingAtom);
  const [plans, setPlans] = useRecoilState(PlansAtom);
  const [subscription, setSubscription] = useRecoilState(SubscriptionAtom);
  const [userQuizMap, setUserQuizMap] = useRecoilState(UserQuizMapAtom);

  const [present] = useIonToast();
  const router = useRouter();

  const [userTemp, setUserTemp] = useState(user);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  function hanldeChange(obj = {}) {
    setUserTemp((prev) => ({ ...(prev || {}), ...(obj || {}) }));
  }

  function toaster(message) {
    present({
      message: message,
      duration: 1500,
      position: "bottom",
    });
  }

  return (
    <>
      <IonSplitPane when="sm" contentId="main-content">
        <SideMenu />
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
                <IonMenuToggle>
                  <IonButton>
                    <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
                  </IonButton>
                </IonMenuToggle>
              </IonButtons>

              <IonItem lines="none">
                <IonLabel>Profile</IonLabel>
              </IonItem>
              {/* <IonTitle>Profile</IonTitle> */}
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <div className={styles.profileContainer}>
              <img
                src={user?.photoURL || DEFAULTS?.profilePic}
                alt="Avatar"
                className={styles.avatar}
              />
              <label className={styles.uploadBtn} htmlFor="uploadPhoto">
                <img src="/images/carbon_edit (1).png" alt="" />
              </label>
              <UploadImage
                inputId="uploadPhoto"
                onUpload={async (blob) => {
                  setLoading(true);
                  const photoURL = await uploadFileInFirabse(blob).catch(
                    (err) => console.log(err),
                  );

                  setUser((prev) =>
                    getUserDataObj({ ...(prev || {}), photoURL }),
                  );
                  setLoading(false);
                }}
              />
            </div>

            <h4 style={{ textAlign: "center" }}>
              Hello, {user?.displayName || "username"}
            </h4>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                const userData = getUserDataObj({
                  ...(userTemp || {}),
                  ...(user || {}),
                  displayName:
                    userTemp?.displayName?.trim() || user?.displayName?.trim(),
                  email: userTemp?.email?.trim() || user?.email?.trim(),
                  address: userTemp?.address?.trim() || user?.address?.trim(),
                });

                if (userData?.displayName?.length < 2)
                  return toaster("Username should be at least 3 characters!");
                if (userData?.displayName?.length > 50)
                  return toaster(
                    "Username should not be at more than 50 characters!",
                  );
                if (userData?.address?.length < 10)
                  return toaster("Address should be at least 10 characters!");

                setLoading(true);

                updateProfile(auth?.currentUser, userData)
                  .then(() => {
                    addUpdateFirestoreData(
                      COLLECTIONS.userData,
                      { address: userData?.address },
                      auth?.currentUser?.uid,
                    ).catch((err) =>
                      console.log("Update User Data Error", err, err?.message),
                    );

                    updateContact({
                      userId: user?.uid,
                      name: userData?.displayName,
                    });

                    setUser(userData);
                    toaster("Profile Updated");
                    setLoading(false);
                  })
                  .catch((err) => {
                    toaster("Something went wrong");
                    console.log(err);
                    setLoading(false);
                  });
              }}
            >
              <IonList>
                <FormInput
                  label="User Name"
                  placeholder="User Name"
                  value={userTemp?.displayName}
                  onIonInput={(e) =>
                    hanldeChange({ displayName: e.target.value })
                  }
                />
                <FormInput
                  label="Email"
                  disabled={true}
                  value={userTemp?.email}
                  // onIonBlur={(e) => setConfirmPassword(e.target.value)}
                />
                <FormInput
                  label="Address"
                  placeholder="Address"
                  value={userTemp?.address || user?.address}
                  onIonInput={(e) => hanldeChange({ address: e.target.value })}
                />

                {/* <FormInput
                  label="Address"
                  // onIonBlur={(e) => setConfirmPassword(e.target.value)}
                />
                <FormInput
                  label="City"
                  // onIonBlur={(e) => setConfirmPassword(e.target.value)}
                />
                <FormInput
                  label="State"
                  // onIonBlur={(e) => setConfirmPassword(e.target.value)}
                />
                <FormInput
                  label="Country"
                  // onIonBlur={(e) => setConfirmPassword(e.target.value)}
                /> */}
                {/* <h4 style={{ textAlign: "center" }}>KYC details</h4>
                <FormInput
                  label="PAN Number"
                  // onIonBlur={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="pan" className={styles.uploadPan}>
                  <h6>Click to upload Image or pdf of pan card here.</h6>
                </label>
                <input type="file" id="pan" className={styles.uploadPhoto} /> */}
              </IonList>
              <IonButton type="submit" expand="full" shape="round">
                Update
              </IonButton>
            </form>

            <br />
            <br />

            <VpaInput />

            <br />
            <br />

            <IonButton
              color="danger"
              expand="full"
              shape="round"
              onClick={() => setDeleteConfirm(true)}
            >
              <IonIcon slot="start" icon={trashOutline}></IonIcon>
              Delete Account
            </IonButton>

            <PopUp
              isOpen={!!deleteConfirm}
              overlayStyle={{ backgroundColor: "#252525a9" }}
              contentStyle={{
                margin: "auto 10px",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <div>
                <h4>Delete your account</h4>

                <p>
                  You cannot undo this action! Are you sure you want to Delete
                  Your Account Permantantly?
                </p>

                <IonButton
                  color="danger"
                  onClick={() => {
                    // delete user firebase account
                    setLoading(true);

                    auth.currentUser
                      .delete()
                      .then(async (res) => {
                        setLoading(false);
                        setUser(getUserDataObj());
                        setPlans(null);
                        setSubscription(getSubscriptionDataObj());
                        setUserQuizMap([]);
                        router.push("/login");
                      })
                      .catch((err) => {
                        setLoading(false);
                        toaster(err?.message);
                        console.log(err, err?.message);
                      });
                  }}
                >
                  Delete
                </IonButton>

                <IonButton
                  color="medium"
                  style={{ marginLeft: "20px" }}
                  onClick={() => setDeleteConfirm(false)}
                >
                  Close
                </IonButton>
              </div>
            </PopUp>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
