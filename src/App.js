import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Menu from './components/Menu';
import Board from './components/Board';
import BoardWrite from './components/BoardWrite';
import BoardView from './components/BoardView';
import BoardUpdate from './components/BoardUpdate';
import Seller from './components/Seller';
import ItemInsert from './components/ItemInsert';
import ItemView from './components/ItemView';
import Register from './components/Register';
import ItemUpdate from './components/ItemUpdate';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import Logout from './components/Logout';
import Mypage from './components/Mypage';
import MemberUpdate from './components/mypage/MemberUpdate';
import MemberPassword from './components/mypage/MemberPassword';
import MemberDelete from './components/mypage/MemberDelete';
import Chat from './components/Chat';

const App = () => {

  const { logged, token, counter } = useSelector((state) => state.LoggedReducer);

  const handleClick = () => {
    alert("버튼이 클릭됨");
  }

  return (
    <div className="App">
      <p>로그인 상태 : {logged}</p>
      <p>토큰 : {token}</p>
      <p>카운터 : {counter}</p>
      <hr />

      <Menu />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        {/*<Route path="/" element={<Home />} />*/}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/board/view" element={<BoardView />} />
        <Route path="/board/update" element={<BoardUpdate />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/seller/iteminsert" element={<ItemInsert />} />
        <Route path="/seller/view" element={<ItemView />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller/itemupdate" element={<ItemUpdate />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/mypage" element={<Mypage />}>
          <Route path="update" element={<MemberUpdate />} />
          <Route path="password" element={<MemberPassword />} />
          <Route path="delete" element={<MemberDelete />} />
        </Route>
        <Route path="/chat" element={<Chat />} />
      </Routes>

      <Footer title="footer" copyright="@2026 copyright" handleClick={handleClick} />
    </div>
  );
};

export default App;