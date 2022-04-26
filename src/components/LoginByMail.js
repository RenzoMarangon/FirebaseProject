import React,{ useState, useContext } from 'react'
import { signInWithEmailAndPassword, getAuth,  } from 'firebase/auth'
import { where, query, collection, getDocs } from 'firebase/firestore';
import { Button } from '@mui/material';
import db,{ app } from '../firebase';
import LoginContext from '../context/LoginContext';

const LoginByMail = () => {


    const { userProvider, setUserProvider } = useContext(LoginContext);

    const [ inputValue, setInputValue ] = useState({
        name:'',
        mail:'',
        image:'',
        password:''
      });

    const userLoginByMail    = (e) => {

        e.preventDefault();
  
        const email = inputValue.mail;
        const password = inputValue.password;

        const auth = getAuth(app);
  
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            // Signed in
            userExist( email )

            
        

          })
          .catch((error) => {
            console.log(error.code)
            console.log(error.message)
          });
    }

    const userExist = async( id ) =>{
        const usersColl = collection(db,'users')
        const q = query(usersColl, where('mail', '==', id));
        const getUsers = await getDocs( q );
        
        
        getUsers.docs.map(( user )=>{

            user.id == id && (
                
                setUserProvider({
                    name:user.data().name,
                    mail:user.data().mail
                })
            );
        })
    }

    const inputEnter = (e) => {
        const { name, value } = e.target;
        setInputValue({
          ...inputValue,
          [name]:value,
        })
      }

  return (
    <>
        <form onSubmit={ userLoginByMail } >
            <input type='email' placeholder='Mail' name='mail' onChange={inputEnter} value={inputValue.mail} />
            <input type='password' placeholder='Password' name='password' onChange={inputEnter} value={inputValue.password} />
            <Button type='submit'>
                Iniciar Sesión
            </Button>
      </form>
    </>
  )
}

export default LoginByMail