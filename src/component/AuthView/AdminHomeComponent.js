import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BreadcrumbComponent from '../PublicView/HomeView/BreadcrumbComponent';
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
    getItem('Bảng điều khiển', '/admin', <UserOutlined />),
    getItem('Phật tử', 'sub1', <TeamOutlined />, [
        getItem('Danh sách', 'phat-tu'),
    ]),
    getItem('Chùa', 'sub2', <TeamOutlined />, [
        getItem('Danh sách', 'chua'),
    ]),
    getItem('Đạo tràng', 'sub3', <TeamOutlined />, [
        getItem('Danh sách', 'dao-trang'),
    ]),
];

const AdminHomeComponent = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    return (
        <Layout className='full-view'>
            <Sider className='sider' style={{ position: "fixed", minHeight: "100%" }} theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
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
export default AdminHomeComponent;