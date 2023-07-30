import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { message } from 'antd';
import { useEffect, useState } from 'react';
import "./AdminDaoTrangDetail.scss"
import ThongTinDaoTrang from './ThongTinDaoTrang';
import ThanhVienDaoTrang from './ThanhVienDaoTrang';
import DaoTrangApi from '../../../../api/DaoTrangApi';
import phatTuApi from '../../../../api/phatTuApi';
const AdminDaoTrangDetail = () => {
    const { id } = useParams()
    const [daoTrang, setDaoTrang] = useState(null);
    const [phatTuList, setPhatTuList] = useState([]);
    const [phatTuDaoTrangList, setPhatTuDaoTrangList] = useState([]);
    const navigate = useNavigate();
    const fetchDaoTrang = async () => {
        try {
            const response = await DaoTrangApi.timDaoTrangTheoId(id);
            setDaoTrang(response)
            // console.log(">>>>>>>>>>>>", response);
            setPhatTuDaoTrangList(response.phatTuDaoTrangListdt.map((item, index) => {
                return {
                    key: index + 1,
                    id: item.phatTu.id,
                    ho: item.phatTu.ho,
                    tenDem: item.phatTu.tenDem,
                    ten: item.phatTu.ten,
                    phapDanh: item.phatTu.phapDanh,
                    ngaySinh: item.phatTu.ngaySinh,
                    soDienThoai: item.phatTu.soDienThoai,
                    email: item.phatTu.email,
                    gioiTinh: item.phatTu.gioiTinh,
                    chua: item.phatTu.chua?.tenChua ?? "",
                }
            }))
        } catch (error) {
            setDaoTrang(null)
        }
    }
    const fetchAllPhatTu = async () => {
        try {
            const response = await phatTuApi.findAllPhatTu();
            setPhatTuList(response.map((item) => {
                return {
                    ...item, value: item.id,
                    label: `${item.ho ?? ""} ${item.tenDem ?? ""} ${item.ten ?? ""} ${item.phapDanh ? `- Pháp danh: ${item.phapDanh}` : ""} ${item.chua?.tenChua ? `- Chùa: ${item.chua.tenChua}` : ""}`
                }
            }));
        } catch (error) {
            setPhatTuList([]);
        }
    }
    useEffect(() => {
        fetchAllPhatTu();
        fetchDaoTrang();
    }, [])

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'thoiGianToChuc': fieldsValue['thoiGianToChuc'] ? fieldsValue['thoiGianToChuc'].format('YYYY-MM-DD HH:mm:ss') : null,
        };
        if (localStorage.getItem("token")) {
            let data = {
                id: daoTrang.id,
                noiToChuc: values.noiToChuc,
                thoiGianToChuc: values.thoiGianToChuc,
                noiDung: values.noiDung,
                phatTuNguoiTruTri: {
                    id: values.truTri
                },
            }
            const fetchUpdateThongTin = async () => {
                try {
                    let token = localStorage.getItem("token");
                    const response = await DaoTrangApi.updateThongTin(token, data);
                    // console.log(response);
                    message.success("Sửa thông tin thành công");
                    fetchDaoTrang();
                } catch (error) {
                    // console.log(error);
                    message.error("Lỗi");
                }
            }
            fetchUpdateThongTin();
        }
    };

    const handleDelete = (data) => {
        // Thực hiện xóa
        const fetchXoaDaoTrang = async (data) => {
            try {
                let token = localStorage.getItem("token");
                const response = await DaoTrangApi.delete(token, data);
                // console.log(response);
                message.success("Xóa thành công");
                navigate("../dao-trang")
            } catch (error) {
                // console.log(error);
                message.error("Lỗi");
            }
        }
        fetchXoaDaoTrang(data);
    };
    return (
        <div className="chua-body">
            <ThongTinDaoTrang daoTrang={daoTrang} phatTuDaoTrangList={phatTuDaoTrangList} phatTuList={phatTuList} onFinish={onFinish} handleDelete={handleDelete} />
            <ThanhVienDaoTrang phatTuDaoTrangList={phatTuDaoTrangList} />
        </div >
    )
}

export default AdminDaoTrangDetail