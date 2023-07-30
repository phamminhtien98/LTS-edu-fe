import { HomeOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BreadcrumbComponent from './BreadcrumbComponent';
const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Trang chủ', '/home', <UserOutlined />),
    getItem('Thông tin cá nhân', 'thong-tin-ca-nhan', <UserOutlined />),
    getItem('Chùa', 'sub1', <HomeOutlined />, [
        getItem('Thông tin chùa', 'thong-tin-chua'),
        getItem('Thành viên', 'thanh-vien'),
    ]),
    getItem('Đạo tràng', 'sub2', <TeamOutlined />, [
        getItem('Danh sách đạo tràng', 'dao-trang'),
        getItem('Xem đơn đăng ký', 'don-dang-ky'),
    ]),
];

const HomeComponent = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    return (
        <Layout className='full-view'>
            <Sider className='sider' style={{ position: "fixed", minHeight: "100%", }} theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu mode="inline" items={items} onClick={(item) => { navigate(item.key) }} />
            </Sider>
            <Layout style={{ padding: '0 24px 24px', marginLeft: !collapsed ? "200px" : "80px", transition: "all 0.25s " }}>
                <BreadcrumbComponent />
                <Content style={{ padding: 24, margin: 0, background: colorBgContainer }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
export default HomeComponent;