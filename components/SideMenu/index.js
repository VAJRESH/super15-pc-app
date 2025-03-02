import { CurrentUserAtom, getUserDataObj } from "@/atom/user.atom";
import { ADMIN_UIDS } from "@/helper/constants.helper";
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
                if (menu?.isAdmin && !ADMIN_UIDS?.includes(user?.uid))
                  return null;

                return (
                  <IonItem
                    button
                    key={menu.id}
                    onClick={() => {
                      if (menu.label === "Logout") {
                        setUser(getUserDataObj());
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
