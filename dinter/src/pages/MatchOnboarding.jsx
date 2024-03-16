import React, { useEffect, useState } from 'react';
import { InputGroup, Modal } from 'react-bootstrap';
import '../components/PostDetail/PostDetail.css'
import Carousel from 'react-bootstrap/Carousel';
import DinterGoogleMap from '../components/DinterGoogleMap';
import * as animationData from '../utils/lottie/love_anim.json'
import * as nextAnim from '../utils/lottie/next_anim.json'
import Lottie from 'react-lottie';
import { TextWeb } from './ProfileScreen';
import { HobbyPicker } from '../components/HobbyPicker/HobbyPicker';
import { HobbyTag, saveUpdateBasicInfo } from '../components/ProfileSetting';

function MatchOnboarding({
  visible,
  user,
  onHideAction,
}) {
  const [onboardingProgress, setOnboardingProgress] = useState(0)
  const [chosenCoordinator, setChosenCoordinators] = useState({ lat: 0, lng: 0 })
  const [chosenHobbies, setChosenHobbies] = useState()

  const onChooseCoodination = ({ lat, lng }) => {
    setChosenCoordinators({ lat: lat, lng: lng })
  }

  const onChooseGender = (gender) => {
    setChosenGender(gender)
    console.log(user)
  }

  const onSaveChosenHobby = (chosenHobby) => {
    setChosenHobbies(chosenHobby)
  }


  const chosenInformation = () => {
    switch (onboardingProgress) {
      case 0: return (<p>Lat: {chosenCoordinator.lat}  -   Lng: {chosenCoordinator.lng}</p>)
      case 1: return (<p>Attracted by: {chosenGender == 'other' ? "Doesn't matter at all" : chosenGender}</p>)
      case 2: return (<>
        <p>Intersted in: </p>
        <div className='d-flex flex-row align-content-start flex-wrap'>
          {
            chosenHobbies.map(h => <HobbyTag key={h._id} editable={false} title={h.hobbyName} />)
          }
        </div>
      </>)
      case 3: return (
      <div style={{marginTop: '20px'}}>
        <b>Location: </b>
        <p>Lat: {chosenCoordinator.lat}  -   Lng: {chosenCoordinator.lng}</p>

        <b>Attracted by: </b>
        <p>{chosenGender == 'other' ? "Doesn't matter at all" : chosenGender}</p>

        <b>Intersted in: </b>
        <div className='d-flex flex-row align-content-start flex-wrap'>
          {
            chosenHobbies.map(h => <HobbyTag key={h._id} editable={false} title={h.hobbyName} />)
          }
        </div>
      </div>)
    }
  }

    const chooseDefaultGenderForUser = () => {
      switch (user.gender) {
        case 'male': return 'female'
        case 'female': return 'male'
        case 'other': return "other"
      }
    }

    const handleNextStep = () => {
      setOnboardingProgress(prew => prew < onBoardingText.length -1 ? prew +1: prew)
      if(onboardingProgress < onBoardingText.length -1){
        setOnboardingProgress(onboardingProgress +1)
      } else{
        saveUpdateBasicInfo({
          location: chosenCoordinator,
          hobbies: chosenHobbies,
          attractedBy: chosenGender
        })
      }
    }

    const handleBackStep = () => {
      setOnboardingProgress(prew => prew >0 ? prew-1 : 0)
    }

    const [chosenGender, setChosenGender] = useState(chooseDefaultGenderForUser())

    const onBoardingText = [
      ["Step 1: Choose where you want to find partner:", "Choose one location, we will find out people who nearest to the given location"],
      ["Step 2: Choose the gender you are attracted by:", "We will show only person who match this attribute"],
      ["Step 3: Confirm your hobbies:", "This may increase the chance you find the perfect one"],
      ["Finish: Let's review what you've chosen."]
    ]

    useEffect(() => {
      setChosenGender(chooseDefaultGenderForUser())
      setChosenHobbies(user.hobbies)
    }, [user])

    return (
      <Modal show={visible} onHide={onHideAction} contentClassName='model-content' dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Body className='post-detail justify-content-center align-items-center' style={{ padding: 0 }}>
          <Lottie style={{ position: "absolute", right: 0 }} options={
            {
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }
          }
            isClickToPauseDisabled="false"
            height={'170px'}
            width={'170px'} />
          <div style={{ height: '90vh' }} className="d-flex flex-row justify-content-between header align-items-center">
            <div className='d-flex flex-column align-items-center' style={{ padding: 0, maxWidth: '50vw', height: '85vh', width: 'fit-content', overflow: 'hidden' }}>
              <div className='header-logo poin pointer mb-3'>
                <img src='images/common/dinter-logo.png' alt='logo' width={"30px"} />
                <strong style={{ marginLeft: "5px" }}>DINTER MATCHES</strong>

              </div>
              <div className='d-flex flex-column align-items-center'>
                <h2>Before you start</h2>
                <p>Let's make a quick setup</p>
              </div>

              <Carousel indicators={false} controls={false} interval={null} activeIndex={onboardingProgress}>
                <Carousel.Item style={{ height: '50vh' }}>
                  <DinterGoogleMap onChooseCoor={({ lat, lng }) => onChooseCoodination({ lat, lng })}></DinterGoogleMap>
                </Carousel.Item>
                <Carousel.Item style={{ height: '50vh' }}>
                  <GenderPicker style={{ height: '60vh', width: '50vw' }} onChooseGender={((gender) => onChooseGender(gender))} defaultGender={chooseDefaultGenderForUser()} visible={true}></GenderPicker>
                </Carousel.Item>
                <Carousel.Item style={{ height: '50vh', overflow:'hidden' }}>
                  <HobbyPicker style={{ height: '60vh', width: '50vw', paddingLeft: '100px', paddingRight: '100px' }} defaultHobby={chosenHobbies} visible={true} onCancel={() => { }} onSave={(chosenHobby) => onSaveChosenHobby(chosenHobby)}></HobbyPicker>
                </Carousel.Item>
                <Carousel.Item style={{ height: '0px' }}>
                  <div style={{height: '60vh', width: '50vw'}}/>
                </Carousel.Item>
              </Carousel>

              <div className='d-flex row p-3' style={{ width: '100%' }}>
                <div className='col-md-1'>
                  <button onClick={() => handleBackStep()} style={{ height: '100%', width: '100%', background: 'none' }}>
                    <svg fill="#fe2036" width={20} height={20} viewBox="0 0 1024 1024" stroke="#fe2036"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M375.39 512.768l-40.882 43.647c-24.163 25.797-64.664 27.122-90.461 2.959a65.595 65.595 0 01-1.286-1.238l-3.404-3.646a64.015 64.015 0 01-9.88-15.43 64.144 64.144 0 01-5.666-27.691 64.144 64.144 0 016.781-27.439c.453-.901.929-1.794 1.428-2.678a63.537 63.537 0 019.577-12.883L659.906 21.767c24.163-25.797 64.664-27.122 90.461-2.959s27.122 64.664 2.959 90.461L375.39 512.768l377.05 403.815c23.1 26.753 20.139 67.168-6.615 90.268s-67.168 20.139-90.268-6.615l-412.796-442.1z"></path></g></svg>
                  </button>
                </div>
                <div className='col-md-7'>
                  <h5 style={{ color: '#fe5f62' }}>{onBoardingText[onboardingProgress][0]}</h5>
                  <p>{onBoardingText[onboardingProgress][1]}</p>
                  <b>Your selection:</b>
                  {
                    chosenInformation()
                  }
                </div>
                <div className='col-md-4'>
                  <button onClick={() => {handleNextStep()}} style={{ height: '100%', width: '100%', background: 'none' }}>
                    <Lottie style={{ position: "absolute", right: 100 }} options={
                      {
                        loop: true,
                        autoplay: true,
                        animationData: nextAnim,
                        rendererSettings: {
                          preserveAspectRatio: 'xMidYMid slice'
                        }
                      }
                    }
                      isClickToPauseDisabled="false"
                      height={'30px'}
                      width={'70px'} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <button onClick={onHideAction} className='close-button'>
          <svg style={{ color: 'white' }} class="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
        </button>
      </Modal>
    );
  }

  function GenderPicker({
    defaultGender,
    visible,
    onChooseGender,
    style
  }) {

    const [chosenGender, setChosenGender] = useState(defaultGender);

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

    useEffect(() => {
      setChosenGender(defaultGender)
    }, [defaultGender])

    const GenderTab = ({
      name,
      style,
      svg
    }) => {
      return (
        <div style={{ ...style, borderRadius: '100px', paddingLeft: '15px', paddingRight: '15px', margin: '0px 10px 0px 10px' }} className="d-flex align-items-center">
          <TextWeb style={{ color: 'white' }} text={name}></TextWeb>
          {svg}
          <InputGroup.Radio checked={chosenGender == name} onChange={() => { setChosenGender(name); onChooseGender(name) }} className="m-2" style={{ padding: 0 }} name="genderPick" />
        </div>
      )
    }

    return (
      <div className="p-0 mt-3 flex-column align-items-center" style={{ ...style, display: visible ? 'flex' : 'none' }}>
        <InputGroup className='justify-content-center'>
          {getGenderTabByString('male')}
          {getGenderTabByString('female')}
          {getGenderTabByString('other')}
        </InputGroup>
      </div>
    )
  }

  export default MatchOnboarding;