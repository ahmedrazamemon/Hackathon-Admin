import React, { useState } from 'react';
import { auth,createUserWithEmailAndPassword } from '../Config/firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import Eye and EyeSlash icons
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MyImage from '../Assets/smit.jpg'
function Main() {
  const navigate = useNavigate()
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
 
  const handleSignup = async () => {
    signInWithEmailAndPassword(auth, email, password)
   
      .then(() => {
        localStorage.setItem("email", email);
        toast.success("Signin", {
          theme:"dark",
          position: "top-right",
          autoClose: 1000
        })
        // setIsAuthenticating(false);
        navigate("/Home", { replace: true });
      })
      .catch((e) => {
        toast.error(e.code, {
          theme:"dark",
          position: "top-right",
          autoClose: 1000
        }); // setIsAuthenticating(false);
      
      });}
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',background:"white",height:"100%" }}>
      <img src={MyImage} alt="" />
      <div style={{ width: '300px', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Login</h2>
        {/* <form> */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', color: '#555' }}>Username:</label>
            <input type="text" id="username" name="username" onChange={(e)=>setemail(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} required />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#555' }}>
              Password:
              {showPassword ? (
                <FaEyeSlash onClick={handleTogglePassword} style={{ cursor: 'pointer' }} />
              ) : (
                <FaEye onClick={handleTogglePassword} style={{ cursor: 'pointer' }} />
              )}
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              onChange={(e)=>setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }} onClick={()=>handleSignup()}>Login</button>
          </div>
        {/* </form> */}
      </div>
      
    </div>
  );
};

export default Main;