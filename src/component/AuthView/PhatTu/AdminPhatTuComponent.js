import { useEffect, useState } from 'react';
import TableDaTaPhatTu from './TableDaTaPhatTu';
import SearchPhatTu from './SearchPhatTu';
import phatTuApi from '../../../api/phatTuApi';
import { message } from 'antd';
const AdminPhatTuComponent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    const [param, setParam] = useState({ ten: null, phapDanh: null, gioiTinh: null, trangThai: null });

    const [data, setData] = useState([]);

    const fetchPhatTuList = async (ten, phapDanh, gioiTinh, trangThai, page, pageSize) => {
        try {
            const param = {
                ten: ten,
                phapDanh: phapDanh,
                gioiTinh: gioiTinh,
                trangThai: trangThai,
                page: page,
                pageSize: pageSize
            }
            const response = await phatTuApi.searchPhatTu(param)
            setData({
                phatTuList: response.content.map((item, index) => { return { ...item, key: index + 1 } }),
                totalElements: response.totalElements,
                currentPage: response.number + 1,
                pageSize: response.size,
            })
        } catch (error) {
            setData({
                phatTuList: [],
                totalItem: null,
                currentPage: 1,
                pageSize: 2,
            })
        }
    }

    useEffect(() => {
        fetchPhatTuList(param.ten, param.phapDanh, param.gioiTinh, param.trangThai, currentPage, pageSize)
    }, [param, pageSize, currentPage])

    const handleParam = (data) => {
        setParam({
            ten: data.ten,
            phapDanh: data.phapDanh,
            gioiTinh: data.gioiTinh === 0 ? null : data.gioiTinh,
            trangThai: data.trangThai === 0 ? null : data.trangThai,
        })
    }
    const handlePage = (data) => {
        setCurrentPage(data)
    }
    const handlePageSize = (data) => {
        setPageSize(data)
    }

    const handleDelete = (data) => {
        const dataMap = data.map(item => { return item.id })
        const fetchXoaPhatTu = async (dataMap) => {
            try {
                let token = localStorage.getItem("token");
                const response = await phatTuApi.delete(token, dataMap);
                // console.log(response);
                message.success("Xóa thành công");
                fetchPhatTuList(param.ten, param.phapDanh, param.gioiTinh, param.trangThai, currentPage, pageSize)
            } catch (error) {
                // console.log(error);
                message.error("Lỗi");
            }
        }
        fetchXoaPhatTu(dataMap);
    }

    return (
        <>
            <SearchPhatTu handleParam={handleParam} />
            <TableDaTaPhatTu data={data} handlePage={handlePage} handlePageSize={handlePageSize} handleDelete={handleDelete} />
        </>
    )
}
export default AdminPhatTuComponent;