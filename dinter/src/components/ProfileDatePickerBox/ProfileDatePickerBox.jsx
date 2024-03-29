import { ButtonWeb, useUserStore } from "../../pages/ProfileScreen";
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs'
import { useState } from "react";
import { saveUpdateBasicInfo } from "../ProfileSetting";

const DATE_FORMAT = 'DD/MM/YYYY';

export default function ProfileDatePickerBox({
    defaultDob,
    visible,
    onCancel,
}) {
    //zustand user global state 
    const userData = useUserStore((state) => state.userData);
    const setUserData = useUserStore((state) => state.setUserData);

    const [selectedDob, setSelectedDOB] = useState(defaultDob)

    const onSave = () => {
        setUserData({
            ...userData,
            dateOfBirth: selectedDob.toString()
        })
    }
    return (
        <div style={{ display: visible ? 'flex' : 'none' }} className="flex-column">
            <DatePicker
                value={formatDatePicker(selectedDob)}
                defaultValue={formatDatePicker(selectedDob)}
                format={DATE_FORMAT}
                onAbort={() => setSelectedDOB(defaultDob)}
                style={{ display: visible ? '' : 'none' }}
                onChange={(dateString) => { setSelectedDOB(dateString !== '' ? dateString : defaultDob) }} />
            <div className="save-options btn-group btn-group-sm mt-2">
                <ButtonWeb variant="secondary" onClick={onCancel} title={"Cancel"}></ButtonWeb>
                <ButtonWeb variant="primary" onClick={() => { saveUpdateBasicInfo({ dateOfBirth: selectedDob.toString() });onSave() ;onCancel() }} title={"Save"} />
            </div>
        </div>
    )
}

export const formatDatePicker = (date) => {
    return dayjs(date, DATE_FORMAT)
}