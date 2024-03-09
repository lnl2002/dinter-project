import React from 'react';
import Lottie from 'react-lottie';
import * as emptyMessage from '../../utils/lottie/emptyMessage.json'
import { Col } from 'react-bootstrap';

const EmptyConversation = () => {
    return (
        <>
            <Col md={9} style={{ height: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <Lottie options={
                        {
                            loop: true,
                            autoplay: true,
                            animationData: emptyMessage,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                        }
                    }
                        isClickToPauseDisabled="false"
                        height={400}
                        width={400} />
                    <div style={{ textAlign: 'center' }}>
                        <strong style={{ fontSize: '20px'}}>Ready, set, friend-search! </strong>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <strong style={{ fontSize: '20px'}}>May your friendships be epic and your laughter be contagious! 🎉✨ </strong>
                    </div>

                </div>

            </Col>

        </>
    );
};

export default EmptyConversation;