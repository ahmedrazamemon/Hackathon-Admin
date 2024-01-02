// Sidebar.js

import React, { useState } from 'react';
import './Sidebar.css'; // You can style your sidebar in a separate CSS file
import Navigation from '../Config/Navigation';
import { IoMdMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
// import {Fill} from 'reac'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      Saylani Welfare
      <button onClick={toggleSidebar} style={{marginLeft:234,fontSize:15}}><IoMdMenu/></button>
      <ul>
      {/* <Link to={"/"}>
        <li>About</li>
        </Link> */}
        <Link to={"/Home"}>
        <li>Home</li>
        </Link>
        <Link to={"/Video"}>
        <li>Video</li>
        </Link>
        <Link to={"/About"}>
        <li>About</li>
        </Link>
        <Link to={"/Policy"}>
        <li>Privacy Policy</li>
        </Link>
        <Link to={"/Terms"}>
        <li>Terms</li>
        </Link>
        <Link to={"/Requests"}>
        <li>Requests</li>
        </Link>
        
        <Link to={"/"}>
        <li>Logout</li>
        </Link>
        
      </ul>
      {/* <Navigation/> */}
    </div>

  );
};

export default Sidebar;
