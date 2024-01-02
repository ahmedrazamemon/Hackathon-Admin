import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {getStorage} from'firebase/storage'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBWbYrHAUPTzzQfN7AJU8jm11z6qYgGz8I",
    authDomain: "myapp-cc562.firebaseapp.com",
    databaseURL: "https://myapp-cc562-default-rtdb.firebaseio.com",
    projectId: "myapp-cc562",
    storageBucket: "myapp-cc562.appspot.com",
    messagingSenderId: "245930277647",
    appId: "1:245930277647:web:c76ccc546dbb5d57e65c7a"
  
// Paste the configuration object from your Firebase project here
};const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app);

export {db,storage,auth}