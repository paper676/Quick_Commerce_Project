import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/UserLogdinNavbar.jsx';
import Footer from '../../components/Footer/footer';
import {Toaster} from 'react-hot-toast';
function UserPage() {
  return (
    <div>
      <Toaster/>
      <Navbar/>
      <Outlet /> 
      <Footer/> 
    </div>
  )
}

export default UserPage