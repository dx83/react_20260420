import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';

const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOk = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/home', { replace: true });   // 뒤로가기로 로그아웃창 뜨지 않게.
    }

    const handleCancel = () => {
        navigate('/home', { replace: true });
    }

    useEffect(() => {

    }, []);

    return (
        <div>
            <Modal
                open={true}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="로그아웃"
                cancelText="취소"
                mask={{ closable: false, blur: true }} // 창 밖 클릭 방지, 배경 블러 효과
            >
                <p>로그아웃 하시겠습니까?</p>
            </Modal>
        </div>
    );
};

export default Logout;