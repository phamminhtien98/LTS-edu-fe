import "./App.scss";
import { Layout, theme } from 'antd';
import LoginComponent from "./component/PublicView/LoginView/LoginComponent";
import RegisterComponent from "./component/PublicView/RegisterView/RegisterComponent";
import HomeComponent from "./component/PublicView/HomeView/HomeComponent";
import { Route, Routes } from "react-router-dom";
import HeaderComponent from "./component/HeaderComponent";
import ThongTinCaNhanComponent from "./component/PublicView/HomeView/ThongTinCaNhan/ThongTinCaNhanComponent";
import DanhSachDaoTrang from "./component/PublicView/HomeView/DaoTrang/DanhSachDaoTrang";
import DonDangKy from "./component/PublicView/HomeView/DaoTrang/DonDangKy";
import AdminHomeComponent from "./component/AuthView/AdminHomeComponent";
import AdminPhatTuComponent from "./component/AuthView/PhatTu/AdminPhatTuComponent";
import PrivateRouter from "./PrivateRouter";
import AdminPhatTuDetail from "./component/AuthView/PhatTu/PhatTuDetail/AdminPhatTuDetail";
import AdminChuaComponent from "./component/AuthView/Chua/AdminChuaComponent";
import AdminChuaDetail from "./component/AuthView/Chua/ChuaDetail/AdminChuaDetail";
import AdminDaoTrangComponent from "./component/AuthView/DaoTrang/AdminDaoTrangComponent";
import AdminDaoTrangDetail from "./component/AuthView/DaoTrang/DaoTrangDetail/AdminDaoTrangDetail";

const { Header, Content, Footer } = Layout;
function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div className="App">
      <Layout >
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: "white",
            boxShadow: '6px 2px 3px 0px rgba(0,0,0,0.2)'
          }}
        >
          <HeaderComponent />
        </Header>
        <Content style={{ background: colorBgContainer }} className="full-view">
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<LoginComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/register" element={<RegisterComponent />} />

              <Route element={<PrivateRouter />}>
                <Route path="/home" element={<HomeComponent />}>
                  <Route path="thong-tin-ca-nhan" element={<ThongTinCaNhanComponent />} />
                  <Route path="dao-trang" element={<DanhSachDaoTrang />} />
                  <Route path="don-dang-ky" element={<DonDangKy />} />
                </Route>
                <Route path="/admin" element={<AdminHomeComponent />} >
                  <Route path="phat-tu" element={<AdminPhatTuComponent />} />
                  <Route path="phat-tu/:id" element={<AdminPhatTuDetail />} />
                  <Route path="chua" element={<AdminChuaComponent />} />
                  <Route path="chua/:id" element={<AdminChuaDetail />} />
                  <Route path="dao-trang" element={<AdminDaoTrangComponent />} />
                  <Route path="dao-trang/:id" element={<AdminDaoTrangDetail />} />
                </Route>
              </Route>

            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            zIndex: 1,
            textAlign: 'center',
            height: '64px',
            backgroundColor: "white",
            boxShadow: '-6px -2px 3px 0px rgba(0,0,0,0.2)'
          }}
        >
          Design ©2023
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
