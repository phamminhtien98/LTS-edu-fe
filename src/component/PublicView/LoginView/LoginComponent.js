import { Button, Form, Input, message } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import phatTuApi from '../../../api/phatTuApi';
import { useRef } from 'react';
const LoginComponent = () => {
  const formRef = useRef(null);
  let loginError = false;
  const navigate = useNavigate();
  const onFinish = (values) => {
    const fetchLogin = async () => {
      try {
        const response = await phatTuApi.login(values);
        // console.log(response);
        localStorage.setItem("token", response.token);
        message.success("Đăng nhập thành công")
        navigate("/admin")
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        loginError = true;
        formRef.current.submit();
      }
    }
    fetchLogin();
  };

  const onFinishFailed = (errorInfo) => {
    loginError = false;
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="login-component">
      <Form
        ref={formRef}
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        style={{
          maxWidth: 400,
          margin: 'auto'
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h3 style={{ textAlign: "center" }}>Đăng nhập</h3>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Chưa nhập email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[
            {
              required: true,
              message: 'Chưa nhập mật khẩu!',
            },
            () => ({
              validator(_, value) {
                if (!loginError) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Sai tài khoản hoặc mật khẩu!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 19,
          }}
        >
          <Button block type="primary" htmlType="submit">
            Đăng nhập
          </Button>
          <span>Chưa có tài khoản? <Link to={'/register'} >Đăng ký</Link></span>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginComponent;