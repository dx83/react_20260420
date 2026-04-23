import React, { useEffect } from 'react';
import api from '../../api/axios';
import { Button, Form, Input, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';

const MemberUpdate = () => {

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log(values);
        const url = '/member/update.json';
        const { data } = await api.put(url, values);
        console.log(data);
        if (data.status === 200) {
            alert('회원 정보가 변경되었습니다.');
            navigate('/mypage');
        }
    }

    const handleData = async () => {
        const url = '/member/selectone.json';
        const { data } = await api.get(url);
        //console.log(data);
        if (data.status === 200) {
            form.setFieldsValue({
                id: data.result._id,
                age: data.result.age,
                name: data.result.name,
                email: data.result.email
            })
        }
    };

    useEffect(() => {
        handleData();
    }, []);

    return (
        <div>
            <h1>회원 정보 변경</h1>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="아이디"
                    name="id"
                    rules={[{ required: true, message: '나이를 입력하세요!' }]}
                >
                    <Input disabled />
                </Form.Item>


                <Form.Item
                    label="나이"
                    name="age"
                    rules={[{ required: true, message: '나이를 입력하세요!' }]}
                >
                    <InputNumber min={0} max={150} />
                </Form.Item>

                <Form.Item
                    label="이름"
                    name="name"
                    rules={[{ required: true, message: '이름을 입력하세요!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="이메일"
                    name="email"
                    rules={[{ required: true, message: '이메일을 입력하세요!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        정보 변경
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MemberUpdate;