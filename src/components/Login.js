import React,{ useState, useContext, useEffect } from 'react'
import { Button } from '@mui/material'
import db from '../firebase'
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut, signInWithRedirect } from "firebase/auth";
import LoginContext from '../context/LoginContext';
import { addDoc, collection, setDoc, doc, getDocs, getDoc } from "firebase/firestore";

const Login = () => {


    const [ userID, setUserID ] = useState('');

    const [ buyerData, setBuyerData ] = useState({
      mail:'',
      name:'',
      image:'',
    });

    const { userProvider, setUserProvider } = useContext(LoginContext);

    useEffect(()=>{
      // isUserRegister('asd') ? console.log('si esta') : console.log('no esta')
      isUserRegister('YlDZ6J22bSbSEcZJP2x3fCzC8pr1')
    },[buyerData])

    const googleAuth = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup( auth, provider )
        .then(( result ) =>{
          
          const { email, displayName, photoURL } = result.user

          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // const user = result.user;

          setBuyerData({
            mail:email,
            name:displayName,
            image:photoURL
          })




        })
    }

    const mostrarUsuario = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
             setUserID(user.uid);
        } else {
        }
      });
    }

    const salirDeLaCuenta = () =>{
      const auth = getAuth();
      {
        mostrarUsuario && (
          signOut(auth).then(() => {
            console.log('Se fue de la cuenta')
          }).catch((error) => {
            // An error happened.
          })
        )
      }
    }

    
    const registerUsers = async(id,object) =>{

      const fireStore = collection(db, "users");
      const addToFirestore = await setDoc(doc(db,"users",id),
      object
      )}

    const mostrar = () =>{
      setBuyerData({name:'negro'});
    }

    const isUserRegister = async(id) => {

      let isIn = false;
      const docRef = doc(db, "users", id);
      const docSnapShot = await getDoc(docRef);
      docSnapShot!='undefined' ? (isIn = true) : (isIn = false);
    
      console.log(docSnapShot)
    }

  return (
    <>
      <div>Login</div>
      <Button onClick={ googleAuth }>Acceder</Button>
      <Button onClick={ mostrar }>Mostrar</Button>
      <Button onClick={ salirDeLaCuenta }>Salir</Button>
    </>
    

  )
}

export default Login;