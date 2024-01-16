import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import MessagePage from "../pages/MessagePage";
import ProfileScreen from "../pages/ProfileScreen";

const routes = [
    {
        path: '/login',
        element: Login
    },
    {
        path: '/',
        element: HomePage
    },
    {
        path: '/messages',
        element: MessagePage
    },
    {
        path: '/profile',
        element: ProfileScreen
    }
]

export default routes;