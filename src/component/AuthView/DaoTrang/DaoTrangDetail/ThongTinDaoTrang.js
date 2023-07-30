import { Link } from 'react-router-dom'
import { Button, Form, Input, DatePicker, Select, Space, Modal, Image } from 'antd';
import { SettingOutlined, } from '@ant-design/icons';
import React, { memo, useEffect, useRef, useState } from 'react'
import moment from 'moment';

const ThongTinDaoTrang = ({ daoTrang, onFinish, handleDelete, phatTuList }) => {
    const formRef = useRef(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteChua, setDeletePhatTu] = useState(null);
    const [chuTri, setChuTri] = useState(null);
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const showDeleteModal = () => {
        setDeleteModalVisible(true);
        setDeletePhatTu([daoTrang.id]);
    };
    const acceptDelete = () => {
        handleDelete(deleteChua)
        setDeleteModalVisible(false);
    }

    useEffect(() => {
        if (daoTrang) {
            setChuTri(daoTrang.phatTuNguoiTruTri ?? null);
            formRef.current.setFieldsValue({
                noiToChuc: daoTrang.noiToChuc ?? null,
                thoiGianToChuc: daoTrang.thoiGianToChuc ? moment(daoTrang.thoiGianToChuc, 'YYYY-MM-DD HH:mm:ss') : null,
                noiDung: daoTrang.noiDung ?? null,
                soThanhVienThamGia: daoTrang?.soThanhVienThamGia ?? null,
                daKetThuc: daoTrang.daKetThuc,
                chua: daoTrang.phatTuNguoiTruTri?.chua?.id ?? null,
                truTri: daoTrang.phatTuNguoiTruTri?.id ?? null,
            });
        }
    }, [daoTrang])


    return (
        <>
            <div className='title'><SettingOutlined />  Thông tin đạo tràng</div>
            <div className='chua-infor'>
                <Form
                    ref={formRef}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <div className='form-body'>
                        <div className='form-left'>
                            <Form.Item
                                label="Nơi tổ chức"
                                name="noiToChuc"
                                rules={[{ required: true, message: 'Không bỏ trống!', },]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="thoiGianToChuc" label="Thời gian tổ chức" rules={[{ required: true, message: 'Không bỏ trống!', },]}>
                                <DatePicker showTime style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Nội dung"
                                name="noiDung"
                                rules={[{ required: true, message: 'Không bỏ trống!', },]}>
                                <Input.TextArea />
                            </Form.Item>

                            <Form.Item
                                name="truTri"
                                label="Chọn chủ trì"
                                rules={[{ required: true, message: 'Vui lòng chọn chủ trì' }]}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Chọn người chủ trì"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={phatTuList}
                                    onSelect={(value, object) => setChuTri(object)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Số thành viên"
                                name="soThanhVienThamGia">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Tình trạng"
                                name="daKetThuc"
                            >
                                <Select
                                    disabled
                                    options={[
                                        { value: false, label: 'Chưa kết thúc' },
                                        { value: true, label: 'Đã Kết thúc' }
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div className='form-right'>
                            <h3><Link to={"../phat-tu/" + chuTri?.id ?? ""}>Thông tin chủ trì</Link></h3>
                            <p>Ảnh chụp:</p>
                            <Image
                                width={80}
                                height={80}
                                src={`data:image/jpeg;base64,${chuTri?.anhChup}`}
                            />
                            <p>Họ và tên: {chuTri?.ho ?? ""} {chuTri?.tenDem ?? ""} {chuTri?.ten ?? ""}</p>
                            <p>Pháp danh: {chuTri?.phapDanh ?? ""}</p>
                            <p>Ngày sinh: {chuTri?.ngaySinh ?? ""}</p>
                            <p>Email: {chuTri?.email ?? ""}</p>
                            <p>Số điện thoại: {chuTri?.soDienThoai ?? ""}</p>
                        </div>
                    </div>
                    <Form.Item >

                        <Space size="small">
                            <Button type="primary" htmlType='submit'>
                                Lưu thay đổi
                            </Button>
                            <Button className='ml-2' type="primary" danger onClick={() => showDeleteModal()}>
                                Xóa
                            </Button>
                            <Link to="../dao-trang"><Button>
                                Quay lại
                            </Button></Link>
                        </Space>

                    </Form.Item>
                </Form>
                <Modal
                    open={deleteModalVisible}
                    title="Xác nhận xóa"
                    onCancel={() => setDeleteModalVisible(false)}
                    onOk={acceptDelete}
                    okText="Xóa"
                    cancelText="Hủy"
                >
                    Bạn có chắc chắn muốn xóa?
                </Modal>
            </div >
        </>
    )
}

export default memo(ThongTinDaoTrang) 