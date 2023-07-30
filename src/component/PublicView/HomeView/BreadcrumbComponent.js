import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';



const BreadcrumbComponent = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const id = pathSnippets[pathSnippets.length - 1];
    const breadcrumbNameMap = {
        '/home': 'Home',
        '/home/thong-tin-ca-nhan': 'Thông tin cá nhân',
        '/home/dao-trang': 'Danh sách đạo tràng',
        '/home/don-dang-ky': 'Đơn đăng ký',
        '/admin': 'Bảng điều khiển',
        '/admin/phat-tu': 'Danh sách phật tử',
        '/admin/chua': 'Danh sách chùa',
        '/admin/dao-trang': 'Danh sách đạo tràng',
    };
    breadcrumbNameMap[`/admin/phat-tu/${id}`] = `Phật tử id ${id}`;
    breadcrumbNameMap[`/admin/chua/${id}`] = `Chùa id ${id}`;
    breadcrumbNameMap[`/admin/dao-trang/${id}`] = `Đạo tràng id ${id}`;
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

        return {
            key: url,
            title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
        };
    });

    // const breadcrumbItems = [
    //     {
    //         title: <Link to="/">Home</Link>,
    //         key: 'home',
    //     },
    // ].concat(extraBreadcrumbItems);
    return (
        <div className="demo" style={{ margin: '16px 0' }}>
            <Breadcrumb items={extraBreadcrumbItems} />
        </div>
    );
};
export default BreadcrumbComponent;