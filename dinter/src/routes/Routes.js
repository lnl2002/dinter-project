import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
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
        path: '/profile',
        element: ProfileScreen
    }
]

export default routes;