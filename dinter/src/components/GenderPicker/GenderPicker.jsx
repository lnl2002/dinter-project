import { InputGroup } from "react-bootstrap";
import { ButtonWeb, TextWeb, useUserStore } from "../../pages/ProfileScreen";
import { saveUpdateBasicInfo } from "../ProfileSetting";
import { useState } from "react";

export default function GenderPicker({
    defaultGender,
    visible,
    onCancel
}) {
    //zustand user global state 
    const userData = useUserStore((state) => state.userData);
    const setUserData = useUserStore((state) => state.setUserData);

    const [chosenGender, setChosenGender] = useState(defaultGender);

    const onSave= () =>{
        setUserData({
            ...userData,
            gender: chosenGender
        })
    }

    const getGenderTabByString = (string) => {
        switch (string) {
            case 'male': return (
                <GenderTab
                    style={{ background: '#5085ff' }}
                    name={'male'}
                    shownButton={true}
                />);
                break;
            case 'female': return (
                <GenderTab
                    style={{ background: '#fe5364' }}
                    name={'female'}
                    shownButton={true}
                />
            )
                break;
            case 'other': return (
                <GenderTab
                    style={{ background: '#898989' }}
                    name={'other'}
                    shownButton={true}
                />
            ); break;
            default: return (
                <GenderTab
                    style={{ background: '#5085ff' }}
                    name={'male'}
                    shownButton={true}
                />);
                break;

        }
    }

    const GenderTab = ({
        name,
        style,
        svg
    }) => {
        return (
            <div style={{ ...style, borderRadius: '100px', paddingLeft: '15px', paddingRight: '15px', margin: '0px 10px 0px 10px' }} className="d-flex align-items-center">
                <TextWeb style={{ color: 'white' }} text={name}></TextWeb>
                {svg}
                <InputGroup.Radio checked={chosenGender == name} onChange={() => setChosenGender(name)} className="m-2" style={{ padding: 0 }} name="genderPick" />
            </div>
        )
    }

    return (
        <div className="p-0 mt-3 flex-column align-items-center" style={{ display: visible ? 'flex' : 'none' }}>
            <InputGroup>
                {getGenderTabByString('male')}
                {getGenderTabByString('female')}
                {getGenderTabByString('other')}
            </InputGroup>
            <div className="save-options btn-group btn-group-sm mt-3">
                <ButtonWeb variant="secondary" onClick={onCancel} title={"Cancel"}></ButtonWeb>
                <ButtonWeb variant="primary" onClick={() => { saveUpdateBasicInfo({ gender: chosenGender }); onSave(); onCancel() }} title={"Save"} />
            </div>
        </div>
    )
}
