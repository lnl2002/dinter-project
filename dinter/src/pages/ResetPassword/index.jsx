import { Button, Col, Form, Input, Row, Space } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

const StyledLabel = styled.div`
  :where(.css-dev-only-do-not-override-1k979oh).ant-form-vertical
    .ant-form-item-label
    > label,
  :where(.css-dev-only-do-not-override-1k979oh).ant-col-24.ant-form-item-label
    > label,
  :where(
      .css-dev-only-do-not-override-1k979oh
    ).ant-col-xl-24.ant-form-item-label
    > label {
    color: whitesmoke;
  }
`;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const nav = useNavigate();

  const separatorIndex = token.indexOf('-');
  const email = token.slice(0, separatorIndex);
  const uuid = token.slice(separatorIndex + 1);
  console.log(email, uuid);

  const handleResetPassword = () => {
    axios.post('http://localhost:3008/api/v1/user/update-password', {
      email,
      password, 
      confirmPassword,
      uuid
    })
      .then(res => {
        console.log('res================', res);
        toast.success(res.data.message);
        setPassword('');
        setConfirmPassword('');
        nav('/')
      })
      .catch(err => {
        console.log('res================', err);
        setPassword('');
        setConfirmPassword('');
        toast.error(err.response.data.message);
      })

  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ToastContainer/>
      <Row
        gutter={[16, 16]}
        style={{
          width: "40%",
          padding: "30px",
          border: "1px solid gray",
          borderRadius: "20px",
          boxShadow: "10px",
          backgroundColor: "#fc777c	",
          color: "whitesmoke",
        }}
      >
        <Col span={24}>
          <h2>Reset Password</h2>
        </Col>
        <Col span={24}>
          <StyledLabel>
            <Form form={form} layout="vertical" initialValues={{}}>
              <Form.Item
                label="New Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input type="password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>

              {/* Field */}
              <Form.Item
                label="Confirm Password"
                name="password2"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button type="primary" onClick={() => handleResetPassword()}>Submit</Button>
              </div>
            </Form>
          </StyledLabel>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
