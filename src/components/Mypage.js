import { Button } from 'antd';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Mypage = () => {
    return (
        <div>
            <h1>마이페이지</h1>
            <hr />
            <Link to='/mypage/update'><Button size="small" style={{ marginLeft: '10px' }} color="cyan" variant="solid">회원정보 변경</Button></Link>
            <Link to='/mypage/password'><Button size="small" style={{ marginLeft: '10px' }} color="cyan" variant="solid">비밀번호 변경</Button></Link>
            <Link to='/mypage/delete'><Button size="small" style={{ marginLeft: '10px' }} color="pink" variant="solid">회원 탈퇴</Button></Link>

            <Outlet /> {/* 마이페이지에 하위 라우터가 존재할 때, 해당 컴포넌트를 보여주는 역할 */}
        </div>
    );
};

export default Mypage;