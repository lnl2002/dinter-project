import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../ProfileSetting/ProfileSetting.css'
import { AvatarDiv, ButtonWeb, TextWeb, useUserStore } from '../../pages/ProfileScreen';
import TextInputAreaBox from '../TextInputAreaBox/TextInputAreaBox';
import { create } from 'zustand'
import ProfileDatePickerBox from '../ProfileDatePickerBox/ProfileDatePickerBox';
import { BACK_END_HOST } from '../../utils/AppConfig';
import axios from 'axios';
import { getAccessToken } from '../../common/Token';
import GenderPicker from '../GenderPicker/GenderPicker';
import AvatarPicker from '../AvatarPicker/AvatarPicker';
import { HobbyPicker } from '../HobbyPicker/HobbyPicker';

export default function ProfileSetting({
  visible,
  onHideAction,
  user
}) {
  //zustand user global state 
  const userData = useUserStore((state) => state.userData);
  const setUserData = useUserStore((state) => state.setUserData);

  const isBioUpdating = useUpdateStore((state) => state.isBioUpdating)
  const setIsBioUpdating = useUpdateStore((state) => state.setIsBioUpdating)

  const isDOBUpdating = useUpdateStore((state) => state.isDOBUpdating)
  const setIsDOBUpdating = useUpdateStore((state) => state.setIsDOBUpdating)

  const isHobAdding = useUpdateStore((state) => state.isHobAdding)
  const setIsHobAdding = useUpdateStore((state) => state.setIsHobAdding)

  const isGenderUpdating = useUpdateStore((state) => state.isGenderUpdating)
  const setIsGenderUpdating = useUpdateStore((state) => state.setIsGenderUpdating)

  const isAvatarUpdating = useUpdateStore((state) => state.isAvatarUpdating)
  const setIsAvatarUpdating = useUpdateStore((state) => state.setIsAvatarUpdating)

  const inputRef = useRef(null);
  const [avatarUpdateUrl, setAvatarUpdateUrl] = useState(BACK_END_HOST + (user.avatar ?? 'user_blank.png'));
  const [avatarUpdateFile, setAvatarUpdateFile] = useState();
  const handleUploadClick = () => {
    // Trigger the input click
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Handle the file change
  const handleFileChange = (e) => {
    // Get the selected file
    if (e.target.files && e.target.files[0]) {
      setAvatarUpdateFile(e.target.files[0]);
      setAvatarUpdateUrl(URL.createObjectURL(e.target.files[0]));
    }
    const file = e.target.files[0];
    setIsAvatarUpdating(true);
  };

  const onSaveChosenHobby = (chosenHobby) => {
    setUserData({
      ...userData,
      hobbies: chosenHobby
    })
    const chosenHobbyIdArray = chosenHobby.map(c => c._id);
    saveUpdateBasicInfo({hobbies: chosenHobbyIdArray})
  }

  useEffect(() => {
    setAvatarUpdateUrl(BACK_END_HOST + user.avatar)
  }, [user])

  const AvatarUpdateField = ({ avatarUrl, avatarFile }) => {
    const isAvatarUpdating = useUpdateStore((state) => state.isAvatarUpdating)
    const setIsAvatarUpdating = useUpdateStore((state) => state.setIsAvatarUpdating)
    return (
      <div>
        <AvatarDiv style={{ height: 100, width: 100, display: (isAvatarUpdating ? 'none' : 'flex') }} image={avatarUrl}></AvatarDiv>
        <AvatarPicker avatarFile={avatarFile} avatarUrl={avatarUrl} visible={isAvatarUpdating} onCancel={() => { setIsAvatarUpdating(false); setAvatarUpdateUrl(BACK_END_HOST + (user.avatar ?? 'user_blank.png')) }}></AvatarPicker>
      </div>
    )
  }

  return (
    <>
      <Modal show={visible} onHide={onHideAction} contentClassName='model-content' aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header className='d-flex justify-content-between'>
          <div></div>
          <Modal.Title style={{ fontSize: '1rem' }}>Update personal information</Modal.Title>
          <button onClick={onHideAction} className='cls-button'>
            <svg style={{ color: '#565561' }} fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
          </button>
        </Modal.Header>
        <Modal.Body className='post-detail justify-content-center align-items-center' style={{ padding: 0 }}>
          <div className="d-flex flex-column">
            <UpdateFieldLayout isUpdatingAction={handleUploadClick} title={"Avatar"}>
              <input onChange={(e) => handleFileChange(e)} style={{ display: 'none' }} ref={inputRef} type='file' accept="image/png, image/jpeg" />
              <AvatarUpdateField avatarUrl={avatarUpdateUrl} avatarFile={avatarUpdateFile}></AvatarUpdateField>
            </UpdateFieldLayout>
            <UpdateFieldLayout isUpdatingTextChange={isBioUpdating} isUpdatingAction={() => setIsBioUpdating(!isBioUpdating)} title={"Bio"}>
              <BioField detail={user.bio ?? '#N/A'}></BioField>
            </UpdateFieldLayout>
            <UpdateFieldLayout isUpdatingTextChange={isGenderUpdating} isUpdatingAction={() => setIsGenderUpdating(!isGenderUpdating)} title={"Gender"}>
              <GenderField gender={user.gender || 'male'}></GenderField>
            </UpdateFieldLayout>
            <UpdateFieldLayout isUpdatingTextChange={isDOBUpdating} isUpdatingAction={() => setIsDOBUpdating(!isDOBUpdating)} title={"Date of birth"}>
              <BODField dob={user.dateOfBirth ? formatDateProfile(user.dateOfBirth) : '01/01/2000'}></BODField>
            </UpdateFieldLayout>
            <UpdateFieldLayout isUpdatingAction={() => setIsHobAdding(!isHobAdding)} title={"Hobby"}>
              <div className='d-flex flex-row flex-wrap'>
                {
                  user.hobbies && user.hobbies.map(h =>
                    <HobbyTag key={h._id} title={h.hobbyName}></HobbyTag>
                  )
                }
              </div>
              <HobbyPicker defaultHobby={user.hobbies} visible={isHobAdding} style={{ position: 'absolute' }} onCancel={() => setIsHobAdding(false)} onSave={(chosenHobby) => onSaveChosenHobby(chosenHobby)} className={'modal flex-column justify-content-around'}></HobbyPicker>
            </UpdateFieldLayout>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonWeb onClick={onHideAction} variant="secondary" title={"Close"}></ButtonWeb>
          {/* <ButtonWeb variant="primary" title={"Save changes"} /> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

const UpdateFieldLayout = ({
  isUpdatingAction,
  isUpdatingTextChange,
  title,
  children
}) => {
  return (
    <div className='container mb-4'>
      <div className='d-flex align-items-center justify-content-between'>
        <h5 className='m-0'>{title}</h5>
        <Button variant='light' style={{ color: '#fd297b' }} onClick={() => { isUpdatingAction && isUpdatingAction() }}>{isUpdatingTextChange ? 'cancel' : 'update'}</Button>
      </div>
      <div className='d-flex justify-content-center'>
        {children}
      </div>
    </div>
  )
}

export const HobbyTag = ({
  title,
  editable,
  onRemove,
  style
}) => {
  return (
    <div style={{ ...style, backgroundColor: '#fd297b' }} className='hobby-bound hobby-bound-box d-flex align-items-center'>
      <TextWeb style={{ color: 'white' }} text={title} />
      {
        editable ?
          <button onClick={onRemove} style={{ background: 'none', marginLeft: '5px' }}>
            <svg height="15px" width="15px" id="Layer_1" version="1.1" viewBox="0 0 512 512" ><g><path fill='white' d="M256,33C132.3,33,32,133.3,32,257c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224C480,133.3,379.7,33,256,33z    M364.3,332.5c1.5,1.5,2.3,3.5,2.3,5.6c0,2.1-0.8,4.2-2.3,5.6l-21.6,21.7c-1.6,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3L256,289.8   l-75.4,75.7c-1.5,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6c0-2.1,0.8-4.2,2.3-5.6l75.7-76   l-75.9-75c-3.1-3.1-3.1-8.2,0-11.3l21.6-21.7c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l75.7,74.7l75.7-74.7   c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l21.6,21.7c3.1,3.1,3.1,8.2,0,11.3l-75.9,75L364.3,332.5z" /></g></svg>
          </button> :
          <></>
      }
    </div>
  )
}

const BioField = ({ detail }) => {
  const isBioUpdating = useUpdateStore((state) => state.isBioUpdating)
  const setIsBioUpdating = useUpdateStore((state) => state.setIsBioUpdating)

  return (
    <div>
      <TextWeb visible={!isBioUpdating} text={detail} />
      <TextInputAreaBox onCancel={() => setIsBioUpdating(false)} default_value={detail} visible={isBioUpdating}></TextInputAreaBox>
    </div>
  )
}

const GenderField = ({ gender }) => {
  const isGenderUpdating = useUpdateStore((state) => state.isGenderUpdating)
  const setIsGenderUpdating = useUpdateStore((state) => state.setIsGenderUpdating)

  return (
    <div>
      <TextWeb visible={!isGenderUpdating} text={gender} />
      <GenderPicker defaultGender={gender} visible={isGenderUpdating} onCancel={() => setIsGenderUpdating(false)}></GenderPicker>
    </div>
  )
}

const BODField = ({ dob }) => {
  const isDOBUpdating = useUpdateStore((state) => state.isDOBUpdating)
  const setIsDOBUpdating = useUpdateStore((state) => state.setIsDOBUpdating)

  return (
    <div>
      <TextWeb visible={!isDOBUpdating} text={dob} />
      <ProfileDatePickerBox defaultDob={dob} onCancel={() => setIsDOBUpdating(false)} visible={isDOBUpdating} />
    </div>
  )
}

export const saveUpdateBasicInfo = async (field) => {
  const changes = {
    ...field
  };
  console.log(changes)
  let headers = {
    token: 'Bearer ' + getAccessToken(),
    'Content-Type': 'application/json',
  };
  const url = BACK_END_HOST + "api/v1/user/user-basic-update"; // Replace with your API endpoint

  try {
    const response = await axios.patch(url, { changes }, { headers });
    console.log('User information updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating user information:', error.message);
  }

}

const useUpdateStore = create((set) => ({
  isBioUpdating: false,
  setIsBioUpdating: (isUpdating) => set((state) => ({ isBioUpdating: isUpdating })),

  isDOBUpdating: false,
  setIsDOBUpdating: (isUpdating) => set((state) => ({ isDOBUpdating: isUpdating })),

  isHobAdding: false,
  setIsHobAdding: (isUpdating) => set((state) => ({ isHobAdding: isUpdating })),

  isGenderUpdating: false,
  setIsGenderUpdating: (isUpdating) => set((state) => ({ isGenderUpdating: isUpdating })),

  isAvatarUpdating: false,
  setIsAvatarUpdating: (isUpdating) => set((state) => ({ isAvatarUpdating: isUpdating })),
}))

export const formatDateProfile = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = date.getUTCDate() + 1;
  const month = date.getUTCMonth() + 1; // Months are zero-based (0 = January, 1 = February, etc.)
  const year = date.getUTCFullYear();

  // Format the date as DD/MM/YYYY
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  return formattedDate;
};