import { useState } from "react"
import { Form } from 'react-bootstrap'
import axios from 'axios'
import Lottie from 'react-lottie'
import * as hobbyAnim from '../../utils/lottie/hobby_anim.json'
import { HobbyTag } from "../ProfileSetting"
import { ButtonWeb } from "../../pages/ProfileScreen"

export const HobbyPicker = ({ style , onCancel, onSave}) => {
  const [hobby, setHobby] = useState();

  const getHobbiesByKeyWord = (keyword) => {
    if (keyword != '') {
      axios.get("http://localhost:3008/api/v1/hobby/" + keyword).then(response => {
        setHobby(response.data.data)
        console.log(response.data.data)
      })
    } else {
      setHobby()
    }
  }

  return (
    <div style={{ 
      position: 'absolute', 
      width: '100%', 
      background: '#dfcccc', 
      borderWidth: '1px solid black',
      borderRadius: '5px', ...style }} className="modal d-flex justify-content-center flex-column">
      <div className="d-flex justify-content-center">
        <h3>Hobby picker</h3>
      </div>
      <div style={{ background: 'white' }}>
        <div className="d-flex flex-column">
          <div className="d-flex flex-column">
            <Form.Control
              type="text"
              aria-describedby="passwordHelpBlock"
              placeholder="Start with some words to update your hobby"
              onChange={(e) => getHobbiesByKeyWord(e.target.value)}
            />
          </div>
        </div>
        <div style={{ minHeight: '100px'}}>
          {
            !hobby || hobby.length == 0 ?
              <Lottie options={
                {
                  loop: true,
                  autoplay: true,
                  animationData: hobbyAnim,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                  }
                }
              }
                isClickToPauseDisabled="false"
                height={200}
                width={200} />
              :
              <div className='d-flex flex-row flex-wrap'>
                {
                  hobby?.map(h =>
                    <HobbyTag key={h._id} editable={false} title={h.hobbyName} />
                  )
                }
              </div>
          }
        </div>
        <div className="save-options btn-group btn-group-sm mt-3">
          <ButtonWeb variant="secondary" onClick={onCancel} title={"Cancel"}></ButtonWeb>
          <ButtonWeb variant="primary" onClick={() => { onSave(); onCancel() }} title={"Save"} />
        </div>
      </div>
    </div>
  )
}