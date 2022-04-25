import React, { useContext, useEffect, useState } from 'react'
import LoginContext from '../context/LoginContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db,{ app } from '../firebase'
import { Button } from '@mui/material';
import { doc, collection, setDoc } from 'firebase/firestore';


const ImageUploader = () => {

    const { userProvider, setUserProvider } = useContext(LoginContext);

    const [ imageFile, setImageFile ] = useState({});


    const inputSendImage = (e) => {
        const imgRef = e.target.files[0]
        setImageFile( imgRef )

    }

    const sendImage = () => {
        const strge = getStorage(app);
        const strgeageRef = ref(strge, `profilePictures/${imageFile.name}`);
        
        uploadBytes(strgeageRef, imageFile).then((snapshot) => {
            console.log('Correctamente subido');
            getURL();   
            
        });

        

    }

    const getURL = () =>{

        const strge = getStorage(app);
        const strgeageRef = ref(strge, `/profilePictures/${imageFile.name}`);

        getDownloadURL(strgeageRef).then((url)=>{
            const userURL = { ...userProvider.buyer, image:url }

            setUserProvider({
                ...userProvider,
                buyer: userURL
            })


            const userWithImage = { 
                name:userProvider.name,
                mail:userProvider.mail,
                image:url,
            }
            
            userRegister(userURL.mail,userURL)
           
        })

        
    }

    const userRegister = async( userId, userData ) => {
        const userCollection = collection(db,'users');
        const userDoc = doc( db, 'users', userId )
        const addUserToFirestore = await setDoc( userDoc, userData )
        console.log('registro etsitoso')
      }

    const mostrar = () => {


        console.log(userProvider)
    }
  return (
    <>
        <input type='file' accept='.jpeg,.jpg,.svg,.png' placeholder='Subir imagen' name='image' onChange={ inputSendImage }  />
        <Button onClick={sendImage}>
            Enviar
        </Button>

        <Button onClick={mostrar}>
            Mostrar
        </Button>
    </>
  )
}

export default ImageUploader;