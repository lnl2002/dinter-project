import { Button, InputGroup, Modal } from "react-bootstrap";
import { TextWeb } from "../../pages/ProfileScreen";

export default function GenderPicker({
    defaultGender,
    visible,
    onCancel
}) {
    return (
        <InputGroup className="p-0 mt-3" style={{ display: visible ? '' : 'none' }}>
            <GenderTab
                style={{background: '#5085ff'}}
                name={'male'}
            />
            <GenderTab
                style={{background: '#fe5364'}}
                name={'female'}
            />
            <GenderTab
                style={{background: '#898989'}}
                name={'other'}
            />
        </InputGroup>
    )
}


export const GenderTab = ({
    name,
    style,
    svg
}) => {
    return (
        <div style={{...style, borderRadius: '100px', paddingLeft: '15px', paddingRight: '15px', margin: '0px 10px 0px 10px'}} className="d-flex align-items-center">
            <TextWeb style={{color: 'white'}} text={name}></TextWeb>
            {svg}
            <InputGroup.Radio className="m-2" style={{padding: 0}} name="genderPick"/>
        </div>
    )
}