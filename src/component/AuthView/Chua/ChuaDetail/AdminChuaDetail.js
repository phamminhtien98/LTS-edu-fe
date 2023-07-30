import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { message } from 'antd';
import { useEffect, useState } from 'react';
import "./AdminChuaDetail.scss"
import ChuaApi from '../../../../api/ChuaApi';
import ThongTinChua from './ThongTinChua';
import ThanhVienChua from './ThanhVienChua';
import phatTuApi from '../../../../api/phatTuApi';
const AdminChuaDetail = () => {
    const { id } = useParams()
    const [chua, setChua] = useState(null);
    const [listPhatTu, setListPhatTu] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchChua = async () => {
            try {
                const response = await ChuaApi.timChuaTheoId(id);
                console.log(response);
                setChua(response)
                setListPhatTu(response.phatTuList.map((item, index) => { return { ...item, key: index + 1, value: item.id, label: `Họ tên: ${item.ho || ""} ${item.tenDem || ""} ${item.ten || ""} - Pháp danh: ${item.phapDanh || ""}` } }))
            } catch (error) {
                setChua(null)
            }
        }
        fetchChua();
    }, [])

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'ngayThanhLap': fieldsValue['ngayThanhLap'] ? fieldsValue['ngayThanhLap'].format('YYYY-MM-DD HH:mm:ss') : null,
        };
        if (localStorage.getItem("token")) {
            let data = {
                id: chua.id,
                tenChua: values.tenChua,
                diaChi: values.diaChi,
                ngayThanhLap: values.ngayThanhLap,
                truTri: {
                    id: values.truTri
                },
            }
            const fetchUpdateThongTin = async () => {
                try {
                    let token = localStorage.getItem("token");

                    console.log(token);
                    const response = await ChuaApi.updateThongTin(token, data);
                    console.log(response);
                    message.success("Sửa thông tin thành công");
                } catch (error) {
                    console.log(error);
                    message.error("Lỗi");
                }
            }
            fetchUpdateThongTin();
        }
    };

    const handleDelete = (data) => {
        // Thực hiện xóa
        const fetchXoaChua = async (data) => {
            try {
                let token = localStorage.getItem("token");
                console.log(token);
                const response = await ChuaApi.delete(token, data);
                console.log(response);
                message.success("Xóa thành công");
                navigate("../chua")
            } catch (error) {
                console.log(error);
                message.error("Lỗi");
            }
        }
        fetchXoaChua(data);
        console.log(data);
    };
    return (
        <div className="chua-body">
            <ThongTinChua chua={chua} listPhatTu={listPhatTu} onFinish={onFinish} handleDelete={handleDelete} />
            <ThanhVienChua listPhatTu={listPhatTu} />
        </div >
    )
}

export default AdminChuaDetail