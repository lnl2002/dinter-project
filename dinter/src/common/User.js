import { BACK_END_HOST } from "../utils/AppConfig";

const getUserImage = () => {
    const { user } = JSON.parse(localStorage.getItem('User'));


    if(user && user.avatar) {
        return BACK_END_HOST + user.avatar;
    }

    return BACK_END_HOST + 'public/images/users/user_blank.png';
}

const getOtherImage = (uri) => {
    if(uri) {
        return (BACK_END_HOST + uri);
    }
    return (BACK_END_HOST + 'public/images/users/user_blank.png');
}

export default {
    getUserImage,
    getOtherImage
}