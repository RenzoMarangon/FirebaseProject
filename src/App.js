import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { LoginProvider } from './context/LoginContext';
import UserRegisterByMail from './components/UserRegisterByMail';
import UserSgnOut from './components/UserSgnOut';
import ImageUploader from './components/ImageUploader';
import ProfilePicture from './components/ProfilePicture';
import UserLoginGoogle from './components/UserLoginGoogle';
import LoginByMail from './components/LoginByMail';

function App() {
  return (
    <div className="App">
      <LoginProvider>
        {/* <Login /> */}
        <UserRegisterByMail />
        <UserSgnOut />
        <ImageUploader />
        {/* <ProfilePicture /> */}
        <LoginByMail />
        {/* <UserLoginGoogle /> */}
      </LoginProvider>

    </div>
  );
}

export default App;
