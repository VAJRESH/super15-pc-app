import {
  PlansAtom,
  SubscriptionAtom,
  getSubscriptionDataObj,
} from "@/atom/global.atom";
import { UserQuizMapAtom } from "@/atom/quiz.atom";
import { CurrentUserAtom, getUserDataObj } from "@/atom/user.atom";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { logOut } from "../../helper/firebase.helper";
import { SidebarMenu } from "../../helper/menu.helper";

export default function SideMenu() {
  const [user, setUser] = useRecoilState(CurrentUserAtom);
  const [plans, setPlans] = useRecoilState(PlansAtom);
  const [subscription, setSubscription] = useRecoilState(SubscriptionAtom);
  const [userQuizMap, setUserQuizMap] = useRecoilState(UserQuizMapAtom);

  const router = useRouter();

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonList>
            <IonMenuToggle autoHide={false}>
              {SidebarMenu.map((menu) => {
                if (menu?.isAdmin && !user?.isAdmin) return null;

                return (
                  <IonItem
                    button
                    key={menu.id}
                    onClick={() => {
                      if (menu.label === "Logout") {
                        setUser(getUserDataObj());
                        setPlans(null);
                        setSubscription(getSubscriptionDataObj());
                        setUserQuizMap([]);
                        logOut();
                      }
                      router.push(menu.link);
                    }}
                  >
                    <IonIcon slot="start" icon={menu.icon}></IonIcon>
                    <IonLabel>{menu.label}</IonLabel>
                  </IonItem>
                );
              })}
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
}
