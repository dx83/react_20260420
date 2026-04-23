import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu as AntdMenu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import store from '../store';
import { useSelector } from 'react-redux';

const Menu = () => {
    let items = [];

    const { logged } = useSelector((store) => store.LoggedReducer);

    if (logged === 0) { // 로그아웃 상태
        items = [
            {
                label: '홈',
                key: '/home',
                icon: <AppstoreOutlined />,
            },
            {
                label: '게시판',
                key: '/board',
                icon: <MailOutlined />,
            },
            {
                label: '판매자',
                key: '/seller',
                icon: <MailOutlined />,
            },
            {
                label: '로그인',
                key: '/login',
                icon: <SettingOutlined />,
            },
            {
                label: '회원가입',
                key: '/register',
                icon: <MailOutlined />,
            },
        ];
    }
    else {  // 로그인 상태
        items = [
            {
                label: '홈',
                key: '/home',
                icon: <AppstoreOutlined />,
            },
            {
                label: '게시판',
                key: '/board',
                icon: <MailOutlined />,
            },
            {
                label: '판매자',
                key: '/seller',
                icon: <MailOutlined />,
            },
            {
                label: '로그아웃',
                key: '/logout',
                icon: <SettingOutlined />,
            },
            {
                label: '마이페이지',
                key: '/mypage',
                icon: <AppstoreOutlined />,
            },
        ];
    }

    const location = useLocation(); // f5 새로고침 시 현재 경로를 가져오기 위해 useLocation 사용
    const navigate = useNavigate();

    const selectedKey = location.pathname === '/' ? '/home' : location.pathname; // 루트 경로는 홈으로 간주

    const [current, setCurrent] = useState(selectedKey);

    const onClick = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    }

    return (
        <div>
            <h3>메뉴</h3>
            <AntdMenu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </div>
    );
};

export default Menu;