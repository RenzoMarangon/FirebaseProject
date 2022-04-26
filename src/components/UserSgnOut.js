import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import '../firebase'
import LoginContext from '../context/LoginContext';

const UserSgnOut = () => {

    const { userProvider, setUserProvider } = useContext(LoginContext);

    const userSignOut =  () => {
        const auth = getAuth()
        signOut(auth).then(()=>{
          
          setUserProvider(null)
          console.log('Mostrar el inicio');
        }).catch(( error ) => {
          console.log( error )
        })
      }

      

  return (
    <div className='userSignOut-container'>
        <Button onClick={ userSignOut } > 
            Salir
        </Button>
    </div>
  )
}

export default UserSgnOut