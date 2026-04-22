import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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

const App = () => {
  return (
    <div className="App">
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

      </Routes>
    </div>
  );
};

export default App;