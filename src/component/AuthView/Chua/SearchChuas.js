import React, { memo, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, DatePicker } from "antd";
const { RangePicker } = DatePicker;

const SearchChuas = ({ handleParam }) => {
    const formRef = useRef(null);
    const timeOutSubmit = useRef(null);

    const onFinish = (fieldsValue) => {
        const rangeTimeValue = fieldsValue['ngayThanhLap'];
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
            values = {
                ...fieldsValue,
            }
        }
        console.log("test2 >>>>", {
            tenChua: values.tenChua ? values.tenChua : null,
            truTri: values.truTri ? values.truTri : null,
            diaChi: values.diaChi ? values.diaChi : null,
            ngayThanhLapTu: values.ngayThanhLap ? values.khoangThoiGian[0] : null,
            ngayThanhLapDen: values.ngayThanhLap ? values.khoangThoiGian[1] : null,
        });
        handleParam({
            tenChua: values.tenChua ? values.tenChua : null,
            truTri: values.truTri ? values.truTri : null,
            diaChi: values.diaChi ? values.diaChi : null,
            ngayThanhLapTu: values.ngayThanhLap ? values.khoangThoiGian[0] : null,
            ngayThanhLapDen: values.ngayThanhLap ? values.khoangThoiGian[1] : null,
        });
    };

    const handleChangeValue = () => {
        if (timeOutSubmit.current) {
            clearTimeout(timeOutSubmit.current);
        }
        timeOutSubmit.current = setTimeout(() => {
            formRef.current.submit();
        }, 500);
    };
    return (
        <div>
            <p>
                <SearchOutlined /> Tìm kiếm:
            </p>
            <Form
                labelCol={{ span: 5 }}
                ref={formRef}
                labelAlign="left"
                wrapperCol={{ span: 15 }}
                onFinish={onFinish}
                onChange={handleChangeValue}
                initialValues={{ gioiTinh: 0, trangThai: 0 }}
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Tên chùa" name="tenChua">
                    <Input />
                </Form.Item>
                <Form.Item label="Trụ trì" name="truTri">
                    <Input />
                </Form.Item>
                <Form.Item label="Địa chỉ" name="diaChi">
                    <Input />
                </Form.Item>
                <Form.Item name="ngayThanhLap" label="Ngày thành lập">
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"
                        onCalendarChange={handleChangeValue} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default memo(SearchChuas);
