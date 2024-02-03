import { SubscriptionAtom } from "@/atom/global.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import Invoice from "@/components/Invoice/index";
import SideMenu from "@/components/SideMenu";
import NoSubscription from "@/components/Subscription/NoSubscription";
import useHandleSubscription from "@/hooks/useHandleSubscription";
import { cancelSubscription } from "@/services/razorpayX.services";
import { Filesystem } from "@capacitor/filesystem";
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
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styles from "./subscriptions.module.css";
import { SUBSCRIBTION_STATUS } from "@/helper/constants.helper";

export default function Subscriptions() {
  const user = useRecoilValue(CurrentUserAtom);
  const subscription = useRecoilValue(SubscriptionAtom);

  useHandleSubscription();

  useEffect(() => {
    Filesystem.addListener("progress", (res) =>
      console.log(res, JSON.stringify(res)),
    );
  }, []);
  console.log(subscription);

  const isCancelled = subscription?.status === SUBSCRIBTION_STATUS?.cancelled;

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
                  <h5>{subscription?.name}</h5>
                  <b>Amount: ₹{subscription?.amount || 0} /-</b>
                  <p>
                    Renew on{" "}
                    {new Date(subscription?.endAt * 1000).toDateString()}
                  </p>
                </div>
              </div>

              <div className={styles.btnContainer}>
                <PDFDownloadLink
                  document={
                    <Invoice
                      invoiceId={subscription?.id}
                      amountInINR={subscription?.amount}
                      paidOn={new Date(
                        subscription?.startAt * 1000,
                      ).toDateString()}
                      renewOn={new Date(
                        subscription?.endAt * 1000,
                      ).toDateString()}
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
                      onClick={async () => {
                        const options = {
                          url,
                          //  headers: this.defaultHeaders,
                          //  directory: Directory.Data,
                          path: "downloads/invoice.pdf",
                          progress: true,
                        };
                        const response = await Filesystem.downloadFile(options);
                        console.log(response, JSON.stringify(response));
                      }}
                    >
                      {loading ? "Loading document..." : "Download Invoice"}
                    </IonButton>
                  )}
                </PDFDownloadLink>

                <IonButton
                  color="danger"
                  fill="outline"
                  onClick={() => cancelSubscription(subscription?.id)}
                  disabled={isCancelled}
                >
                  {isCancelled ? "Cancelled" : "Cancel Subscription"}
                </IonButton>
              </div>
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
