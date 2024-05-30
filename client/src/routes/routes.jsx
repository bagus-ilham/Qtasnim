// routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SidebarWithHeader from '../components/SiderbarHeader';
import Home from '../pages/Home';
// import Trending from './pages/Trending';
// import Explore from './pages/Explore';
// import Favorites from './pages/Favorites';
// import Settings from './pages/Settings';
import Login from '../pages/Login'
import Register from '../pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path='/' element={<Home />} />
        {/* <Route path="trending" element={<Trending />} />
        <Route path="explore" element={<Explore />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="settings" element={<Settings />} /> */}
    </Routes>
  );
};

export default AppRoutes;