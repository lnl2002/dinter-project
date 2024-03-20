import React from 'react';
import HeaderHome from '../components/HeaderComponents/HeaderHome';
import { Container } from 'react-bootstrap';
import Lottie from 'react-lottie';
import * as error404 from '../utils/lottie/icon404.json'

function Page404(props) {
    return (
        <div>
            <HeaderHome />
            <Container style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Lottie options={
                    {
                        loop: true,
                        autoplay: true,
                        animationData: error404,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                        }
                    }
                }
                    isClickToPauseDisabled="false"
                    height={'auto'}
                    width={400} />
            </Container>
        </div>
    );
}

export default Page404;