import React, { useState, useEffect } from 'react';
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
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import {LuPencil} from 'react-icons/lu'
import { AiOutlineDelete } from 'react-icons/ai';
import '.././App.css'
const Video = () => {
  const [tasks, setTasks] = useState([]);
  const [item, setItem] = useState('');
  const [description, setdescription] = useState('');
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const handleAddOrUpdate = async () => {
    try {
      setLoading(true);

      if (!item.trim() || !description.trim()) {
        toast.error('Please add data', {
          theme: 'dark',
          position: 'top-right',
          autoClose: 1000,
        });
        return;
      }

      if (updatingTaskId) {
        await updateTask();
      } else {
        await addTask();
      }

      toast.success(updatingTaskId ? 'Updated' : 'Added', {
        theme: 'dark',
        position: 'top-right',
        autoClose: 1000,
      });

      setItem('');
      setdescription('');
      setUpdatingTaskId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    await addDoc(collection(db, 'Help'), {
      title: item,
      description,
      created: Timestamp.now(),
    });
  };

  const updateTask = async () => {
    const taskDocRef = doc(db, 'Help', updatingTaskId);
    await updateDoc(taskDocRef, {
      title: item,
      description,
    });
  };

  const handleDelete = async (taskId) => {
    try {
      setLoading(true);

      const taskDocRef = doc(db, 'Help', taskId);
      await deleteDoc(taskDocRef);

      toast.success('Deleted', {
        theme: 'dark',
        position: 'top-right',
        autoClose: 1000,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    setItem(taskToUpdate.data.title);
    setdescription(taskToUpdate.data.description);
    setUpdatingTaskId(taskId);
  };

  useEffect(() => {
    const q = query(collection(db, 'Help'), orderBy('created', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);



  return (
    <div>
      <Sidebar/>
      <div>
        <h1 className="header">Saylani Admin Panel</h1>
        <div>
          {tasks.map((v,i) => (
            console.log(v)
            // <div key={v.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:80 }}>
            //   <div style={{ width: '500px', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            //     <div>
            //   <b>{i+1}</b>
            //       <h2>Doner Name:<br/> {v.data.useremail}</h2>
            //       <b >{v.data.username}</b>
            //       <h4>Title:{v.data.donation}</h4>
            //       <div style={{display:"flex",justifyContent:"space-between"}}>

            //       <button onClick={() => handleUpdateClick(v.id)} style={{backgroundColor:"green"}}><LuPencil/></button>
            //         <button onClick={() => handleDelete(v.id)} style={{backgroundColor:"red"}}><AiOutlineDelete/></button>
            //       </div>
            //       </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
