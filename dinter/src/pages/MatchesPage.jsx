import React, { useEffect, useRef, useState } from 'react'
import './style/matches.css'
import MatchOnboarding from './MatchOnboarding';
import { BACK_END_HOST } from '../utils/AppConfig';
import axios from 'axios'
import Draggable, { DraggableCore } from 'react-draggable';
import { getAccessToken } from '../common/Token';
import { useNavigate } from 'react-router-dom';
import * as mapAnim from '../utils/lottie/map_anim.json'
import Lottie from 'react-lottie';

function MatchesPage() {
    const nav = useNavigate();

    //session user (logged-in user)
    const sessionUser = JSON.parse(localStorage.getItem('User'));

    const [userData, setUserData] = useState();
    const [showOnboarding, setShowOnboarding] = useState(false);

    //for dragging
    const [listUser, setListUser] = useState([]);
    const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [chooseState, setChooseState] = useState(0)

    //limit and offset
    const limitRef = useRef(5)
    const offsetRef = useRef(0)

    const LoadUserPublicInfo = async (userId) => {
        axios.get(BACK_END_HOST + "api/v1/user/public-user-info/" + userId).then(res => {
            setUserData(res.data)
            console.log(res.data)
        });
    }

    const handleDragItem = (e, ui) => {
        setRotation(rotation + ui.deltaX / 25);
        if (ui.x > 270) {
            setChooseState(1)
        }
        else if (ui.x < -270) {
            setChooseState(-1)
        }
        else {
            setChooseState(0)
        }
    }

    const handleStop = (targetUserId) => {
        if (chooseState == -1) {
            //send 
        }
        else if (chooseState == 1) {
            //send friend request
            let headers = {
                token: 'Bearer ' + getAccessToken(),
                'Content-Type': 'application/json',
            };
            axios.post(BACK_END_HOST + "api/v1/user/send-match-request", { targetUserId: targetUserId }, { headers })
                .then((response) => {
                    console.log(response.data)
                    window.alert("Send friend request")
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        if (chooseState != 0) {
            let tempListUser = listUser;
            setListUser(tempListUser.slice(1))
        }
        // Reset position and rotation to default
        setDeltaPosition({ x: 0, y: 0 });
        setRotation(0);
        setChooseState(0)
    };

    const setBottomGroundState = (state) => {
        switch (state) {
            case -1: return 'rgba(242,33,33,0.5)'
            case 1: return 'rgba(0,213,139,0.5)'
            case 0: return 'rgba(255,255,255,0.5)'
        }
    }

    const getMatchedUsers = (limit, offset) => {
        let headers = {
            token: 'Bearer ' + getAccessToken(),
            'Content-Type': 'application/json',
        };
        axios.get(BACK_END_HOST + `api/v1/user/getMatchedUsers?limit=${limit}&offset=${offset}`, { headers })
            .then((response) => {
                console.log(response.data)
                setListUser([
                    ...listUser,
                    ...response.data
                ])
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        LoadUserPublicInfo(sessionUser.id)
        getMatchedUsers(5, 0)
    }, [])

    useEffect(() => {
        if (listUser.length == 1) {
            getMatchedUsers(5, offsetRef.current + 5)
            offsetRef.current = offsetRef.current + 5
        }
    }, [listUser])

    useEffect(() => {
        if (userData) {
            if (!userData.location?.coordinates) {
                setShowOnboarding(true)
            } else {
                setShowOnboarding(false)
            }
        }
    }, [userData])

    return (
        <div style={{ height: "100%", width: '100%', background: "#ececec;", borderLeft: "1px solid gray", overflow: 'hidden' }}>
            {/* <button style={{ background: "white" }}>
                <svg aria-label="Options" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
            </button> */}
            {userData && <MatchOnboarding user={userData} visible={showOnboarding} onHideAction={() => setShowOnboarding(false)}></MatchOnboarding>}
            {
                userData && userData.location?.coordinates ?
                    <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: "100%" }}>
                        <div className='card-container align-items-end'>
                            {
                                listUser && [...listUser].reverse().map(lu =>
                                    <div key={lu._id} style={{
                                        position: "absolute",
                                        alignSelf: 'center',
                                        transform: `rotate(${listUser[0]._id == lu._id ? rotation : 0}deg)`,
                                    }}>
                                        <Draggable position={deltaPosition} defaultPosition={{ x: 0, y: 0 }} axis="both" onDrag={handleDragItem} onStop={() => handleStop(lu._id)}>
                                            <div className='user-card d-flex justify-content-center'>
                                                <img draggable={false} height={'100%'} src={BACK_END_HOST + lu.avatar} alt='error' />
                                                <div className='user-card-info d-flex align-items-center justify-content-between' style={{ paddingBottom: '70px' }}>
                                                    <div>
                                                        <div>
                                                            <p className='text-app'>{lu.username + " " + calculateAge(lu.dateOfBirth)}</p>
                                                        </div>
                                                        <div className='d-flex'>
                                                            <svg focusable="false" aria-hidden="true" role="presentation" viewBox="0 0 24 24" width="24px" height="24px" class="Va(m) Sq(16px)"><g fill="#fff" stroke="#fff" stroke-width=".5" fill-rule="evenodd"><path d="M11.436 21.17l-.185-.165a35.36 35.36 0 0 1-3.615-3.801C5.222 14.244 4 11.658 4 9.524 4 5.305 7.267 2 11.436 2c4.168 0 7.437 3.305 7.437 7.524 0 4.903-6.953 11.214-7.237 11.48l-.2.167zm0-18.683c-3.869 0-6.9 3.091-6.9 7.037 0 4.401 5.771 9.927 6.897 10.972 1.12-1.054 6.902-6.694 6.902-10.95.001-3.968-3.03-7.059-6.9-7.059h.001z"></path><path d="M11.445 12.5a2.945 2.945 0 0 1-2.721-1.855 3.04 3.04 0 0 1 .641-3.269 2.905 2.905 0 0 1 3.213-.645 3.003 3.003 0 0 1 1.813 2.776c-.006 1.653-1.322 2.991-2.946 2.993zm0-5.544c-1.378 0-2.496 1.139-2.498 2.542 0 1.404 1.115 2.544 2.495 2.546a2.52 2.52 0 0 0 2.502-2.535 2.527 2.527 0 0 0-2.499-2.545v-.008z"></path></g></svg>
                                                            <p className='text-app'>{(lu.distance / 1000).toFixed(2) + " km away"}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button style={{ background: 'none' }} onClick={() => nav('/profile/' + lu._id)}>
                                                            <svg focusable="false" aria-hidden="true" role="presentation" viewBox="0 0 24 24" width="24px" height="24px" class="Expand"><path fill="#fff" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Draggable>
                                    </div>
                                )
                            }
                        </div>
                        <div className='emotional-container' style={{ width: '400px', gap: '60px', marginTop: '560px' }}>
                            <MatchButton chosen={chooseState == -1} chosenFill={'#ff7d7d'} fill={'red'}>
                                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="40px" height="40px"><path d="m15.44 12 4.768 4.708c1.056.977 1.056 2.441 0 3.499-.813 1.057-2.438 1.057-3.413 0L12 15.52l-4.713 4.605c-.975 1.058-2.438 1.058-3.495 0-1.056-.813-1.056-2.44 0-3.417L8.47 12 3.874 7.271c-1.138-.976-1.138-2.44 0-3.417a1.973 1.973 0 0 1 3.25 0L12 8.421l4.713-4.567c.975-1.139 2.438-1.139 3.413 0 1.057.814 1.057 2.44 0 3.417L15.44 12Z" fill="red"></path></svg>
                            </MatchButton>

                            <MatchButton chosen={chooseState == 1} chosenFill={'green'} fill={'green'}>
                                <svg version="1.1" x="0px" y="0px" viewBox="0 0 1122 1122" >
                                    <g id="Object">
                                        <g>
                                            <path style={{ fill: "#25d999" }} d="M858.005,460.624c0-85.709-69.732-155.45-155.423-155.45c-62.893,0-117.138,37.547-141.594,91.377    c-24.432-53.83-78.688-91.377-141.552-91.377c-85.727,0-155.441,69.741-155.441,155.45c0,18.08,3.105,35.419,8.818,51.581    c6.5,18.396,16.353,35.199,28.844,49.691c5.326,6.2,11.112,11.959,17.358,17.248l237.077,235.495    c1.459,1.461,3.359,2.188,5.278,2.188c1.937,0,3.849-0.726,5.32-2.188l245.883-244.292l-0.018-0.033    c15.935-15.972,28.433-35.356,36.258-56.992C854.755,496.863,858.005,479.113,858.005,460.624z" />
                                        </g>
                                    </g>
                                </svg>
                            </MatchButton>
                        </div>
                    </div>
                    :
                    <div className='container-fluid d-flex justify-content-center flex-column align-items-center' style={{ height: "100%" }}>
                        <button onClick={() => setShowOnboarding(true)}>
                            <Lottie options={
                                {
                                    loop: true,
                                    autoplay: true,
                                    animationData: mapAnim,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice'
                                    }
                                }
                            }
                                isClickToPauseDisabled="false"
                                height={'250px'}
                                width={'500px'} />
                        </button>
                        <b>To match friend, please setup your matching profile</b>
                    </div>
            }

            <div style={{
                background: ("linear-gradient(0deg, " + setBottomGroundState(chooseState) + " 16%, rgba(255,255,255,0) 100%)"),
                position: 'absolute',
                bottom: 0,
                height: '100px',
                width: '74.9%'
            }}>
            </div>
        </div >
    )
}

const MatchButton = ({ fill, children, chosen, chosenFill }) => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ width: '70px', height: '70px', borderRadius: '100%', background: chosen ? chosenFill : 'none', border: ("2px solid " + fill) }}>
            {children}
        </div>
    )
}

function calculateAge(dobIso) {
    // Convert ISO format to Date object
    const dobDate = new Date(dobIso);

    // Calculate age based on current date
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dobDate.getFullYear() - (currentDate.getMonth() < dobDate.getMonth() || (currentDate.getMonth() === dobDate.getMonth() && currentDate.getDate() < dobDate.getDate()));

    return age;
}

export default MatchesPage
