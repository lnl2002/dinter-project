import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import MessagePage from "../pages/MessagePage";
import ProfileScreen from "../pages/ProfileScreen";
import RequestFriend from "../pages/RequestFriend";

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
    },
    {
        path: '/request-friend',
        element: RequestFriend
    }
]

export default routes;
