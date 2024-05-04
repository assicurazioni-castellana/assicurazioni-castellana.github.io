// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRQtY-PL1Ght6j7IYHcYqXDCpKLZO8U84",
  authDomain: "assicurazioni-castellana-80513.firebaseapp.com",
  projectId: "assicurazioni-castellana-80513",
  storageBucket: "assicurazioni-castellana-80513.appspot.com",
  messagingSenderId: "116840708464",
  appId: "1:116840708464:web:6c156c929046d67193f7b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();


const addConsent=async (data)=>{
    try {
        await signInWithEmailAndPassword(auth, "sito.assicurazioni.castellana@gmail.com", "sito.assicurazione.castellana")

        const docRef = await addDoc(collection(db, "consents"), data);
        return true
      } catch (e) {
        return false
      }    
}

export default addConsent;