import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Monitores from './components/Monitores';
import Monitoring from './components/Monitoring';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/monitores' element={<Monitores />} />
      <Route path='/monitoring' element={<Monitoring />} />
      <Route path='/exit' element={<Login signOff={true} />} />
    </Routes>
  </BrowserRouter>
);

