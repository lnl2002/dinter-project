import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import MessagePage from "../pages/MessagePage";
import ProfileScreen from "../pages/ProfileScreen";
import RequestFriend from "../pages/RequestFriend";
import ProfileSetup from "../pages/ProfileSetup";
import Story from "../pages/Story";
import Dashboard from "../pages/Dashboard";
import ResetPassword from "../pages/ResetPassword";
import StoryCreation from "../pages/StoryCreation";
import PostDetailProView from "../pages/PostDetailProView";
import CallVideo from "../pages/CallVideo/CallVideo";
import MatchesPage from "../pages/MatchesPage";


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
        path: '/matches',
        element: MatchesPage
    },
    {
        path: '/profile',
        element: ProfileScreen
    },
    {
        path: '/profile/:userId',
        element: ProfileScreen
    },
    {
        path: '/post/:postId',
        element: PostDetailProView
    },
    {
        path: '/request-friend',
        element: RequestFriend
    },
    {
        path: '/story/:storyId',
        element: Story
    },
    {
        path: '/dashboard',
        element: Dashboard,
    },
    {   
        path: '/reset-password',
        element: ResetPassword,
    },
    {
        path: '/story/create',
        element: StoryCreation,
    },
    {
        path: '/call-video/:roomId',
        element: CallVideo
    }
]

export default routes;
