import { IsLoadingAtom, SubscriptionAtom } from "@/atom/global.atom";
import useHandleSubscription from "@/hooks/useHandleSubscription";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRecoilValue } from "recoil";
import Loader from "../Loader/index";
import PopUp from "../PopUp/index";
import NoSubscription from "./NoSubscription";

export default function Subscription() {
  const isLoading = useRecoilValue(IsLoadingAtom);
  const subscription = useRecoilValue(SubscriptionAtom);
  const { hanldeSubscription } = useHandleSubscription();

  return (
    <>
      <IonContent className="ion-padding">
        <PopUp isOpen={!!subscription?.isPopUpOpen} style={{ display: "flex" }}>
          <div style={{ height: "100vh", width: "100vw" }}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Subscriptions</IonTitle>

                <IonButtons slot="end">
                  <IonButton
                    strong={true}
                    onClick={() => hanldeSubscription({ isPopUpOpen: null })}
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
          </div>
        </PopUp>
      </IonContent>
    </>
  );
}
