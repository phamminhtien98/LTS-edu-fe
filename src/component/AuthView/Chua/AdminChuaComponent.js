
import { useEffect, useState } from 'react';
import ChuaApi from '../../../api/ChuaApi';
import { message } from 'antd';
import SearchChuas from './SearchChuas';
import TableDaTaChua from './TableDaTaChua';
const AdminChuaComponent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    const [param, setParam] = useState({ tenChua: null, truTri: null, diaChi: null, ngayThanhLapTu: null, ngayThanhLapDen: null });

    const [data, setData] = useState([]);

    const fetchChuaList = async (page, pageSize, tenChua, truTri, diaChi, ngayThanhLapTu, ngayThanhLapDen) => {
        try {
            const param = {
                page: page,
                pageSize: pageSize,
                tenChua: tenChua,
                truTri: truTri,
                diaChi: diaChi,
                ngayThanhLapTu: ngayThanhLapTu,
                ngayThanhLapDen: ngayThanhLapDen,
            }
            const response = await ChuaApi.searchChua(param)
            setData({
                chuaList: response.content.map((item, index) => { return { ...item, key: index + 1 } }),
                totalElements: response.totalElements,
                currentPage: response.number + 1,
                pageSize: response.size,
            })
        } catch (error) {
            setData({
                chuaList: [],
                totalItem: null,
                currentPage: 1,
                pageSize: 2,
            })
        }
    }

    useEffect(() => {
        fetchChuaList(currentPage, pageSize, param.tenChua, param.truTri, param.diaChi, param.ngayThanhLapTu, param.ngayThanhLapDen)
    }, [param, pageSize, currentPage])

    const handleParam = (data) => {
        setParam({
            tenChua: data.tenChua || null,
            truTri: data.truTri || null,
            diaChi: data.diaChi || null,
            ngayThanhLapTu: data.ngayThanhLapTu || null,
            ngayThanhLapDen: data.ngayThanhLapDen || null,
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
        const fetchXoaChua = async (dataMap) => {
            try {
                let token = localStorage.getItem("token");
                console.log(token);
                const response = await ChuaApi.delete(token, dataMap);
                console.log(response);
                message.success("Xóa thành công");
                fetchChuaList(currentPage, pageSize, param.tenChua, param.truTri, param.diaChi, param.ngayThanhLapTu, param.ngayThanhLapDen)
            } catch (error) {
                console.log(error);
                message.error("Lỗi");
            }
        }
        fetchXoaChua(dataMap);
    }
    //thêm
    const handleOnFinishAddChua = (fieldsValue) => {
        let data = {
            tenChua: fieldsValue.tenChua,
            diaChi: fieldsValue.diaChi,
            ngayThanhLap: fieldsValue.ngayThanhLap.format('YYYY-MM-DD HH:mm:ss'),
        }
        const fetchThemChua = async (data) => {
            try {
                const response = await ChuaApi.themChua(localStorage.getItem("token"), data)
                message.success("Thêm thành công")
                fetchChuaList(currentPage, pageSize, param.tenChua, param.truTri, param.diaChi, param.ngayThanhLapTu, param.ngayThanhLapDen)
            } catch (error) {
                message.error("Lỗi")
            }
        }
        fetchThemChua(data);
    }

    return (
        <>
            <SearchChuas handleParam={handleParam} />
            <TableDaTaChua data={data} handlePage={handlePage} handlePageSize={handlePageSize} handleDelete={handleDelete} handleOnFinishAddChua={handleOnFinishAddChua} />
        </>
    )
}
export default AdminChuaComponent;