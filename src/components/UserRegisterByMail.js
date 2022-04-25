import React,{ useState,  } from 'react'
import db,{ app } from '../firebase';
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, userRegByMail  } from 'firebase/auth';
import LoginContext from '../context/LoginContext';
import { Button } from '@mui/material';
import { doc, setDoc, collection } from 'firebase/firestore';

const UserRegisterByMail = () => {

    const [ inputValue, setInputValue ] = useState({
        name:'',
        mail:'',
        image:'',
        password:''
      });

    const userRegByMail = (e) => {
        e.preventDefault();
  
        const email = inputValue.mail;
        const password = inputValue.password;
        const auth = getAuth(app);
  
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            
            const user = userCredential.user;
            console.log(user)
          })
          .catch((error) => {
            console.log(error.code)
            console.log(error.message)
          });
  
  
          const usr = {
            name:inputValue.name,
            mail:inputValue.mail,
            image:''
           }
           
          userRegister(inputValue.mail,usr)
      }

      const userRegister = async( userId, userData ) => {
        const userCollection = collection(db,'users');
        const userDoc = doc( db, 'users', userId )
        const addUserToFirestore = await setDoc( userDoc, userData )
        console.log('registro etsitoso')
      }



    

    const inputEnter = (e) => {
        const { name, value } = e.target;
        setInputValue({
          ...inputValue,
          [name]:value,
        })
    }
  

  return (
    <form onSubmit={ userRegByMail } className='userRegisterByMail' >
        <input type='text' placeholder='Nombre' name='name' onChange={inputEnter} value={inputValue.name} />
        <input type='email' placeholder='Mail' name='mail' onChange={inputEnter} value={inputValue.mail} />
        <input type='password' placeholder='Password' name='password' onChange={inputEnter} value={inputValue.password} />
        <Button type='submit'>
          Registrarse
        </Button>
    </form>
  )
}

export default UserRegisterByMail