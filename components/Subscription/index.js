import { IsLoadingAtom, SubscriptionAtom } from "@/atom/global.atom";
import useHandleSubscription from "@/hooks/useHandleSubscription";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRecoilValue } from "recoil";
import Loader from "../Loader/index";
import NoSubscription from "./NoSubscription";

export default function Subscription() {
  const isLoading = useRecoilValue(IsLoadingAtom);
  const subscription = useRecoilValue(SubscriptionAtom);
  const { hanldeSubscription } = useHandleSubscription();

  return (
    <>
      <IonContent className="ion-padding">
        <IonModal
          isOpen={subscription?.isPopUpOpen}
          style={{ display: "flex" }}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Subscriptions</IonTitle>

              <IonButtons slot="end">
                <IonButton
                  strong={true}
                  onClick={() =>
                    hanldeSubscription({
                      isPopUpOpen: !subscription?.isPopUpOpen,
                    })
                  }
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          {isLoading && <Loader isFullPage={true} />}

          <IonContent>
            <NoSubscription />
          </IonContent>
        </IonModal>
      </IonContent>
    </>
  );
}
