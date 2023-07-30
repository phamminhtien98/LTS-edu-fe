import { Link } from 'react-router-dom'
import { Button, Form, Input, DatePicker, Select, Space, Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import React, { memo, useEffect, useRef, useState } from 'react'
import moment from 'moment';

const ThongTinChua = ({ chua, listPhatTu, onFinish, handleDelete }) => {
    const formRef = useRef(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteChua, setDeletePhatTu] = useState(null);
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const showDeleteModal = () => {
        setDeleteModalVisible(true);
        setDeletePhatTu([chua.id]);
    };
    const acceptDelete = () => {
        handleDelete(deleteChua)
        setDeleteModalVisible(false);
    }
    useEffect(() => {
        if (chua) {
            formRef.current.setFieldsValue({
                tenChua: chua.tenChua || null,
                diaChi: chua.diaChi || null,
                ngayThanhLap: chua.ngayThanhLap ? moment(chua.ngayThanhLap, 'YYYY-MM-DD HH:mm:ss') : null,
                truTri: chua.truTri.id || null,
                capNhat: chua.capNhat ? moment(chua.capNhat, 'YYYY-MM-DD HH:mm:ss') : null,
            });
        }
    }, [chua])
    return (
        <>
            <div className='title'><SettingOutlined />  Thông tin chùa</div>
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
                                label="Tên chùa"
                                name="tenChua"
                                rules={[{ required: true, message: 'Không bỏ trống!', },]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="diaChi"
                                rules={[{ required: true, message: 'Không bỏ trống!', },]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="ngayThanhLap" label="Ngày Thành Lập" rules={[{ required: true, message: 'Không bỏ trống!', },]}>
                                <DatePicker showTime style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                name="truTri"
                                label="Trụ trì"
                                rules={[{ required: true, message: 'Không bỏ trống!', },]}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Trụ trì"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={listPhatTu}
                                />
                            </Form.Item>
                            <Form.Item name="capNhat" label="Cập nhật" >
                                <DatePicker showTime style={{ width: '100%' }} disabled />
                            </Form.Item>
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
                            <Link to="../chua"><Button>
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

export default memo(ThongTinChua) 