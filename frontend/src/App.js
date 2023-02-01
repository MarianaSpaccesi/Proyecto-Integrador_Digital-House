
import './App.css';
import './custom.scss';
import Header from './components/header/Header.js';
import Footer from './components/footer/Footer.js';
import { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Products from './components/product/Products';
import Booking from './components/booking/Booking';
import SuccessBooking from './components/booking/SuccessBooking';
import NotFound from './components/notfound/NotFound';
import Admin from './components/admin/Admin';
import AdminSuccess from './components/admin/AdminSuccess'
import ProductSearch from './components/productSearch/ProductSearch';


function App() {
  const [logged, setLogged] = useState(false);

  const handleLogin = (bool) =>{
    setLogged(bool);
  }

  useEffect(() => {
    if (sessionStorage.getItem("user") === 'logged') {
        setLogged(true);
    } else {
        setLogged(false);
      }
  }, []);


  return (
    <div className="App">
      <Header props={logged} handleLogin={handleLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<Products />} />
          <Route path="/booking/:id" element={<Booking />}/>
          <Route path="/successBooking" element={<SuccessBooking />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/success" element={<AdminSuccess />} />
          <Route path="/results" element={<ProductSearch />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;