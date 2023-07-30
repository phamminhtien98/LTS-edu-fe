import { Upload, Button, Image, message, Form, Input, DatePicker, Select } from 'antd';
import { UploadOutlined, SettingOutlined } from '@ant-design/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import "./ThongTinCaNhan.scss"
import phatTuApi from '../../../../api/phatTuApi';
import ChuaApi from '../../../../api/ChuaApi';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { setPhatTu } from '../../../../store/actions/PhatTuActions';

const ThongTinCaNhanComponent = () => {
    const [base64img, setBase64img] = useState(null);
    const formRef = useRef(null);
    const [chuas, setChuas] = useState([]);
    let soDienThoaiTonTai = null;
    const phatTu = useSelector(state => state.phatTu.value)
    const dispatch = useDispatch();
    // const { phatTu, setPhatTu } = useContext(PhatTuContext);
    const fetchTaiKhoan = async () => {
        try {
            const response = await phatTuApi.getByToken(localStorage.getItem("token"));
            console.log(response);
            // setPhatTu(response);
            const action = setPhatTu(response);
            dispatch(action);
        } catch (error) {
        }
    }
    useEffect(() => {
        if (phatTu) {
            setBase64img(phatTu.anhChup);
            formRef.current.setFieldsValue({
                ho: phatTu.ho || null,
                tenDem: phatTu.tenDem || null,
                ten: phatTu.ten || null,
                phapDanh: phatTu.phapDanh || null,
                gioiTinh: phatTu.gioiTinh || null,
                chua: phatTu.chua ? phatTu.chua.id : null,
                email: phatTu.email || null,
                soDienThoai: phatTu.soDienThoai || null,
                daHoanTuc: phatTu.daHoanTuc,
                kieuThanhVien: phatTu.kieuThanhVien ? phatTu.kieuThanhVien.id : null,
                ngayXuatGia: phatTu.ngayXuatGia ? moment(phatTu.ngayXuatGia, 'YYYY-MM-DD') : null,
                ngayHoanTuc: phatTu.ngayHoanTuc ? moment(phatTu.ngayHoanTuc, 'YYYY-MM-DD') : null,
                ngaySinh: phatTu.ngaySinh ? moment(phatTu.ngaySinh, 'YYYY-MM-DD') : null
            });
        }
    }, [phatTu])


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
    const handleFileInputChange = (fileSelect) => {
        if (fileSelect.file.size <= 1024 * 1024) {
            const reader = new FileReader();
            reader.readAsDataURL(fileSelect.file);
            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1];
                setBase64img(base64Data);
            };
        } else {
            message.error("Dung lượng file quá lớn")
        }
    };

    const handleUpload = () => {
        if (localStorage.getItem("token")) {
            let data = {
                id: phatTu.id,
                anhChup: base64img,
            }
            const fetchAvata = async () => {
                try {
                    let token = localStorage.getItem("token");
                    const response = await phatTuApi.updateThongTin(token, data);
                    console.log(response);
                    message.success("Thêm ảnh thành công");
                    fetchTaiKhoan();
                } catch (error) {
                    console.log(error);
                    formRef.current.submit();
                    message.error("Lỗi");
                }
            }
            fetchAvata();
        }
    };
    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'ngaySinh': fieldsValue['ngaySinh'] ? fieldsValue['ngaySinh'].format('YYYY-MM-DD') : null,
            'ngayXuatGia': fieldsValue['ngayXuatGia'] ? fieldsValue['ngayXuatGia'].format('YYYY-MM-DD') : null,
            'ngayHoanTuc': fieldsValue['ngayHoanTuc'] ? fieldsValue['ngayHoanTuc'].format('YYYY-MM-DD') : null,
        };
        if (localStorage.getItem("token")) {
            let data = {
                id: phatTu.id,
                ho: values.ho,
                tenDem: values.tenDem,
                ten: values.ten,
                phapDanh: values.phapDanh,
                gioiTinh: values.gioiTinh,
                chua: {
                    id: values.chua
                },
                email: values.email,
                soDienThoai: values.soDienThoai,
                daHoanTuc: values.daHoanTuc,
                kieuThanhVien: {
                    id: values.kieuThanhVien
                },
                ngayXuatGia: values.ngayXuatGia,
                ngayHoanTuc: values.ngayHoanTuc,
                ngaySinh: values.ngaySinh
            }
            console.log(data);
            const fetchUpdateThongTin = async () => {
                try {
                    let token = localStorage.getItem("token");

                    console.log(token);
                    const response = await phatTuApi.updateThongTin(token, data);
                    console.log(response);
                    message.success("Sửa thông tin thành công");
                    fetchTaiKhoan();
                } catch (error) {
                    console.log(error);
                    if (error.response.data.soDienThoaiTonTai && error.response.data.soDienThoaiTonTai != null) {
                        soDienThoaiTonTai = error.response.data.soDienThoaiTonTai;
                        formRef.current.submit();
                        message.error("Lỗi");
                    }
                }
            }

            fetchUpdateThongTin();
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="thong-tin-ca-nha-body">
            <div className='title'><SettingOutlined />  Thông tin tài khoản</div>
            <div className='avata'>
                <div className='avata-img'>
                    <Image
                        width={100}
                        height={100}
                        src={`data:image/jpeg;base64,${base64img}`}
                    />
                </div>
                <div className='action-avata'>
                    <Upload
                        name="avatar"
                        maxCount={1}
                        accept=".jpg,.png,.jpeg"
                        beforeUpload={() => false}
                        onChange={handleFileInputChange}
                    >
                        <Button icon={<UploadOutlined />}>Chọn file</Button>
                    </Upload>
                    <Button type="primary" onClick={handleUpload}>
                        Thêm ảnh
                    </Button>
                </div>
            </div>
            <div className='user-infor'>
                <Form
                    ref={formRef}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <div className='form-body'>
                        <div className='form-left'>
                            <Form.Item
                                label="Họ"
                                name="ho"
                                rules={[{ required: true, message: 'Không bỏ trống!', },]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Tên đệm"
                                name="tenDem"
                                rules={[{ required: true, message: 'Không bỏ trống!', },]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Tên"
                                name="ten"
                                rules={[{ required: true, message: 'Không bỏ trống!', },]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Pháp Danh"
                                name="phapDanh">
                                <Input />
                            </Form.Item>
                            <Form.Item name="ngaySinh" label="Ngày Sinh" >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
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
                        </div>

                        <div className='form-right'>
                            <Form.Item
                                label="Email"
                                type="email"
                                name="email">
                                <Input disabled />
                            </Form.Item>
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
                            <Form.Item name="ngayXuatGia" label="Ngày xuất gia" >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                name="daHoanTuc"
                                label="Đã Hoàn Tục"
                            >
                                <Select
                                    options={[
                                        { value: false, label: 'Đang xuất gia' },
                                        { value: true, label: 'Đã hoàn Tục' }
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item name="ngayHoanTuc" label="Ngày hoàn tục" >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                name="kieuThanhVien"
                                label="Kiểu thành viên"
                            >
                                <Select
                                    disabled
                                    options={[
                                        { value: 1, label: 'Admin' },
                                        { value: 2, label: 'Phật Tử' }
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item wrapperCol={{ span: 4, }}>
                        <Button block type="primary" htmlType="submit">
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default ThongTinCaNhanComponent;