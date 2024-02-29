import { Button, Col, Form, Input, Row, Space } from "antd";
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

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
                <Input />
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
                <Input />
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button type="primary">Submit</Button>
              </div>
            </Form>
          </StyledLabel>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
