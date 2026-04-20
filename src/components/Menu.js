import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu as AntdMenu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// 메뉴 항목
const items = [
    {
        label: '홈',
        key: '/home',
        icon: <AppstoreOutlined />,
    },
    {
        label: '로그인',
        key: '/login',
        icon: <SettingOutlined />,
    },
    {
        label: '게시판',
        key: '/board',
        icon: <MailOutlined />,
    },
]

const Menu = () => {
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