import { Button, Form, Input } from 'antd';
import React from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const MemberPassword = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('Success:', values);
        const url = '/member/updatepw.json';
        const { data } = await api.put(url, values);
        console.log(data);
        if (data.status === 200) {
            alert('비밀번호가 변경되었습니다.');
            navigate('/mypage');
        }
    }

    return (
        <div>
            <h1>비밀번호 변경</h1>
            <Form
                form={form}
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    label="현재 비밀번호"
                    name="password"
                    rules={[{ required: true, message: '현재 비밀번호를 입력하세요!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="새 비밀번호"
                    name="password1"
                    rules={[{ required: true, message: '새 비밀번호를 입력하세요!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="새 비밀번호 확인"
                    name="confirmPassword"
                    dependencies={['password1']}
                    rules={[{ required: true, message: '비밀번호를 확인하세요!' },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password1') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('비밀번호가 일치하지 않습니다!'));
                            }
                        })
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        비밀번호 변경
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MemberPassword;