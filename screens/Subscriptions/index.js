import { SubscriptionAtom } from "@/atom/global.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import Invoice from "@/components/Invoice/index";
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
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ellipsisVertical } from "ionicons/icons";
import { useRecoilValue } from "recoil";
import styles from "./subscriptions.module.css";

export default function Subscriptions() {
  const user = useRecoilValue(CurrentUserAtom);
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
            <>
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

              <PDFDownloadLink
                document={
                  <Invoice
                    invoiceId={subscription?.orderId}
                    amountInINR={subscription?.amount}
                    paidOn={new Date(subscription?.createdAt).toDateString()}
                    renewOn={new Date(subscription?.expiryDate).toDateString()}
                    paidTo={user?.displayName}
                    transactionId={subscription?.razorpayPaymentId}
                    billingDetails={{
                      name: user?.displayName,
                      address: user?.address,
                      contact: `${user?.email}`,
                    }}
                  />
                }
                fileName="invoice.pdf"
              >
                {({ blob, url, loading, error }) => (
                  <IonButton
                    style={{
                      margin: "10px 50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    {loading ? "Loading document..." : "Download Invoice"}
                  </IonButton>
                )}
              </PDFDownloadLink>
            </>
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
