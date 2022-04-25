import { Button } from '@mui/material'
import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import '../firebase'

const UserSgnOut = () => {

    const userSignOut =  () => {
        const auth = getAuth()
        signOut(auth).then(()=>{
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