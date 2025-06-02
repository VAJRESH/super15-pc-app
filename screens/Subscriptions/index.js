import { PlansAtom, SubscriptionAtom } from "@/atom/global.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import Invoice from "@/components/Invoice/index";
import SideMenu from "@/components/SideMenu";
import NoSubscription from "@/components/Subscription/NoSubscription";
import { SUBSCRIBTION_STATUS } from "@/helper/constants.helper";
import useHandleSubscription from "@/hooks/useHandleSubscription";
import { cancelSubscription } from "@/services/razorpayX.services";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { FileOpener } from "@capawesome-team/capacitor-file-opener";
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
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "./subscriptions.module.css";

export default function Subscriptions() {
  const user = useRecoilValue(CurrentUserAtom);
  const plans = useRecoilValue(PlansAtom);
  const [subscription, setSubscription] = useRecoilState(SubscriptionAtom);

  useHandleSubscription();

  const isCancelled = subscription?.status === SUBSCRIBTION_STATUS?.cancelled;

  async function base64FromPath(path) {
    const response = await fetch(path);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("method did not return a string");
        }
      };
      reader.readAsDataURL(blob);
    });
  }

  const currentPlan = plans?.find(
    (plan) => plan?.item?.name === subscription?.planId,
  );

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
                  {/* <h5>{subscription?.name}</h5> */}
                  {/* <b>Amount: ₹{subscription?.amount || 0} /-</b> */}
                  <h5>{currentPlan?.item?.name}</h5>
                  <b>Amount: ₹{currentPlan?.item?.amount / 100 || 0} /-</b>
                  <p>
                    Renew on{" "}
                    {new Date(subscription?.endAt * 1000).toDateString()}
                  </p>
                </div>
              </div>

              <div className={styles.btnContainer}>
                {/* <PDFDownloadLink
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
                    <>
                      <IonButton
                        onClick={async () => {
                          const photoURL = URL.createObjectURL(blob);
                          const base64Data = await base64FromPath(photoURL);
                          const options = {
                            data: base64Data,
                            directory: Directory.Documents,
                            path: "invoice.pdf",
                          };

                          const response = await Filesystem.writeFile(options);
                          if (!response?.uri)
                            return alert(
                              "File not saved. Something went wrong",
                            );

                          await FileOpener.openFile({ path: response?.uri });
                        }}
                      >
                        {loading ? "Loading document..." : "Download Invoice"}
                      </IonButton>
                    </>
                  )}
                </PDFDownloadLink> */}

                <IonButton
                  color="danger"
                  fill="outline"
                  onClick={() => {
                    cancelSubscription(subscription?.id).then(() =>
                      setSubscription({
                        ...subscription,
                        status: SUBSCRIBTION_STATUS?.cancelled,
                      }),
                    );
                  }}
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
