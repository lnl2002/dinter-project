import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import MessagePage from "../pages/MessagePage";
import ProfileScreen from "../pages/ProfileScreen";
import RequestFriend from "../pages/RequestFriend";
import ProfileSetup from "../pages/ProfileSetup";
import Story from "../pages/Story";


const routes = [
    {
        path: '/login',
        element: Login
    },
    {
        path: '/profilesetup',
        element: ProfileSetup
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
    },
    {
        path: '/story',
        element: Story
    }
]

export default routes;
