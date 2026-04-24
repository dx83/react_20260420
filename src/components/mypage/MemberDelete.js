import React, { use, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';

const MemberDelete = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const url = '/member/delete.json';
        const body = { password: values.password };
        const { data } = await api.delete(url, { data: body });
        console.log(data);
        if (data.status === 200) {
            if (window.confirm('회원 탈퇴하시겠습니까?')) {
                dispatch({ type: "LOGOUT" });
                alert('회원 탈퇴가 완료되었습니다.');
                navigate('/home', { replace: true });
            }
            else {
                navigate('/mypage');
            }
        }
        else {
            alert('비밀번호가 틀립니다!');
        }
    }

    return (
        <div>
            <h1>회원 탈퇴</h1>
            <Form
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    label='비밀번호'
                    name='password'
                    rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type='primary' htmlType='submit'>
                        회원 탈퇴
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default MemberDelete;