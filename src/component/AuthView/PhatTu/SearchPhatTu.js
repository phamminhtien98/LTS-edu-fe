import React, { useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Select } from "antd";

const SearchPhatTu = ({ handleParam }) => {
    const formRef = useRef(null);
    const timeOutSubmit = useRef(null);

    const onFinish = (fieldsValue) => {
        handleParam({
            ten: fieldsValue.ten ? fieldsValue.ten : null,
            phapDanh: fieldsValue.phapDanh ? fieldsValue.phapDanh : null,
            gioiTinh: fieldsValue.gioiTinh === 0 ? null : fieldsValue.gioiTinh,
            trangThai: fieldsValue.trangThai === 0 ? null : fieldsValue.trangThai,
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
                <Form.Item label="Tên" name="ten">
                    <Input />
                </Form.Item>
                <Form.Item label="Pháp danh" name="phapDanh">
                    <Input />
                </Form.Item>
                <Form.Item label="Giới tính" name="gioiTinh">
                    <Select
                        options={[
                            { value: 0, label: "Tất cả" },
                            { value: 1, label: "Nam" },
                            { value: 2, label: "Nữ" },
                        ]}
                        onChange={handleChangeValue}
                    />
                </Form.Item>
                <Form.Item label="Trạng thái" name="trangThai">
                    <Select
                        options={[
                            { value: 0, label: "Tất cả" },
                            { value: true, label: "Đã hoàn tục" },
                            { value: false, label: "Chưa hoàn tục" },
                        ]}
                        onChange={handleChangeValue}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default SearchPhatTu;
