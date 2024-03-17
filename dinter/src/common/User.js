import { BACK_END_HOST } from "../utils/AppConfig";

const getUserImage = () => {
    const { user } = JSON.parse(localStorage.getItem('User'));

    return BACK_END_HOST + user.avatar;
}

export default {
    getUserImage
}