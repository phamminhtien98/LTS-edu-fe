import { Avatar, Button } from 'antd';
import { UserOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import phatTuApi from '../api/phatTuApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPhatTu } from '../store/actions/PhatTuActions';
import '../assets/images/logo1.jpg';

const HeaderComponent = () => {
    const navigate = useNavigate();

    const phatTu = useSelector(state => state.phatTu.value)
    const dispatch = useDispatch();

    // const { phatTu, setPhatTu } = useContext(PhatTuContext);
    useEffect(() => {
        const fetchTaiKhoan = async () => {
            try {
                const response = await phatTuApi.getByToken(localStorage.getItem("token"));
                console.log("rendel header", response);
                // setPhatTu(response);
                const action = addNewPhatTu(response);
                dispatch(action);
            } catch (error) {
                // setPhatTu(null);
                localStorage.removeItem("token")
                const action = addNewPhatTu(null);
                dispatch(action);
            }
        }
        if (localStorage.getItem("token") && phatTu == null) {
            fetchTaiKhoan();
        }
    }, [localStorage.getItem("token")])

    const handleLogout = () => {
        localStorage.removeItem("token");
        const action = addNewPhatTu(null);
        dispatch(action);
        navigate('/login');
    }
    return (
        <div className="header-content">
            <div className="header-content-left" style={{ display: "flex", alignItems: "center" }}>
                <img style={{ width: "50px", height: "50px", display: "block", }} src={require("../assets/images/logo1.jpg")} alt="" />
            </div>
            {
                phatTu == null ? <div className="header-content-right">
                    <Link to={'/login'}><Button type="primary" icon={<LoginOutlined />}>Đăng nhập</Button></Link>
                    <Link to={'/register'}><Button type="primary" icon={<UserAddOutlined />}>Đăng ký</Button></Link>
                </div> : <div className="header-content-right">
                    <Avatar size="large" icon={<UserOutlined />} src={`data:image/jpeg;base64,${phatTu.anhChup}`} />
                    <span className="user-name">{phatTu.ho || ""} {phatTu.tenDem || ""} {phatTu.ten || ""}</span>
                    <Button type="primary" icon={<LoginOutlined />} onClick={() => { handleLogout() }} >Đăng xuất</Button>
                </div>
            }
        </div>

    )
}
export default HeaderComponent;