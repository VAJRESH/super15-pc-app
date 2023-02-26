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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { ellipsisVertical, menu } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../atom/user.atom";
import FormInput from "../../components/FormInput";
import SideMenu from "../../components/SideMenu";
import { db, useAuth, upload } from "../../helper/firebase.helper";
import styles from "./profile.module.css";

export default function Profile() {
  const user = useRecoilValue(currentUserAtom);
  const currentUser = useAuth();

  console.log(user, currentUser);
  const [avatar, setAvatar] = useState(
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
  );

  const [loading, setLoading] = useState(false);

  // const qCollectionRef = collection(db, "questions");

  // const getAllQuestions = () => {
  //   return getDocs(qCollectionRef);
  // };

  // const [dbQuestions, setDbQuestions] = useState([]);

  // useEffect(async () => {
  //   const unsub = onSnapshot(qCollectionRef, (querySnapshot) => {
  //     let qarray = [];
  //     querySnapshot.forEach((docu) => {
  //       qarray.push(docu.data().qText);
  //       console.log(docu.id, " => ", docu.data().qText);
  //     });
  //     setDbQuestions(qarray);
  //   });
  //   // unsub();
  // }, []);

  useEffect(() => {
    if (currentUser?.photoURL) {
      setAvatar(currentUser?.photoURL);
    }
  }, [currentUser]);
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
                {loading ? (
                  ""
                ) : (
                  <img src="/images/carbon_edit (1).png" alt="" />
                )}
              </label>
              <input
                className={styles.uploadPhoto}
                id="uploadPhoto"
                type="file"
                onChange={(e) => {
                  let photoURL = upload(
                    e.target.files[0],
                    currentUser,
                    setLoading,
                    setAvatar
                  );
                }}
              />
            </div>
            <h4 style={{ textAlign: "center" }}>
              Hello, {currentUser?.displayName || "username"}
            </h4>
            <form onSubmit={() => {}}>
              <IonList>
                <FormInput
                  label="First Name "
                  placeholder="First Name"
                  // onIonBlur={setEmailFn}
                />
                <FormInput
                  label="Last Name "
                  placeholder="Last Name"
                  // onIonBlur={(e) => setPassword(e.target.value)}
                />
                <FormInput
                  label="Email"
                  disabled={true}
                  value={user?.email}
                  // onIonBlur={(e) => setConfirmPassword(e.target.value)}
                />
                <FormInput
                  label="Mobile"
                  type="tel"
                  value={user?.phoneNumber}
                  // onIonBlur={(e) => setConfirmPassword(e.target.value)}
                />
                <FormInput
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
                />
                <h4 style={{ textAlign: "center" }}>KYC details</h4>
                <FormInput
                  label="PAN Number"
                  // onIonBlur={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="pan" className={styles.uploadPan}>
                  <h6>Click to upload Image or pdf of pan card here.</h6>
                </label>
                <input type="file" id="pan" className={styles.uploadPhoto} />
              </IonList>
              <br />
              <ion-button type="submit" expand="full" shape="round">
                Update
              </ion-button>
            </form>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </>
  );
}
