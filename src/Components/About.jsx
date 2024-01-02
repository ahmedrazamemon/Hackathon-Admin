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
import { AiOutlineDelete } from 'react-icons/ai';
import { LuPencil } from 'react-icons/lu';
const Policy = () => {
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
    await addDoc(collection(db, 'About'), {
      title: item,
      description,
      created: Timestamp.now(),
    });
  };

  const updateTask = async () => {
    const taskDocRef = doc(db, 'About', updatingTaskId);
    await updateDoc(taskDocRef, {
      title: item,
      description,
    });
  };

  const handleDelete = async (taskId) => {
    try {
      setLoading(true);

      const taskDocRef = doc(db, 'About', taskId);
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
    const q = query(collection(db, 'About'), orderBy('created', 'desc'));
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '600px' }}>
          <div style={{ borderColor:"rgb(166, 233, 139)",border:"2px solid", width: '600px', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>{updatingTaskId ? 'Update' : 'Add'} &nbsp;About Saylani</h2>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', color: '#555' }}>
                About
              </label>
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                id="username"
                name="username"
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <textarea
                name=""
                id=""
                cols="78"
                rows="10"
                placeholder="Add Some Description"
                onChange={(e) => setdescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <button
                type="submit"
                onClick={handleAddOrUpdate}
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
                {updatingTaskId ? 'Update' : 'Add'}+
              </button>
            </div>
          </div>
        </div>
        <div>
          {tasks.map((v) => (
            <div key={v.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:20 }}>
              <div style={{ width: '460px', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <div>
                  <h4 style={{fontSize:30,borderBottom:"2px solid",textAlign:"center"}}>{v.data.title}</h4>
                  <p>{v.data.description}</p>
                  <div style={{display:"flex",justifyContent:"space-between"}}>

<button onClick={() => handleUpdateClick(v.id)} style={{backgroundColor:"green"}}><LuPencil/></button>
  <button onClick={() => handleDelete(v.id)} style={{backgroundColor:"red"}}><AiOutlineDelete/></button>
</div>
</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policy;
