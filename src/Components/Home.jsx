import React, { useState, useEffect } from 'react';
import{LuPencil} from 'react-icons/lu'
import { AiOutlineDelete } from "react-icons/ai";
import {
  addDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../Config/firebase';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';
import { storage } from '../Config/firebase';
import { toast } from 'react-toastify';
// import '../App.css';
import Sidebar from './Sidebar';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [item, setItem] = useState('');
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(item==""&&file==null){
        toast.error('Please Fill all fields', {
          theme: 'dark',
          position: 'top-right',
          autoClose: 1000,
        });
      }
      else{

        await addDoc(collection(db, 'tasks'), {
          title: item,
          img: file,
          created: Timestamp.now(),
        });
        toast.success('Added', {
          theme: 'dark',
          position: 'top-right',
          autoClose: 1000,
        });
        setItem('');
        setFile(null);
      }
      } catch (err) {
        alert(err);
      }
  };

  const handleUpdate = async () => {
    if (!updatingTaskId) {
      alert('Please select a task to update.');
      return;
    }

    const taskDocRef = doc(db, 'tasks', updatingTaskId);
    try {
      await updateDoc(taskDocRef, {
        title: item,
      });
      toast.success('Updated', {
        theme: 'dark',
        position: 'top-right',
        autoClose: 1000,
      });
      setItem('');
      setFile(null)
      setUpdatingTaskId(null);
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async (taskId) => {
    const taskDocRef = doc(db, 'tasks', taskId);
    try {
      await deleteDoc(taskDocRef);
      toast.success('Deleted', {
        theme: 'dark',
        position: 'top-right',
        autoClose: 1000,
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleUpdateClick = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    setItem(taskToUpdate.data.title);
    setUpdatingTaskId(taskId);
  };

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('created', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // ImageUpload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const storageRef = sRef(storage, `imagesfiles/${file.name}`);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log(url);
            setFile(url);

            toast.success('Uploaded', {
              theme: 'dark',
              position: 'top-right',
              autoClose: 1000,
            });
          })
          .catch((e) => {});
      })
      .catch((e) => {});
  };

  return (
    <div>
      <Sidebar/>
      <div>
        <h1 className="header">Saylani Admin Panel</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
          <div style={{ width: '600px', padding: '20px', border:"2px solid", borderColor:"rgb(166, 233, 139)",borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Add Data</h2>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', color: '#555' }}>
                Title
              </label>
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                id="username"
                name="username"
                style={{
                  width: '100%',
                  padding: '8px',
                  boxSizing: 'border-box',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input type="file" onChange={(e) => handleUpload(e)} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <button
                type="submit"
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#3498db',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                Add+
              </button>
            </div>
          </div>
        </div>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',margin:20}}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:40 }}>
          <div className="">
            {tasks.length === 0 ? (
              <img
                style={{ height: '900px' }}
                src={'https://cdn.dribbble.com/users/2077073/screenshots/6005120/loadin_gif.gif'}
                alt="an image"
              />
            ) : (
              tasks.map((v, i) => (
               
                  <div>
               <div key={v.id} style={{width:500+"px",height:"auto",marginTop:20,border:"2px",borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>

                  <h5 style={{textAlign:"center",fontFamily:"initial",borderBottom:"1px solid",fontSize:30}}>
                    {v.data.title}
                  </h5>
                  <img src={v.data.img} style={{ width: '500px', height: '300px',backgroundSize:"cover"}} alt="" />
                  <div style={{ display: 'flex',padding:10, alignItems: 'center', justifyContent: 'space-between', marginTop:40 }}>
                    <button onClick={() => handleUpdateClick(v.id)} style={{backgroundColor:"green"}}><LuPencil/></button>
                    <button onClick={() => handleDelete(v.id)} style={{backgroundColor:"red"}}><AiOutlineDelete/></button>
                  </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
</div>

  );
};

export default Home;
