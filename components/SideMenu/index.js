import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { home, key, lockOpen, person } from "ionicons/icons";
import { useRouter } from "next/router";
import { logOut } from "../../helper/firebase.helper";
import { SidebarMenu } from "../../helper/menu.helper";

export default function SideMenu() {
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
                return (
                  <IonItem
                    button
                    key={menu.id}
                    onClick={() => {
                      if (menu.label === 'Logout') {
                        logOut();
                      }
                      router.push(menu.link)
                    }
                    }
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
