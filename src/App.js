import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { LoginProvider } from './context/LoginContext';
import UserRegisterByMail from './components/UserRegisterByMail';
import UserSgnOut from './components/UserSgnOut';

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Login />
        {/* <UserRegisterByMail /> */}
        {/* <UserSgnOut /> */}

      </LoginProvider>

    </div>
  );
}

export default App;
