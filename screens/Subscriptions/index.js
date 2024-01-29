import { SubscriptionAtom } from "@/atom/global.atom";
import SideMenu from "@/components/SideMenu";
import NoSubscription from "@/components/Subscription/NoSubscription";
import { SUBSCRIBTIONS } from "@/helper/constants.helper";
import useHandleSubscription from "@/hooks/useHandleSubscription";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonPage,
  IonSplitPane,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { useRecoilValue } from "recoil";
import styles from "./subscriptions.module.css";

export default function Subscriptions() {
  const subscription = useRecoilValue(SubscriptionAtom);
  useHandleSubscription();

  return (
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
              <IonLabel>Subscription</IonLabel>
            </IonItem>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {!!subscription?.razorpayPaymentId ? (
            <div className={styles.subscription}>
              <div>
                <img
                  src="/images/Super15 Logo.png"
                  style={{ height: "100px", margin: "auto" }}
                />
              </div>

              <div>
                <h5>Super15 Monthly Subscription</h5>
                <b>
                  Amount: ₹{subscription?.amount || SUBSCRIBTIONS?.amount} /-
                </b>
                <p>
                  Renew on {new Date(subscription?.expiryDate).toDateString()}
                </p>
              </div>
            </div>
          ) : (
            <>
              <NoSubscription />
            </>
          )}
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
}
