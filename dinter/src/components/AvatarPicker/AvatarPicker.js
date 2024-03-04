import { getAccessToken } from "../../common/Token";
import { AvatarDiv, ButtonWeb, useUserStore } from "../../pages/ProfileScreen";
import { BACK_END_HOST } from "../../utils/AppConfig";
import axios from 'axios'

export default function AvatarPicker({
  setingAvatar,
  visible,
  onCancel
}) {
  //zustand user global state 
  const userData = useUserStore((state) => state.userData);
  const setUserData = useUserStore((state) => state.setUserData);
  const onSave = () => {
    const formData = new FormData();
    let requestData = {};
    let headers = {
      token: 'Bearer ' + getAccessToken(),
      'Content-Type': 'application/json',
    };

    // Append the image file to the formData
    formData.append('image', setingAvatar);
    axios.patch(BACK_END_HOST + "api/v1/user/user-basic-update/", requestData, { headers })
      .then((response) => {
        //   setUserData({
        //     ...userData,
        //     avatar: response.data.avatar
        // })
        console.log(response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="p-0 mt-3 flex-column align-items-center" style={{ display: visible ? 'flex' : 'none' }}>
      <div>
        <AvatarDiv style={{border: '2px solid #e3e3e3'}} image={setingAvatar}></AvatarDiv>
      </div>
      <div className="save-options btn-group btn-group-sm mt-3">
        <ButtonWeb variant="secondary" onClick={onCancel} title={"Cancel"}></ButtonWeb>
        <ButtonWeb variant="primary" onClick={() => { onSave(); onCancel() }} title={"Save"} />
      </div>
    </div>
  )
}
