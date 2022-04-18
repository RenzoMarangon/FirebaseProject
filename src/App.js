import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { LoginProvider } from './context/LoginContext';
function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Login />
      </LoginProvider>

    </div>
  );
}

export default App;
