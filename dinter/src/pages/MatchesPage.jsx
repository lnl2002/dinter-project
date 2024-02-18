import React, { useEffect, useState } from 'react'
import './style/matches.css'
function MatchesPage() {
    const users = [
        {
            image: "images/common/card.png",
            name: "Ha Trang",
            desc: "Founder of Tinder",
            add: "Hanoi"
        },
        {
            image: "images/common/anhbia2.jpg",
            name: "Thu Ha",
            desc: "Founder of Tinder",
            add: "Hanoi"
        },
        {
            image: "images/common/anhbia3.jpg",
            name: "Lan Phuong",
            desc: "Founder of Tinder",
            add: "Hanoi"
        }
    ]
    const [currentUser, setCurrentUser] = useState(0);
    useEffect(() => {
        setCurrentUser(0)
    }, [])
    const handleSetCurrentUser = (e, type) => {
        console.log('tessttt');
        e.preventDefault();
        if (type === 1) {
            if (currentUser !== 0) setCurrentUser(currentUser - 1);
        }
        else {
            if (currentUser !== users.length - 1) setCurrentUser(currentUser + 1)
        }
    }

    const handleStartDragging = (e) => {
        e.target.classList.add("dragging");
    }

    const handleEndDragging = (e) => {
        e.target.classList.remove("dragging");
    }

    const allowDrop = (e) => {
        e.preventDefault();
    }
    return (
        <div className='col-9' style={{ height: "calc(100vh - 70px)", background: "#ececec;", borderLeft: "1px solid gray" }}>
            <div className='container-fluid' style={{ height: "100%" }}>
                <div className='row' style={{ height: "100%" }}>
                    <div className='col-3 direction' id='preCard' onDrop={(e) => handleSetCurrentUser(e, 1)}
                        onDragOver={(e) => allowDrop(e)}>

                    </div>
                    <div className='col-6 card-container'>
                        <div className='user-card' draggable='true' onDragStart={(e) => handleStartDragging(e)}
                            onDragEnd={(e) => handleEndDragging(e)}>
                            <img src={users[currentUser].image} alt='error' />
                            <div className='user-card-info'>
                                <p>{users[currentUser].name}</p>
                                <p>{users[currentUser].desc}</p>
                                <p>{users[currentUser].add}</p>
                            </div>
                        </div>
                        <div className='emotional-container'>
                            <div className='emotion'>
                                <ion-icon name="heart"></ion-icon>
                            </div>
                            <div className='emotion'>
                                <ion-icon name="chatbox-ellipses"></ion-icon>
                            </div>
                        </div>
                    </div>
                    <div className='col-3 direction' id='nextCard' onDrop={(e) => handleSetCurrentUser(e, 2)}
                        onDragOver={(e) => allowDrop(e)}>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default MatchesPage
