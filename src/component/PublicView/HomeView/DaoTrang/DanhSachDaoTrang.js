import { Button, Modal, Table, DatePicker, Form, Input, Select, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import DaoTrangApi from '../../../../api/DaoTrangApi';
import { useDispatch, useSelector } from 'react-redux';
import phatTuApi from '../../../../api/phatTuApi';
import { setPhatTu } from '../../../../store/actions/PhatTuActions';
import DonDangKyApi from '../../../../api/DonDangKyApi';
const { RangePicker } = DatePicker;
const DanhSachDaoTrang = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDaoTrangSelect, setIsDaoTrangSelect] = useState({})

    const user = useSelector(state => state.phatTu.value)
    const dispatch = useDispatch();

    const [totalItem, setTotalItem] = useState(10);
    const [daoTrangList, setDaoTrangList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [param, setParam] = useState({ noiToChuc: null, chuTri: null, thoiGianTu: null, thoiGianDen: null, tinhTrang: null });
    const formRef = useRef(null);
    const [disable, setDisable] = useState(false);
    const [okText, setOkText] = useState(1);
    // const { phatTu, setPhatTu } = useContext(PhatTuContext);
    const fetchTaiKhoan = async () => {
        try {
            const response = await phatTuApi.getByToken(localStorage.getItem("token"));
            const action = setPhatTu(response);
            dispatch(action);
        } catch (error) {
        }
    }
    const featchDaoTrang = async (page, pageSize, noiToChuc, chuTri, thoiGianTu, thoiGianDen, tinhTrang) => {
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
            setDaoTrangList(response.content.map(item => {
                return {
                    id: item.id,
                    key: item.id,
                    noiToChuc: item.noiToChuc,
                    nguoiChuTri: item.phatTuNguoiTruTri.phapDanh,
                    thoiGianToChuc: item.thoiGianToChuc,
                    daKetThuc: item.daKetThuc == null ? "" : item.daKetThuc ? "Đã kết thúc" : "Chưa kết thúc",
                    noiDung: item.noiDung,
                    soThanhVienThamGia: item.soThanhVienThamGia,
                    donDangKyList: item.donDangKyList,
                    phatTuDaoTrangList: item.phatTuDaoTrangListdt
                }
            }))
            setTotalItem(response.totalElements)
            console.log(response.content)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        featchDaoTrang(currentPage, pageSize, param.noiToChuc, param.chuTri, param.thoiGianTu, param.thoiGianDen, param.tinhTrang)
    }, [currentPage, param])

    const showModal = (record) => {
        if (record && user && record.daKetThuc === "Chưa kết thúc") {
            for (let i = 0; i < user.daoTrangList.length; i++) {
                if (record.id === user.daoTrangList[i].id) {
                    setDisable(true);
                    setOkText(2);
                    break;
                }
            }
            if (!disable) {
                for (let i = 0; i < user.donDangKyList.length; i++) {
                    if (record.id === user.donDangKyList[i].daoTrang.id && user.donDangKyList[i].trangThaiDon === 1) {
                        setDisable(true);
                        setOkText(2);
                        break;
                    } else if (record.id === user.donDangKyList[i].daoTrang.id && user.donDangKyList[i].trangThaiDon === 3) {
                        setDisable(true);
                        setOkText(3);
                        break;
                    }
                }
            }
        } else {
            setDisable(true);
            setOkText(1);
        }
        setIsDaoTrangSelect(record)
        setIsModalOpen(true);
    };

    const handleOk = () => {
        let data = {
            phatTu: { id: user.id },
            daoTrang: { id: isDaoTrangSelect.id }
        }
        const taoDonDangKy = async () => {
            try {
                const response = await DonDangKyApi.taoDonDangKy(localStorage.getItem("token"), data);
                message.success("Đăng ký thành công");
                fetchTaiKhoan();
            } catch (error) {
                message.error("Đăng ký thất bại");
            }
        }
        taoDonDangKy();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setDisable(false);
        setOkText(1);
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Nơi tổ chức',
            width: 50,
            dataIndex: 'noiToChuc',
            key: 'noiToChuc',
        },
        {
            title: 'Người chủ trì',
            width: 50,
            dataIndex: 'nguoiChuTri',
            key: 'nguoiChuTri',
        },
        {
            title: 'Thời gian tổ chức',
            dataIndex: 'thoiGianToChuc',
            key: 'thoiGianToChuc',
            width: 50,
        },
        {
            title: 'Tình trạng',
            dataIndex: 'daKetThuc',
            key: 'daKetThuc',
            width: 50,
        },
        {
            title: 'Chi tiết',
            dataIndex: 'oppenModal',
            key: 'oppenModal',
            fixed: 'right',
            width: 30,
            render: (_, record) => <Button onClick={() => { showModal(record) }}>Chi tiết</Button>,
        }
    ];

    const onFinish = (fieldsValue) => {
        // Should format date value before submit.
        const rangeTimeValue = fieldsValue['thoiGianToChuc'];
        let values = {};
        if (rangeTimeValue) {
            values = {
                ...fieldsValue,
                'khoangThoiGian': [
                    rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                    rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
                ],
            };
        } else {
            if (fieldsValue.daKetThuc === 0) {
                values = {
                    ...fieldsValue,
                    daKetThuc: null
                }
            } else {
                values = {
                    ...fieldsValue,
                }
            }
        }
        setCurrentPage(1)
        setParam({
            noiToChuc: values.noiToChuc ? values.noiToChuc : null,
            chuTri: values.chuTri ? values.chuTri : null,
            thoiGianTu: values.thoiGianToChuc ? values.khoangThoiGian[0] : null,
            thoiGianDen: values.thoiGianToChuc ? values.khoangThoiGian[1] : null,
            tinhTrang: values.daKetThuc === 0 ? null : values.daKetThuc,
        })
        // console.log('param: ', param);
    };
    const handleChangeValue = () => {
        formRef.current.submit();
        console.log('param: ', param);
    }
    return (
        <>
            <div>
                <p><SearchOutlined /> Tìm kiếm:</p>
                <Form
                    labelCol={{ span: 5 }}
                    ref={formRef}
                    labelAlign="left"
                    wrapperCol={{ span: 15 }}
                    onFinish={onFinish}
                    onChange={handleChangeValue}
                    initialValues={{ daKetThuc: 0 }}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name="thoiGianToChuc" label="Thời gian tổ chức">
                        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"
                            onCalendarChange={handleChangeValue} />
                    </Form.Item>
                    <Form.Item
                        label="Nơi Tổ chức"
                        name="noiToChuc">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Chủ trì"
                        name="chuTri">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tình trạng"
                        name="daKetThuc"
                    >
                        <Select
                            options={[
                                { value: 0, label: 'Tất cả' },
                                { value: false, label: 'Chưa kết thúc' },
                                { value: true, label: 'Đã Kết thúc' }
                            ]}
                            onChange={handleChangeValue}
                        />
                    </Form.Item>
                </Form>
            </div >
            <Table
                columns={columns}
                dataSource={daoTrangList}
                scroll={{
                    x: "100vh",
                    y: 300,
                }}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: totalItem,
                    showSizeChanger: false,
                    onChange: (page) => { setCurrentPage(page) },
                }}
            />
            <Modal title="Thông tin đạo tràng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={okText === 2 ? "Đã đăng ký tham gia" : okText === 1 ? "Đăng ký tham gia" : "Đơn bị từ chối"} okButtonProps={{ disabled: disable }} >
                <div><span style={{ fontWeight: "bold" }}>Người chủ trì đạo tràng:</span> {isDaoTrangSelect.nguoiChuTri}</div>
                <div><span style={{ fontWeight: "bold" }}>Địa điểm tổ chức:</span> {isDaoTrangSelect.noiToChuc}</div>
                <div><span style={{ fontWeight: "bold" }}>Thời gian diễn ra:</span> {isDaoTrangSelect.thoiGianToChuc}</div>
                <div><span style={{ fontWeight: "bold" }}>Nội dung buổi đạo tràng:</span> {isDaoTrangSelect.noiDung}</div>
                <div><span style={{ fontWeight: "bold" }}>Số người tham gia:</span> {isDaoTrangSelect.soThanhVienThamGia}</div>
                <div><span style={{ fontWeight: "bold" }}>Tình trạng:</span> {isDaoTrangSelect.daKetThuc}</div>
            </Modal>
        </>
    )
}
export default DanhSachDaoTrang;

