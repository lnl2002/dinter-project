import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import MessagePage from "../pages/MessagePage";
import Products from "../pages/Products";
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
    },
    {
        path: '/products/:id',
        element: Products
    }
]

export default routes;