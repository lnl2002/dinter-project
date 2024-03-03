import React, { useState } from 'react';
import { ButtonWeb } from '../../pages/ProfileScreen';
import { saveUpdateBasicInfo } from '../ProfileSetting';

function TextInputAreaBox({ name, onSave, onCancel, default_value, visible, ...attributes }) {
    const [textAreaValue, setTextAreaValue] = useState(default_value != '#N/A' ? default_value : '');

    const onTextAreaChange = (e) => {
        setTextAreaValue(e.target.value);
    };

    return (
        <div className="save-field" style={{ position: 'relative' , display: visible? '' : 'none'}}>
            <textarea
                placeholder={'Something about you'}
                autoFocus={true}
                className="form-control"
                onChange={onTextAreaChange}
                value={textAreaValue}
                name={name}
                spellCheck={false}
                {...attributes}
            ></textarea>
            <div className="save-options btn-group btn-group-sm mt-2" style={{ position: 'absolute', right: 0 }}>
                <ButtonWeb variant="secondary" onClick={onCancel} title={"Cancel"}></ButtonWeb>
                <ButtonWeb variant="primary" onClick={() => {saveUpdateBasicInfo({bio: textAreaValue}); onCancel()}} title={"Save"} />
            </div>
        </div>
    );
}

export default TextInputAreaBox;