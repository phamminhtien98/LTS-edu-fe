import { Avatar, Button, DatePicker, Form, Input, Modal, Space, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { memo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên chùa',
        render: (_, record) => (
            <Link to={`${record.id}`} style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                {record.tenChua || ""}
            </Link>
        ),
    },
    {
        title: 'Ngày Thành lập',
        dataIndex: 'ngayThanhLap',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'diaChi',
    },
    {
        title: 'Trụ trì',
        dataIndex: 'truTri',
        render: (_, record) => (
            <>{record.truTri === null ? "" : record.truTri.phapDanh || ""}</>
        ),
    },
    {
        title: 'Cập nhật',
        dataIndex: 'capNhat',
    },
];

const TableDaTaChua = ({ data, handlePage, handlePageSize, handleDelete, handleOnFinishAddChua }) => {
    const formRef = useRef(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [addChuaModalVisible, setAddChuaModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const onSelectChange = (newSelectedRowKeys, newSelectedRow) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRow(newSelectedRow);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const showDeleteModal = () => {
        setDeleteModalVisible(true);
    };
    const showAddChuaModal = () => {
        setAddChuaModalVisible(true);
    };

    const acceptDelete = () => {
        // Thực hiện xóa
        handleDelete(selectedRow)
        setDeleteModalVisible(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = (fieldsValue) => {
        handleOnFinishAddChua(fieldsValue);
        setAddChuaModalVisible(false);
    };
    return (
        <div>
            <div style={{ marginBottom: 16, }}>
                <Space>
                    <Button type="primary" danger onClick={showDeleteModal}>
                        Xóa
                    </Button>
                    <Button type="primary" onClick={showAddChuaModal}>
                        Thêm chùa
                    </Button>
                </Space>
                <span style={{ marginLeft: 8, }}>
                    {hasSelected ? `Đã chọn ${selectedRowKeys.length} chùa` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data.chuaList} pagination={{
                showSizeChanger: true,
                pageSizeOptions: [4, 6, 8, 10, 15, 20],
                defaultPageSize: 4,
                current: data.current,
                pageSize: data.pageSize,
                total: data.totalElements,
                onChange: (page) => { handlePage(page) },
                onShowSizeChange: (_, pageSize) => { handlePageSize(pageSize) }

            }} />
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
            <Modal
                open={addChuaModalVisible}
                title="Thêm chùa"
                onCancel={() => setAddChuaModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setAddChuaModalVisible(false)}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" form="addChuaForm" htmlType="submit">
                        Thêm
                    </Button>
                ]}
            >
                <Form
                    ref={formRef}
                    id="addChuaForm"
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelCol={{ span: 6 }}
                    labelAlign='left'
                    wrapperCol={{ span: 16 }}
                    autoComplete="off">
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
                </Form >
            </Modal >
        </div >
    );
};
export default memo(TableDaTaChua);