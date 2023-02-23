import { ellipsisVertical, home, key, libraryOutline, lockOpen, logOut, person } from "ionicons/icons";

export const SidebarMenu = [
    {
        id: 1,
        label: 'Home',
        icon: home,
        link: '/dashboard'
    },
    {
        id: 2,
        label: 'Login',
        icon: key,
        link: '/login'
    },
    {
        id: 3,
        label: 'Register',
        icon: lockOpen,
        link: '/register'
    },
    {
        id: 4,
        label: 'Profile',
        icon: person,
        link: '/profile'
    },
    {
        id: 5,
        label: 'Create Quiz',
        icon: libraryOutline,
        link: '/create-quiz'
    },
    {
        id: 6,
        label: 'Logout',
        icon: logOut,
        link: '/login'
    }
]