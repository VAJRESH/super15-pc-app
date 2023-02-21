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
import { SidebarMenu } from "../../helper/menu.helper";

export default function SideMenu() {
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
            <IonListHeader>
              <p>Go to any screen</p>
            </IonListHeader>
            <IonMenuToggle autoHide={false}>
              {SidebarMenu.map((menu) => {
                return (
                  <IonItem button key={menu.id} routerLink={menu.link}>
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
