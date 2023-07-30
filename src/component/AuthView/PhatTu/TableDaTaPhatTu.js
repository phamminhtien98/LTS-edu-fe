import { Avatar, Button, Modal, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Họ và tên',
        render: (_, record) => (
            <Link to={`${record.id}`} style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <Avatar style={{ marginRight: "10px" }} size="large" icon={<UserOutlined />} src={`data:image/jpeg;base64,${record.anhChup}`} />
                <span style={{ minWidth: "100px" }}>{record.ho || ""} {record.tenDem || ""} {record.ten || ""}</span>
            </Link>
        ),
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Pháp danh',
        dataIndex: 'phapDanh',
    },
    {
        title: 'Giới Tính',
        dataIndex: 'gioiTinh',
        render: (_, record) => (
            <>{record.gioiTinh === null ? "" : record.gioiTinh === 1 ? "Nam" : "Nữ"}</>
        ),
    },
    {
        title: 'Trạng thái',
        dataIndex: 'trangThai',
        render: (_, record) => (
            <>{record.daHoanTuc === null ? "" : record.daHoanTuc ? "Đã hoàn tục" : "Đang xuất gia"}</>
        ),
    },
];

const TableDaTaPhatTu = ({ data, handlePage, handlePageSize, handleDelete }) => {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const showDeleteModal = () => {
        setDeleteModalVisible(true);
    };

    const acceptDelete = () => {
        handleDelete(selectedRow)
        setDeleteModalVisible(false);
    };
    const onSelectChange = (newSelectedRowKeys, newSelectedRow) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRow(newSelectedRow)
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <div style={{ marginBottom: 16, }}>
                <Button type="primary" onClick={showDeleteModal}>
                    Xóa
                </Button>
                <span style={{ marginLeft: 8, }}>
                    {hasSelected ? `Đã chọn ${selectedRowKeys.length} phật tử` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data.phatTuList} pagination={{
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
        </div>
    );
};
export default memo(TableDaTaPhatTu);