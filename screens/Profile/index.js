import { IsLoadingAtom } from "@/atom/global.atom";
import { DEFAULTS } from "@/helper/constants.helper";
import { useAuth } from "@/hooks/useAuth";
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
import { ellipsisVertical } from "ionicons/icons";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { CurrentUserAtom, getUserDataObj } from "../../atom/user.atom";
import FormInput from "../../components/FormInput";
import SideMenu from "../../components/SideMenu";
import { auth, upload } from "../../helper/firebase.helper";
import styles from "./profile.module.css";

export default function Profile() {
  const [user, setUser] = useRecoilState(CurrentUserAtom);
  const [loading, setLoading] = useRecoilState(IsLoadingAtom);

  const currentUser = useAuth();
  const [present] = useIonToast();

  const [userTemp, setUserTemp] = useState(user);
  const [avatar, setAvatar] = useState(user?.photoURL || DEFAULTS?.profilePic);

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

  console.log(user);

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
              <img src={avatar} alt="Avatar" className={styles.avatar} />
              <label className={styles.uploadBtn} htmlFor="uploadPhoto">
                <img src="/images/carbon_edit (1).png" alt="" />
              </label>
              <input
                className={styles.uploadPhoto}
                id="uploadPhoto"
                type="file"
                onChange={(e) =>
                  upload(e.target.files[0], currentUser, setLoading, setAvatar)
                }
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
                  displayName: userTemp?.displayName || user?.displayName,
                  email: userTemp?.email || user?.email,
                });

                setLoading(true);
                console.log(userData);
                updateProfile(auth?.currentUser, userData)
                  .then(() => {
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
                  value={userTemp?.displayName || user?.displayName}
                  onIonInput={(e) =>
                    hanldeChange({ displayName: e.target.value })
                  }
                />
                <FormInput
                  label="Email"
                  disabled={true}
                  value={userTemp?.email || user?.email}
                  // onIonBlur={(e) => setConfirmPassword(e.target.value)}
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
              <br />
              <IonButton type="submit" expand="full" shape="round">
                Update
              </IonButton>
            </form>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
