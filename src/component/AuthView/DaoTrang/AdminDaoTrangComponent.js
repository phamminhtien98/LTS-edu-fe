import { useEffect, useState } from 'react';
import { message } from 'antd';
import SearchDaoTrang from './SearchDaoTrang';
import TableDaTaDaoTrang from './TableDaTaDaoTrang';
import DaoTrangApi from '../../../api/DaoTrangApi';
const AdminDaoTrangComponent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    const [param, setParam] = useState({ noiToChuc: null, chuTri: null, thoiGianTu: null, thoiGianDen: null, tinhTrang: null });

    const [data, setData] = useState([]);

    const fetchDaoTrang = async (page, pageSize, noiToChuc, chuTri, thoiGianTu, thoiGianDen, tinhTrang) => {
        try {
            const param = {
                page: page,
                pageSize: pageSize,
                noiToChuc: noiToChuc,
                chuTri: chuTri,
                thoiGianTu: thoiGianTu,
                thoiGianDen: thoiGianDen,
                tinhTrang: tinhTrang
            }
            const response = await DaoTrangApi.searchDaoTrang(param);
            setData({
                daoTrangList: response.content.map((item, index) => {
                    return {
                        ...item,
                        key: index + 1,
                        trangThai: item.daKetThuc == null ? "" : item.daKetThuc ? "Đã kết thúc" : "Chưa kết thúc",
                        chuTri: `${item.phatTuNguoiTruTri?.phapDanh ? "Pháp danh: " + item.phatTuNguoiTruTri.phapDanh : ""}`,
                    }
                }),
                totalElements: response.totalElements,
                currentPage: response.number + 1,
                pageSize: response.size,
            })
        } catch (error) {
            setData({
                daoTrangList: [],
                totalItem: null,
                currentPage: 1,
                pageSize: 4,
            })
        }
    }


    useEffect(() => {
        fetchDaoTrang(currentPage, pageSize, param.noiToChuc, param.chuTri, param.thoiGianTu, param.thoiGianDen, param.tinhTrang)
    }, [param, pageSize, currentPage])

    const handleParam = (data) => {
        setParam({
            noiToChuc: data.noiToChuc,
            chuTri: data.chuTri,
            thoiGianTu: data.thoiGianTu,
            thoiGianDen: data.thoiGianDen,
            tinhTrang: data.tinhTrang,
        })
        console.log(data);
    }
    const handlePage = (data) => {
        setCurrentPage(data)
    }
    const handlePageSize = (data) => {
        setPageSize(data)
    }
    //xóa
    const handleDelete = (data) => {
        const dataMap = data.map((item, index) => { return item.id })
        const fetchXoaDaoTrang = async (dataMap) => {
            try {
                let token = localStorage.getItem("token");
                console.log(token);
                const response = await DaoTrangApi.delete(token, dataMap);
                console.log(response);
                message.success("Xóa thành công");
                fetchDaoTrang(currentPage, pageSize, param.noiToChuc, param.chuTri, param.thoiGianTu, param.thoiGianDen, param.tinhTrang)
            } catch (error) {
                console.log(error);
                message.error("Lỗi");
            }
        }
        fetchXoaDaoTrang(dataMap);
    }
    //thêm
    const handleOnFinishAdd = (fieldsValue) => {
        let data = {
            noiToChuc: fieldsValue.noiToChuc,
            phatTuNguoiTruTri: { id: fieldsValue.truTri },
            noiDung: fieldsValue.noiDung,
            thoiGianToChuc: fieldsValue.thoiGianToChuc.format('YYYY-MM-DD HH:mm:ss'),
        }
        const fetchThemDaoTrang = async (data) => {
            try {
                const response = await DaoTrangApi.themDaoTrang(localStorage.getItem("token"), data)
                message.success("Thêm thành công")
                fetchDaoTrang(currentPage, pageSize, param.noiToChuc, param.chuTri, param.thoiGianTu, param.thoiGianDen, param.tinhTrang)
            } catch (error) {
                message.error("Lỗi")
            }
        }
        fetchThemDaoTrang(data);
    }

    return (
        <>
            <SearchDaoTrang handleParam={handleParam} />
            <TableDaTaDaoTrang data={data} handlePage={handlePage} handlePageSize={handlePageSize} handleDelete={handleDelete} handleOnFinishAdd={handleOnFinishAdd} />
        </>
    )
}
export default AdminDaoTrangComponent;