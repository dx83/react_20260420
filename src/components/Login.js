import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const onFinish = async (values) => {
        const url = `/api/member/login.json`;
        const { data } = await axios.post(url, values);
        console.log(data);
        if (data.status === 200) {
            alert('로그인 성공');
            navigate('/home');
        }
    }

    // px08 / 1234
    return (
        <div>
            <h3>로그인</h3>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label='아이디'
                    name="id"
                    rules={[{ required: true, message: '아이디를 입력하세요' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='암호'
                    name="password"
                    rules={[{ required: true, message: '암호를 입력하세요' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        로그인
                    </Button>
                </Form.Item>
            </Form>

        </div>
    );
};

export default Login;