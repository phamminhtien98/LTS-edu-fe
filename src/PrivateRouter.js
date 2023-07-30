import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = ({ element: Component, }) => {
    const token = localStorage.getItem("token")


    return (
        token ? <Outlet /> : <Navigate to="/" />
    )
}


export default PrivateRouter