import React,{ useState, useContext, useEffect } from 'react'
import { Button } from '@mui/material'
import db,{ app } from '../firebase'
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, updateProfile, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import LoginContext from '../context/LoginContext';
import { getDocs, doc, collection, setDoc, onSnapshot  } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Login = () => {

    const [ inputValue, setInputValue ] = useState({
      name:'',
      mail:'',
      image:'',
      password:''
    });

    const  [ currentUser, setCurrentUser ] = useState({})

    const { userProvider, setUserProvider } = useContext(LoginContext);

    const [ userData, setUserData ] = useState({
      name:'',
      mail:'',
      image:'',
    })

    useEffect(()=>{
      userExist('elbrbr@gmail.com')

    },[currentUser])

    const googleAuth = () => {
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
          console.log(us)

          userExist(email) && userRegister( email, us )
        })
    }


    const userLoginByMail    = (e) => {

      e.preventDefault();

      const email = inputValue.mail;
      const password = inputValue.password;
      const auth = getAuth(app);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user.providerData[0])
        })
        .catch((error) => {
          console.log(error.code)
          console.log(error.message)
        });
  }

    const mostrarUsuario = () => {
      const auth = getAuth()
      onAuthStateChanged( auth, ( user ) => {
        user ? (console.log(`usuario ${user.uid}`)
        ) : (
          (alert('No se inicio sesion'))
        )
      })
    }

    const actualizarUsuario = () => {
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: "Groiaco", photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
        alert('Actualizacion etsitosa')
      }).catch((error) => {
        alert('Aprende a actualizar flaco')
      });
    }



    const userRegister = async( userId, userData ) => {
      const userCollection = collection(db,'users');
      const userDoc = doc( db, 'users', userId )
      const addUserToFirestore = await setDoc( userDoc, userData )
      console.log('registro etsitoso')
    }

    const userExist = async( id ) =>{

      const userDoc = collection(db, "users");
      
      const userData = await getDocs(userDoc);
      
      const userFilter = userData.docs.filter( userId => userId.data().mail == id )
      // userData.docs.map(( usdat ) => {
      //   console.log(usdat.data().mail);
      // })
      let isRegister = false;
      userFilter.length > 0 ? isRegister = true : isRegister = false;
      return isRegister;

    }


    const mostrar = () => {
      const ob = {
        name:'chchcich',
        mail:'chchcich@gmail.com',
        image:'chchcich.jpg'
      }
      
      userRegister(ob.mail,ob)

      setCurrentUser(ob);
      
    }

    const inputSendImage = async(e) => {
      const imgRef = e.target.files[0]

      const strge = getStorage(app);
      const strgeageRef = ref(strge, `/profilePictures/${inputValue.name}`);
      
      uploadBytes(strgeageRef, imgRef).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        
      });

      getDownloadURL(strgeageRef).then((url)=>{
        setInputValue({
          ...inputValue,
          image:url,
        })
      })
    }

    const inputEnter = (e) => {
      const { name, value } = e.target;
      setInputValue({
        ...inputValue,
        [name]:value,
      })
    }

    const mox = () =>{
      console.log(inputValue)
    }
    
  return (
    <>
    
      <div>Login</div>
      <Button onClick={ googleAuth }> Acceder por google </Button>
      <Button onClick={ mox }> Mostrar </Button>

      

      <form onSubmit={ userLoginByMail } >
        <input type='email' placeholder='Mail' name='mail' onChange={inputEnter} value={inputValue.mail} />
        <input type='password' placeholder='Password' name='password' onChange={inputEnter} value={inputValue.password} />
        <Button type='submit'>
          Iniciar Sesión
        </Button>
      </form>


      <form  >
        <input type='file' accept='.png,.jpeg,.jpg,.svg' placeholder='image' name='image' onChange={inputSendImage}  />
        <Button type='submit'>
          Iniciar Sesión
        </Button>
      </form>

      <img src={`${inputValue.image}`} />
    </>
    

  )
}

export default Login;