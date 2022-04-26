import React, { useContext, useEffect, useState } from 'react'
import db,{ app } from '../firebase'
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged  } from "firebase/auth";
import LoginContext from '../context/LoginContext';
import { getDocs, doc, collection, setDoc, query, where,  } from "firebase/firestore"
import { Button } from '@mui/material';


const UserLoginGoogle = () => {

    const { userProvider, setUserProvider } = useContext(LoginContext);

    /*Si se loguea con google, userMatch pasa a true y llama al useEffect*/
    const [ userMatch, setUserMatch ] = useState( true );

    useEffect(()=>{

      const mail = userProvider.buyer.mail;
      /*Pregunto si el usuario existe en la base de datos, si no existe lo crea*/
      console.log(userMatch)

      if(userMatch == false){
       userRegister( mail, userProvider.buyer );
       console.log('registro exitoso')
      }
 

    },[userMatch]);

    const googleAuth = async() => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup( auth, provider )
        .then(( result ) =>{
          const { email, displayName, photoURL } = result.user
          const us = {
            name:displayName,
            mail:email,
            image:photoURL,
          }

          setUserProvider({
            ...userProvider,
            buyer: us,
          })

          userExist(email);

        })
    }   


    const userRegister = async( userId, userData ) => {
        const userCollection = collection(db,'users');
        const userDoc = doc( db, 'users', userId )
        const addUserToFirestore = await setDoc( userDoc, userData )
        console.log('registro etsitoso')
      }
  
    const userExist = async( id ) =>{
        const usersColl = collection(db,'users')
        const q = query(usersColl, where('mail', '==', id));
        const getUsers = await getDocs( q );
        
        setUserMatch(false);
        getUsers.docs.map(( user )=>{
          user.id == id && setUserMatch(true);
        })
        

    }


  return (
      <>
      <Button onClick={ googleAuth }> Ingresar con Google </Button>
      </>
  )
}

export default UserLoginGoogle