import { useState } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';



import Navbar from './components/navbar.jsx'
import Home from './components/home.jsx'
import Register from './components/Register.jsx';
import Footer from './components/footer.jsx';
import Edit from './components/edit.jsx';
import Details from './components/details.jsx';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/edit/:id" element={<Edit />} />
        <Route exact path="/view/:id" element={<Details />} />
        
      </Routes>
      <Footer />
    </>
  )
}

export default App
