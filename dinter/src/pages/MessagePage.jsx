import React, { useState } from 'react'
import HeaderHome from '../components/HeaderComponents/HeaderHome'
import MatchesPage from './MatchesPage';
import './style/messages.css'
function MessagePage() {
    const [options, setOptions] = useState(1);
    const [currentFriend, setCurrentFriend] = useState(0);
    const [viewInfo, setViewInfo] = useState(true)
    const handleChooseOption = (option) => {
        setOptions(option);
    }
    const handleSetCurFri = (cf) => {
        setCurrentFriend(cf);
    }
    console.log(options);
    return (
        <div>
            <HeaderHome />
            <div className='container-fluid' style={{ paddingTop: "68px", backgroundColor: "white" }}>
                <div className='row'>
                    <div className='col-3' style={{ padding: "0" }}>
                        <div id='mp-mes-header'>
                            <input type="text" class="form-control" placeholder="Search Messages" />
                        </div>
                        <div className='mp-nav'>
                            <div className={options === 1 ? 'active' : ''} onClick={() => handleChooseOption(1)}><span>Matches</span></div>
                            <div className={options === 2 ? 'active' : ''} onClick={() => handleChooseOption(2)}><span>Messages</span></div>
                        </div>
                        <div className='mp-user-list'>
                            <div className={`${currentFriend === 0 && 'mg-active'} mp-user`} onClick={() => handleSetCurFri(0)}>
                                <div className='mp-avartar'>
                                    <img src='images/common/avatar.png' alt='error-img' />
                                </div>
                                <div className='mp-info'>
                                    <p>Ha Trang</p>
                                    <p>Lo</p>
                                </div>
                            </div>
                            <div className={`${currentFriend === 1 && 'mg-active'} mp-user`} onClick={() => handleSetCurFri(1)}>
                                <div className='mp-avartar'>
                                    <img src='images/common/avatar.png' alt='error-img' />
                                </div>
                                <div className='mp-info'>
                                    <p>Ha Trang</p>
                                    <p>Lo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        options === 2 && (
                            <>
                                <div className={`${viewInfo === true ? 'col-6' : 'col-9'} zoom mg-box-chat`}>
                                    <div className='mg-boxchat-header'>
                                        <div className='mg-user-info'>
                                            <div className='mg-avatar-boxchat'>
                                                <img src='images/common/avatar.png' alt='error-img' />
                                            </div>
                                            <div>
                                                <p>Ha Trang</p>
                                                <p>Đang hoạt động</p>
                                            </div>
                                        </div>
                                        <div className='boxchat-option'>
                                            <ion-icon name="call" className="bc-option"></ion-icon>
                                            <ion-icon name="videocam" className="bc-option"></ion-icon>
                                            <ion-icon name="alert-circle" onClick={() => setViewInfo(!viewInfo)}></ion-icon>
                                        </div>
                                    </div>
                                    <div className="chat-messages">
                                        <div className='other-messages-container'>
                                            <img src='images/common/avatar.png' alt='error' />
                                            <div className="message other-message">
                                                <div className="message-text">Older Message 4</div>
                                            </div>
                                        </div>
                                        <div className='other-messages-container non-img'>
                                            <div className="message other-message">
                                                <div className="message-text">This establishes the main-axis, thus defining the direction flex items are placed in the flex container. Flexbox is (aside from optional wrapping) a single-direction layout of flex items as primarily laying out either in horizontal rows or vertical columns.</div>
                                            </div>
                                        </div>
                                        <div className="message my-message">
                                            <div className="message-text">Older Message 5</div>
                                        </div>
                                        <div className="message my-message">
                                            <div className="message-text">This establishes the main-axis, thus defining the direction flex items are placed in the flex container. Flexbox is (aside from optional wrapping) a single-direction layout of flex items as primarily laying out either in horizontal rows or vertical columns.</div>
                                        </div>
                                        <div className='other-messages-container'>
                                            <img src='images/common/avatar.png' alt='error' />
                                            <div className="message other-message">
                                                <div className="message-text">Older Message 4</div>
                                            </div>
                                        </div>
                                        <div className="message my-message">
                                            <div className="message-text">Older Message 5</div>
                                        </div>
                                        <div className="message my-message">
                                            <div className="message-text">This establishes the main-axis, thus defining the direction flex items are placed in the flex container. Flexbox is (aside from optional wrapping) a single-direction layout of flex items as primarily laying out either in horizontal rows or vertical columns.</div>
                                        </div>
                                        <div className='other-messages-container'>
                                            <img src='images/common/avatar.png' alt='error' />
                                            <div className="message other-message">
                                                <div className="message-text">Older Message 4</div>
                                            </div>
                                        </div>
                                        <div className="message my-message">
                                            <div className="message-text">Older Message 5</div>
                                        </div>
                                        <div className="message my-message">
                                            <div className="message-text">This establishes the main-axis, thus defining the direction flex items are placed in the flex container. Flexbox is (aside from optional wrapping) a single-direction layout of flex items as primarily laying out either in horizontal rows or vertical columns.</div>
                                        </div>
                                        <div className='other-messages-container'>
                                            <img src='images/common/avatar.png' alt='error' />
                                            <div className="message other-message">
                                                <div className="message-text">Older Message 4</div>
                                            </div>
                                        </div>
                                        <div className="message my-message">
                                            <div className="message-text">Older Message 5</div>
                                        </div>
                                        <div className="message my-message">
                                            <div className="message-text">This establishes the main-axis, thus defining the direction flex items are placed in the flex container. Flexbox is (aside from optional wrapping) a single-direction layout of flex items as primarily laying out either in horizontal rows or vertical columns.</div>
                                        </div>
                                        <div className='other-messages-container'>
                                            <img src='images/common/avatar.png' alt='error' />
                                            <div className="message other-message">
                                                <div className="message-text">Older Message 4</div>
                                            </div>
                                        </div>
                                        <div className="message my-message">
                                            <div className="message-text">Older Message 5</div>
                                        </div>
                                        <div className="message my-message">
                                            <div className="message-text">This establishes the main-axis, thus defining the direction flex items are placed in the flex container. Flexbox is (aside from optional wrapping) a single-direction layout of flex items as primarily laying out either in horizontal rows or vertical columns.</div>
                                        </div>
                                    </div>
                                    <div className='send-messages'>
                                        <div className='chat-feature'>
                                            <div><ion-icon name="images"></ion-icon></div>
                                            <div><ion-icon name="images-outline"></ion-icon></div>
                                            <div><ion-icon name="images-outline"></ion-icon></div>
                                        </div>
                                        <div className='chat-input'>
                                            <input type='text' placeholder='Aa' />
                                            <ion-icon name="logo-flickr"></ion-icon>
                                        </div>
                                        <div className='liked-button'>
                                            <ion-icon name="heart"></ion-icon>
                                        </div>
                                    </div>
                                </div>
                                {
                                    viewInfo === true && (
                                        <div className='col-3' style={{ padding: "0px" }}>
                                            <div className='mp-anh-bia'>
                                                <img src='images/common/anhbia.jpg' alt='error' />
                                            </div>

                                            <div className='mp-c3-user-info'>
                                                <p>Ha Trang</p>
                                                <p><ion-icon name="home-outline"></ion-icon> Live in Hanoi</p>
                                                <p><ion-icon name="person-outline"></ion-icon> Woman</p>
                                                <p><ion-icon name="trail-sign-outline"></ion-icon> 32 kilometers away</p>

                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                    {
                        options === 1 && (
                            <MatchesPage/>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default MessagePage
