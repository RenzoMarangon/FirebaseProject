import React,{ useState, useContext, useEffect } from 'react'
import { Button } from '@mui/material'
import db from '../firebase'
import { GoogleAuthProvider, getAuth, signInWithPopup  } from "firebase/auth";
import LoginContext from '../context/LoginContext';

const Login = () => {

    const { userProvider, setUserProvider } = useContext(LoginContext);



    const googleAuth = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup( auth, provider )
        .then(( result ) =>{
          
          const { email, displayName, photoURL } = result.user

        })
    }

    

    const moxtrar = () => {
      console.log(userProvider)
    }


  return (
    <>
      <div>Login</div>
      <Button onClick={ googleAuth }>Acceder</Button>
      <Button onClick={ moxtrar }>Acceder</Button>
    </>
    

  )
}

export default Login;