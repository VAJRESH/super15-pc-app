import { home, libraryOutline, logOut, person } from "ionicons/icons";

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
    label: "Create Quiz",
    icon: libraryOutline,
    link: "/create-quiz",
    isAdmin: true,
  },
  {
    id: 4,
    label: "Logout",
    icon: logOut,
    link: "/login",
  },
];
