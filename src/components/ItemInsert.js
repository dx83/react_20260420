import { Button, Form, Input, InputNumber, Upload } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SellerWrite = () => {

    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [fileList, setFileList] = useState([]);

    const customRequest = () => {
        return false;
    };

    const onChange = (e) => {
        if (e.fileList.length > 0) {
            setFileList([
                {
                    uid: '-1',
                    name: e.fileList[0].name,
                    status: 'done',
                    url: URL.createObjectURL(e.fileList[0].originFileObj),
                },
            ]);
            setImage(e.fileList[0].originFileObj);
        }
        else {
            setFileList([]);
            setImage(null);
        }
    };

    const onFinish = async (values) => {
        console.log(values);
        values.image = image;
        const url = `/api/item/insert.json`;
        const headers = { "Content-Type": "multipart/form-data" };
        const { data } = await axios.post(url, values, { headers });
        console.log(data);
        if (data.status === 200) {
            alert("등록 완료");
            navigate('/seller');
        }
    }

    return (
        <div>
            <h3>판매자 물품 등록</h3>
            <Form
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label='물품명'
                    name="name"
                    rules={[{ required: true, message: '물품명을 입력하세요' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='물품내용'
                    name="content"
                    rules={[{ required: true, message: '물품내용을 입력하세요' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='물품가격'
                    name="price"
                    rules={[{ required: true, message: '물품가격을 입력하세요' }]}>
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label='물품수량'
                    name="quantity"
                    rules={[{ required: true, message: '물품수량을 입력하세요' }]}>
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label='물품이미지'
                    name="image">
                    <Upload listType="picture"
                        fileList={fileList}
                        onChange={onChange}
                        maxCount={1}
                        customRequest={customRequest}>
                        <Button>이미지 업로드</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        물품등록
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SellerWrite;