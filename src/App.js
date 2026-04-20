import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Menu from './components/Menu';
import Board from './components/Board';
import BoardWrite from './components/BoardWrite';

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
      </Routes>
    </div>
  );
};

export default App;