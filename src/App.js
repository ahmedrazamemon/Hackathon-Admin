import React from "react";
import Navigation from "./Config/Navigation";
import Sidebar from "./Components/Sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
function App() {
  return (
<div className="body">

<Navigation/>
<ToastContainer/>
{/* <Sidebar/> */}
</div>

    );
}

export default App;
