import React from "react";
import { Route, Routes } from "react-router-dom";
import { push } from "firebase/database";
import Home from "../Components/Home";
import AllUsers from "../Components/About";
import Images from "../Components/SliderImages";
import Policy from "../Components/PrivacyPolicy";
import Video from "../Components/SliderImages";
import Splash from '../Components/Splash'
import Conditions from "../Components/Terms";
import Videolink from "../Components/SliderImages";
import Requests from "../Components/Requests";
function Navigation(){

    return(
        
        <Routes>
            <Route path="/" element={<Splash/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/About" element={<AllUsers/>}/>
            <Route path="/Terms" element={<Conditions/>}/>
            <Route path="/Policy" element={<Policy/>}/>
            <Route path="/Video" element={<Videolink/>}/>
           
            <Route path="/Requests" element={<Requests/>}/>
        </Routes>
        
        
    )
}export default Navigation;