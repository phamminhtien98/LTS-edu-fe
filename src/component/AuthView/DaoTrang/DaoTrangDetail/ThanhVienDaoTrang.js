import React, { memo, useState } from 'react'
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Input, Table } from 'antd';
import { Link } from 'react-router-dom';

const ThanhVienDaoTrang = ({ phatTuDaoTrangList }) => {
    const [search, setSearch] = useState("");
    const columns = [
        {
            title: 'STT',
            render: (_, record) => (
                <>{record.key || ""}</>
            ),
            filteredValue: [search],
            onFilter: (value, record) => (`${record?.ho?.toLowerCase() ?? ''} ${record?.tenDem?.toLowerCase() ?? ''} ${record?.ten?.toLowerCase() ?? ''}`).includes(value.toLowerCase()) ||
                (record?.phapDanh?.toLowerCase() ?? '').includes(value.toLowerCase())
        },
        {
            title: 'Họ và tên',
            render: (_, record) => (
                <Link to={`../phat-tu/${record.id}`} style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                    <Avatar style={{ marginRight: "10px" }} size="large" icon={<UserOutlined />} src={`data:image/jpeg;base64,${record.anhChup}`} />
                    <span style={{ minWidth: "100px" }}>{record.ho || ""} {record.tenDem || ""} {record.ten || ""}</span>
                </Link>
            ),
        },
        {
            title: 'Pháp danh',
            render: (_, record) => (
                <>{record.phapDanh || ""}</>
            ),
        },
        {
            title: 'Chùa',
            render: (_, record) => (
                <>{record.chua || ""}</>
            ),
        },
        {
            title: 'Số điện thoại',
            render: (_, record) => (
                <>{record.soDienThoai || ""}</>
            ),
        },
        {
            title: 'email',
            render: (_, record) => (
                <>{record.email || ""}</>
            ),
        },
        {
            title: 'Ngày sinh',
            render: (_, record) => (
                <>{record.ngaySinh || ""}</>
            ),
        },
        {
            title: 'Giới tính',
            render: (_, record) => (
                <>{record.gioiTinh === 1 ? "Nam" : "Nữ"}</>
            ),
        },
    ];
    return (
        <>
            <div className='title'><TeamOutlined />  Danh sách thành viên đạo tràng:</div>
            <Input.Search placeholder='Nhập tên hoặc pháp danh'
                style={{ maxWidth: "400px", margin: "10px 0px" }}
                onSearch={(value) => { setSearch(value) }}
                onChange={(e) => { setSearch(e.target.value) }} />
            <Table columns={columns} dataSource={phatTuDaoTrangList}
                pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: [4, 6, 8, 10, 15, 20],
                    defaultPageSize: 4,
                }} />
        </>
    )
}

export default memo(ThanhVienDaoTrang) 