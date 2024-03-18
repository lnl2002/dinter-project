import { Button, Card, Col, Row } from "antd"
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import HeaderHome from "../../components/HeaderComponents/HeaderHome";
import { useEffect, useState } from "react";
import api from "../../utils/services";
import userCommon from '../../common/User.js'
import LeftBarHomePage from "../../components/LeftBar/LeftBarHomePage.jsx";
import { Container } from "react-bootstrap";

const StyledNavLink = styled(NavLink)`
  font-size: 18px; /* Kích thước chữ to hơn */
  text-decoration: none; /* Loại bỏ gạch chân mặc định */
  color: #333; /* Màu chữ */
  transition: color 0.3s; /* Hiệu ứng chuyển đổi màu khi hover */
  &:hover {
    color: #007bff; /* Màu chữ khi hover */
  }
  &.active {
    font-weight: bold; /* Chữ in đậm khi active */
    border-bottom: none;
  }
`;
const { Meta } = Card
const RequestFriend = () => {

  const [listMatches, setListMatches] = useState([]);
  const user = JSON.parse(localStorage.getItem('User'));

  //getAll
  useEffect(() => {
    if (user) {
      api.get(`/user/request-matches/${user.id}`)
        .then(res => {
          setListMatches(res.data.requestMatch);
        })
        .catch(error => console.log(error));
    }
  }, [])

  // accept request
  const handleAccept = (receiver) => {
    if (user) {
      api.post(`/user/request-matches`, {
        sender: user.id,
        receiver
      })
        .then(res => {
          setListMatches(listMatches.filter(e => e._id !== receiver))

        })
        .catch(error => console.log(error));
    }
  }

  // delete request
  const handleDelete = (receiver) => {
    if (user) {
      api.post(`/user/delete-request-matches`, {
        sender: user.id,
        receiver
      })
        .then(res => {
          setListMatches(listMatches.filter(e => e._id !== receiver))
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <div>
      <HeaderHome />
      <Container>
        <Row gutter={[16, 16]}>
          <Col span={24}>
          </Col>
          <Col xs={0} sm={7} md={6} lg={5} xl={4} xxl={4} style={{
            marginTop: '68px'
          }}>
            <LeftBarHomePage />
          </Col>
          <Col xs={24} sm={17} md={18} lg={19} xl={20} xxl={20}
            style={{ marginTop: '70px', }}
          >
            <Row gutter={[16, 16]}>
              {listMatches && listMatches.map(user =>
                <Col xs={12} sm={8} md={7} lg={6} xl={4} xxl={4}>
                  <Card
                    hoverable
                    style={{
                      width: '100%',
                    }}
                    cover={<img alt="avatar" src={userCommon.getOtherImage(user.avatar)} />}
                  >
                    <Meta title={user.username} description={user.username} />
                    <Button
                      style={{
                        marginTop: '15px',
                        width: '100%',
                        backgroundColor: "#007bff",
                        color: "white"
                      }}
                      onClick={() => handleAccept(user._id)}
                    >Accept</Button>
                    <Button
                      style={{
                        marginTop: '10px',
                        width: '100%'
                      }}
                      onClick={() => handleDelete(user._id)}
                    >Delete</Button>
                  </Card>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>

    </div>

  );
}

export default RequestFriend;