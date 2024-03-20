import { Button, Col, Input, Row, Select, Space, Table } from "antd";
import HeaderHome from "../../components/HeaderComponents/HeaderHome";
import { useEffect, useState } from "react";
import ButtonCircle from "../../components/ButtonCircle";
import { AiFillEdit, AiOutlineWarning, AiTwotoneDelete } from "react-icons/ai";
import { styledSelect } from "./styled";
import api from "../../utils/services";
import { Bounce, ToastContainer, toast } from "react-toastify";
import userCommon from '../../common/User.js';

const Dashboard = () => {
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    Status: 0,
    PageSize: 10,
    Role: 1,
  });
  const [dataSource, setDataSource] = useState([]);
  const [isBan, setIsBan] = useState(false);

  useEffect(() => {
    api.get('/user/admin-get-all-user')
      .then(res => setDataSource(res.data))
      .catch(error => console.error(error))
  }, [isBan])

  const handleBan = (userId, isBan) => {
    api.post('/user/admin-ban-user', {
      userId,
      isBan
    })
      .then(res => {
        setIsBan(!isBan);
        toast.success('User Banned!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
  }

  const StatusName = [
    {
      label: "Active",
      value: 1,
    },
    {
      label: "Ban",
      value: 2,
    },
  ];



  const column = [
    {
      title: "STT",
      align: "center",
      width: 35,
      render: (_, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Name",
      align: "center",
      dataIndex: "username",
      key: "Name",
      width: 100,
      render: (_, record, index) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar" style={{ marginRight: '10px' }}>
            <img src={userCommon.getOtherImage(record.avatar)} alt="" />
          </div>
          <div>
            {record.username}
          </div>
        </div>
      ),
    },
    {
      title: "Email",
      align: "center",
      dataIndex: "email",
      key: "Email",
      width: 100,
    },
    {
      title: "Status",
      align: "center",
      width: 170,
      dataIndex: "isBan",
      key: "Status",
      render: (_, record) => (
        <div>{record.isBan ? 'Ban' : 'Active'}</div>
      ),
    },
    {
      title: "Action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <Space>
          <ButtonCircle
            className="normal"
            title="Edit"
            icon={<AiFillEdit />}
          // onClick={}
          />
          <ButtonCircle
            className="normal"
            title="Ban"
            icon={<AiOutlineWarning />}
            onClick={() => handleBan(record._id, true)}
          />
          <ButtonCircle
            className="normal"
            title="Delete"
            icon={<AiTwotoneDelete />}
          // onClick={}
          />
        </Space>
      ),
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <ToastContainer />
      <Col span={24}>
        <HeaderHome />
      </Col>
      <Col span={24} style={{ marginTop: "60px" }}>
        <Row>
          <Col span={4}>
            <div style={{ position: "fixed", width: "calc(16%)" }}>
              <div>
                <div
                  className="d-flex bg-white circle w-100 align-items-center"
                  style={{ padding: "16px" }}
                >
                  <div className="avatar">
                    <img src="images/common/avatar.png" alt="Avatar" />
                  </div>
                  <div className="user-infor" style={{ marginLeft: "10px" }}>
                    <strong>Lại Ngọc Lâm</strong>
                  </div>
                </div>
                <div
                  className="bg-white circle"
                  style={{ marginTop: "10px", fontSize: "18px", width: "100%" }}
                >
                  <div
                    className="d-flex align-items-center"
                    style={{ padding: "30px 35px" }}
                  >
                    <ion-icon name="home-outline"></ion-icon>
                    <span style={{ marginLeft: "20px", fontWeight: "700" }}>
                      User Management
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </Col>
          <Col span={20}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <h1 style={{ color: "blueviolet" }}>User dashboard</h1>
              </Col>
              <Col span={20}>
                <Input
                  // onSearch={(e) =>
                  //   setPagination({ ...pagination, TextSearch: e })
                  // }
                  search
                  allowClear
                  placeholder="Nhập từ khóa tìm kiếm"
                />
              </Col>
              <Col span={2}>
                <styledSelect>
                  <Select defaultValue={1} options={StatusName} />
                </styledSelect>
              </Col>
              <Col span={2}>
                <Button type="primary">Add new User</Button>
              </Col>
              <Col span={24}>
                <Table
                  isPrimary
                  columns={column}
                  dataSource={dataSource}
                  rowKey="_id"
                  pagination={{
                    // hideOnSinglePage: total <= 10,
                    current: pagination?.CurrentPage,
                    pageSize: pagination?.PageSize,
                    responsive: true,
                    total: total,
                    locale: { items_per_page: "" },
                    showSizeChanger: total > 10,
                    onChange: (CurrentPage, PageSize) =>
                      setPagination({
                        ...pagination,
                        CurrentPage,
                        PageSize,
                      }),
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Dashboard;
