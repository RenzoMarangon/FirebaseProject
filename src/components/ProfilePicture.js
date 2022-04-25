import React,{ useContext } from 'react'
import LoginContext from '../context/LoginContext';


const ProfilePicture = () => {

    const { userProvider } = useContext(LoginContext);
    const { buyer } = userProvider;

  return (
    <>
        { buyer.name != '' && (
           <>
                <h2>Bienvenitres {buyer.name} </h2>
                <img src={`${buyer.image}`} />
           </>
        )}
    </>
  )
}

export default ProfilePicture