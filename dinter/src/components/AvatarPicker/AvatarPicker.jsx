import { getAccessToken } from "../../common/Token";
import { AvatarDiv, ButtonWeb, useUserStore } from "../../pages/ProfileScreen";
import { BACK_END_HOST } from "../../utils/AppConfig";
import axios from 'axios'

export default function AvatarPicker({
  avatarFile,
  avatarUrl,
  visible,
  onCancel
}) {
  //zustand user global state 
  const userData = useUserStore((state) => state.userData);
  const setUserData = useUserStore((state) => state.setUserData);
  const userLocal = JSON.parse(localStorage.getItem('User'));

  const onSave = () => {
    console.log(avatarFile)
    
    let formData = new FormData()
    console.log(avatarFile)
    formData.append("image", avatarFile);

    let headers = {
      token: 'Bearer ' + getAccessToken(),
      'Content-Type': 'multipart/form-data',
    };

    axios.patch(BACK_END_HOST + "api/v1/user/user-basic-update/", formData, { headers })
      .then((response) => {
        setUserData({
          ...userData,
          avatar: response.data.avatar
      })
      userLocal.avatar = response.data.avatar;
      localStorage.setItem('User', JSON.stringify(userLocal));
      console.log(response)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="p-0 mt-3 flex-column align-items-center" style={{ display: visible ? 'flex' : 'none' }}>
      <div>
        <AvatarDiv style={{border: '2px solid #e3e3e3'}} image={avatarUrl}></AvatarDiv>
      </div>
      <div className="save-options btn-group btn-group-sm mt-3">
        <ButtonWeb variant="secondary" onClick={onCancel} title={"Cancel"}></ButtonWeb>
        <ButtonWeb variant="primary" onClick={() => { onSave(); onCancel() }} title={"Save"} />
      </div>
    </div>
  )
}
