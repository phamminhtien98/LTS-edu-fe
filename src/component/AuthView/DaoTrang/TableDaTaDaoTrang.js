import { Button, DatePicker, Form, Input, Modal, Select, Space, Table } from 'antd';
import { memo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ChuaApi from '../../../api/ChuaApi';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
        render: (_, record) => (
            <Link to={`${record.id}`} >
                {record.key || ""}
            </Link>
        ),
    },
    {
        title: 'Nơi tổ chức',
        render: (_, record) => (
            <Link to={`${record.id}`} >
                {record.noiToChuc || ""}
            </Link>
        ),
    },
    {
        title: 'Nội dung',
        dataIndex: 'noiDung',
    },
    {
        title: 'Chủ trì',
        dataIndex: 'chuTri',
    },
    {
        title: 'Thời gian tổ chức',
        dataIndex: 'thoiGianToChuc',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'trangThai',
    },
    {
        title: 'Số thành viên tham gia',
        dataIndex: 'soThanhVienThamGia',
    },
];

const TableDaTaDaoTrang = ({ data, handlePage, handlePageSize, handleDelete, handleOnFinishAdd }) => {
    const formRef = useRef(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [chuaList, setChuaList] = useState([]);
    const [phatTuList, setPhatTuList] = useState([]);
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
    const showAddModal = () => {
        const fetchAllChua = async () => {
            try {
                const response = await ChuaApi.getAllChua();
                console.log(">>>>all chua", response);
                setChuaList(response.map((item) => {
                    return { ...item, value: item.id, label: item.tenChua }
                }));
            } catch (error) {
                setChuaList([]);
            }
        }
        fetchAllChua();
        setAddModalVisible(true);
    };

    const onCancelAddModal = () => {
        formRef.current.resetFields(); // Reset form fields
        setAddModalVisible(false); // Ẩn modal
    }

    const handleOnSelectChua = (value, object) => {
        setPhatTuList(object.phatTuList?.map((item) => {
            return {
                ...item,
                value: item.id,
                label: `${item.ho ?? ""} ${item.tenDem ?? ""} ${item.ten ?? ""} ${item.phatTuNguoiTruTri?.phapDanh ? `Pháp danh: ${item.phatTuNguoiTruTri.phapDanh}` : ""}`
            }
        }))
    }

    const acceptDelete = () => {
        // Thực hiện xóa
        handleDelete(selectedRow)
        setDeleteModalVisible(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = (fieldsValue) => {
        handleOnFinishAdd(fieldsValue);
        setAddModalVisible(false);
    };
    return (
        <div>
            <div style={{ marginBottom: 16, }}>
                <Space>
                    <Button type="primary" danger onClick={showDeleteModal}>
                        Xóa
                    </Button>
                    <Button type="primary" onClick={showAddModal}>
                        Thêm đạo tràng
                    </Button>
                </Space>
                <span style={{ marginLeft: 8, }}>
                    {hasSelected ? `Đã chọn ${selectedRowKeys.length} đạo tràng` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data.daoTrangList} pagination={{
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
                open={addModalVisible}
                title="Thêm đạo tràng"
                onCancel={onCancelAddModal}
                footer={[
                    <Button key="cancel" onClick={onCancelAddModal}>
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
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                    wrapperCol={{ span: 16 }}
                    autoComplete="off">
                    <Form.Item name="thoiGianToChuc" label="Thời gian tổ chức" rules={[{ required: true, message: 'Không bỏ trống!', },]}>
                        <DatePicker showTime style={{ width: '100%' }} placeholder='Chọn ngày' />
                    </Form.Item>
                    <Form.Item
                        label="Nơi tổ chức"
                        name="noiToChuc"
                        rules={[{ required: true, message: 'Không bỏ trống!', },]}>
                        <Input placeholder='Địa điểm tổ chức' />
                    </Form.Item>
                    <Form.Item
                        label="Nội dung"
                        name="noiDung"
                        rules={[{ required: true, message: 'Không bỏ trống!', },]}>
                        <Input.TextArea placeholder='Nội dung' />
                    </Form.Item>
                    <Form.Item
                        name="chua"
                        label="Chọn chủ trì"
                        rules={[{ required: true, message: 'Vui lòng chọn chùa' }]}
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
                            options={chuaList}
                            onSelect={handleOnSelectChua}
                        />
                    </Form.Item>
                    <Form.Item
                        name="truTri"
                        wrapperCol={{ offset: 8 }}
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
                        />
                    </Form.Item>
                </Form >
            </Modal >
        </div >
    );
};
export default memo(TableDaTaDaoTrang);