import { ButtonWeb } from "../../pages/ProfileScreen";
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs'
import { useState } from "react";

export default function ProfileDatePickerBox({
    defaultDob,
    visible,
    onSave,
    onCancel,
}) {
    const dateFormat = 'DD/MM/YYYY';
    const [selectedDob, setSelectedDOB] = useState(defaultDob)

    return (
        <div style={{ position: 'relative' , visibility: visible? '' : 'hidden'}} className="d-flex flex-column">
            <DatePicker
                value={dayjs(selectedDob, dateFormat)}
                defaultValue={dayjs(selectedDob, dateFormat)}
                format={dateFormat}
                onAbort={()=>setSelectedDOB(defaultDob)}
                style={{ display: visible ? '' : 'none' }} onChange={(dateString)=> {setSelectedDOB(dateString !== '' ? defaultDob : dateString)}} />
            <div className="save-options btn-group btn-group-sm mt-2">
                <ButtonWeb variant="secondary" onClick={onCancel} title={"Cancel"}></ButtonWeb>
                <ButtonWeb variant="primary" onClick={onSave} title={"Save"} />
            </div>
        </div>
    )
}