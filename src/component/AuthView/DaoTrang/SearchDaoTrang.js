import React, { memo, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, DatePicker, Select } from "antd";
const { RangePicker } = DatePicker;

const SearchDaoTrang = ({ handleParam }) => {
    const formRef = useRef(null);
    const timeOutSubmit = useRef(null);

    const onFinish = (fieldsValue) => {
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
        console.log("test2 >>>>", {
            noiToChuc: values.noiToChuc ? values.noiToChuc : null,
            chuTri: values.chuTri ? values.chuTri : null,
            thoiGianTu: values.thoiGianToChuc ? values.khoangThoiGian[0] : null,
            thoiGianDen: values.thoiGianToChuc ? values.khoangThoiGian[1] : null,
            tinhTrang: values.daKetThuc === 0 ? null : values.daKetThuc,
        });
        handleParam({
            noiToChuc: values.noiToChuc ? values.noiToChuc : null,
            chuTri: values.chuTri ? values.chuTri : null,
            thoiGianTu: values.thoiGianToChuc ? values.khoangThoiGian[0] : null,
            thoiGianDen: values.thoiGianToChuc ? values.khoangThoiGian[1] : null,
            tinhTrang: values.daKetThuc === 0 ? null : values.daKetThuc,
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
                initialValues={{ daKetThuc: 0 }}
                style={{ maxWidth: 600 }}
            >
                <Form.Item name="thoiGianToChuc" label="Thời gian tổ chức">
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"
                        onCalendarChange={handleChangeValue} />
                </Form.Item>
                <Form.Item label="Nơi tổ chức" name="noiToChuc">
                    <Input />
                </Form.Item>
                <Form.Item label="Chủ trì" name="chuTri">
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
        </div>
    );
};

export default memo(SearchDaoTrang);
