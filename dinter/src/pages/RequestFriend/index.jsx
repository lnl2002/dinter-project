import {Button, Card, Col, Row} from "antd"
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import HeaderHome from "../../components/HeaderComponents/HeaderHome";

const data = [
    {
        AvartaURL: "https://i.pinimg.com/564x/2b/0f/7a/2b0f7a9533237b7e9b49f62ba73b95dc.jpg",
        FullName: "Bui Van Nam",
        Description: "",
    },
    {
        AvartaURL: "https://i.pinimg.com/564x/2b/0f/7a/2b0f7a9533237b7e9b49f62ba73b95dc.jpg",
        FullName: "Nguyen Van A",
        Description: "",
    },
    {
        AvartaURL: "https://i.pinimg.com/564x/2b/0f/7a/2b0f7a9533237b7e9b49f62ba73b95dc.jpg",
        FullName: "Nguyen Van A",
        Description: "",
    },
    {
        AvartaURL: "https://i.pinimg.com/564x/2b/0f/7a/2b0f7a9533237b7e9b49f62ba73b95dc.jpg",
        FullName: "Nguyen Van A",
        Description: "",
    },
    {
        AvartaURL: "https://i.pinimg.com/564x/2b/0f/7a/2b0f7a9533237b7e9b49f62ba73b95dc.jpg",
        FullName: "Nguyen Van A",
        Description: "",
    },
    {
        AvartaURL: "https://i.pinimg.com/564x/2b/0f/7a/2b0f7a9533237b7e9b49f62ba73b95dc.jpg",
        FullName: "Nguyen Van A",
        Description: "",
    },
    {
        AvartaURL: "https://i.pinimg.com/564x/2b/0f/7a/2b0f7a9533237b7e9b49f62ba73b95dc.jpg",
        FullName: "Nguyen Van A",
        Description: "",
    },    {
        AvartaURL: "https://i.pinimg.com/564x/2b/0f/7a/2b0f7a9533237b7e9b49f62ba73b95dc.jpg",
        FullName: "Nguyen Van A",
        Description: "",
    },
]
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
    return ( 
        <Row gutter={[16,16]}>
          <Col span={24}>
            <HeaderHome />
          </Col>
          <Col xs={0} sm={7} md={6} lg={5} xl={4} xxl={4}
          style={{
            marginTop: '30px',
            padding:"30px",
            borderRight:"1px solid black",
            height:'100vh '
          }}
          >
            <p style={{
               fontSize: '24px', /* Kích thước chữ to hơn */
               color: '#333',
               fontWeight: 'bold'
            }}>Bạn bè</p>
            <p>
            <StyledNavLink>Trang chủ</StyledNavLink>
            </p>
            <p>
            <StyledNavLink>Lời mời kết bạn</StyledNavLink>
            </p>
            <p>
            <StyledNavLink>Gợi ý</StyledNavLink> 

            </p>
            <StyledNavLink>Tất cả bạn bè</StyledNavLink>
    
          </Col>
          <Col xs={24} sm={17} md={18} lg={19} xl={20} xxl={20}
          style={{marginTop: '70px',}}
          >
<Row gutter={[16, 16]}>
            {data.map(i => 
            <Col xs={12} sm={8} md={7} lg={6} xl={4} xxl={4}>
            <Card
              hoverable
              style={{
                width: '100%',
              }}
              cover={<img alt="example" src={i.AvartaURL} />}
            >
              <Meta title={i.FullName} description={i.Description} />
              <Button
                style={{
                  marginTop: '15px',
                  width:'100%',
                  backgroundColor: "#007bff",
                  color:"white"
                }}
                // onClick={() => navigate(`/request/${i?._id}`)}
              >Xác nhận</Button>
              <Button
                style={{
                  marginTop: '10px',
                  width:'100%'
                }}
                // onClick={() => navigate(`/request/${i?._id}`)}
              >Xoá</Button>
            </Card>
          </Col>  
                )}
</Row>
          </Col>
        </Row>
     );
}
 
export default RequestFriend;