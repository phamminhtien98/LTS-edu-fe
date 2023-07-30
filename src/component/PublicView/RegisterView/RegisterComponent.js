import { Button, Form, Input, Row, Col, DatePicker, Select, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChuaApi from '../../../api/ChuaApi';
import phatTuApi from '../../../api/phatTuApi';
const RegisterComponent = () => {
    const navigate = useNavigate();
    let emailTonTai = null;
    let soDienThoaiTonTai = null;
    const formRef = useRef(null);
    const [chuas, setChuas] = useState([]);
    useEffect(() => {
        const fetchAllChua = async () => {
            try {
                const response = await ChuaApi.getAllChua();
                console.log(response);
                setChuas(response.map((item) => {
                    return { value: item.id, label: item.tenChua }
                }));
            } catch (error) {
                setChuas([]);
            }
        }
        fetchAllChua();
    }, [])

    const onFinish = (fieldsValue) => {
        // Should format date value before submit.
        const values = {
            ...fieldsValue,
            'ngaySinh': fieldsValue['ngaySinh'].format('YYYY-MM-DD'),
        };
        let registerForm = {
            ho: values.ho,
            tenDem: values.tenDem,
            ten: values.ten,
            phapDanh: values.phapDanh,
            ngaySinh: values.ngaySinh,
            gioiTinh: values.gioiTinh,
            chua: values.chua ? { id: values?.chua } : null,
            soDienThoai: values.soDienThoai,
            email: values.email,
            matKhau: values.matKhau
        };
        console.log('Success:', registerForm);
        const fetchLogin = async () => {
            try {
                const response = await phatTuApi.register(registerForm);
                message.success("Đăng ký thành công")
                console.log(response);
                navigate("/login")
            } catch (error) {
                console.log(error);
                emailTonTai = error.response.data.emailTonTai;
                soDienThoaiTonTai = error.response.data.soDienThoaiTonTai;
                formRef.current.submit();
                message.error("Lỗi")
            }
        }
        fetchLogin();
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login-component">
            <Form
                ref={formRef}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{
                    maxWidth: 850,
                    margin: 'auto'
                }}
                initialValues={{ gioiTinh: 1 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h3 style={{ textAlign: "center" }}>Đăng ký</h3>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Họ"
                            name="ho"
                            rules={[{ required: true, message: 'Chưa nhập họ!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            type="email"
                            name="email"
                            rules={[{ required: true, message: 'Chưa nhập email!' }, { type: 'email', message: 'Email không đúng định dạng!', },
                            () => ({
                                validator(_, value) {
                                    if (emailTonTai != null && value && emailTonTai === value) {
                                        return Promise.reject(new Error('Email đã được sử dụng!'));
                                    }
                                    return Promise.resolve();
                                },
                            })]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Tên đệm"
                            name="tenDem"
                            rules={[{ required: true, message: 'Chưa nhập tên đệm!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Số điện thoại"
                            name="soDienThoai"
                            rules={[{ required: true, message: 'Chưa nhập số điện thoại!' },
                            () => ({
                                validator(_, value) {
                                    if (soDienThoaiTonTai != null && value && soDienThoaiTonTai === value) {
                                        return Promise.reject(new Error('Số điện thoại đã được sử dụng!'));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                            { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g, message: 'Không phải số điện thoại!' },]}>
                            <Input />
                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Tên"
                            name="ten"
                            rules={[{ required: true, message: 'Chưa nhập tên!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Mật khẩu"
                            name="matKhau"
                            rules={[{ required: true, message: 'Chưa nhập mật khẩu!' },
                            { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_])[A-Za-z\d@$!%*?&_]{8,}$/, message: 'Mật khẩu phải chứa ít nhất 8 ký tự bao gồm chữ hoa, chữ thường và số' },]}>
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item name="ngaySinh" label="Ngày Sinh" rules={[
                            {
                                type: 'object',
                                required: true,
                                message: 'Chưa chọn thời gian!',
                            },
                        ]}>
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="nhapLaiMatKhau"
                            label="Nhập lại mật khẩu"
                            dependencies={['matKhau']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Chưa nhập lại mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('matKhau') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Không giống với mật khẩu đã nhập!'));
                                    },
                                }),
                                { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_])[A-Za-z\d@$!%*?&_]{8,}$/, message: 'Mật khẩu phải chứa ít nhất 8 ký tự bao gồm chữ hoa, chữ thường và số' },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="gioiTinh"
                            label="Giới tính"
                        >
                            <Select
                                options={[
                                    { value: 1, label: 'Nam' },
                                    { value: 2, label: 'Nữ' }
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Pháp danh"
                            name="phapDanh">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify='start'>
                    <Col span={12}>
                        <Form.Item
                            name="chua"
                            label="Chọn chùa"
                        >
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                placeholder="Chọn chùa"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={chuas}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col span={12} >
                        <Button block type="primary" htmlType="submit">
                            Đăng ký
                        </Button>
                        <span>Đã có tài khoản <Link to={'/login'} >Đăng nhập</Link></span>
                    </Col>
                </Row>
            </Form>
        </div >
    );
};
export default RegisterComponent;