import {
  cardOutline,
  documentTextOutline,
  home,
  libraryOutline,
  logOut,
  person,
  trophyOutline,
} from "ionicons/icons";

export const SidebarMenu = [
  {
    id: 1,
    label: "Home",
    icon: home,
    link: "/dashboard",
  },
  {
    id: 2,
    label: "Profile",
    icon: person,
    link: "/profile",
  },
  {
    id: 3,
    label: "Subscription",
    icon: cardOutline,
    link: "/subscription",
  },
  // {
  //   id: 4,
  //   label: "History",
  //   icon: documentTextOutline,
  //   link: "/history",
  // },
  {
    id: 4,
    label: "Winners",
    icon: trophyOutline,
    link: "/winners",
    // isAdmin: true,
  },
  {
    id: 5,
    label: "Create Quiz",
    icon: libraryOutline,
    link: "/create-quiz",
    isAdmin: true,
  },
  {
    id: 6,
    label: "Logout",
    icon: logOut,
    link: "/login",
  },
];
