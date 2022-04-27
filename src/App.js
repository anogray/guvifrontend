import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import './App.css';
import Toast from "./components/Toaster/Toaster";
import { Routes } from "./Routes";

export const UserContext = createContext(
  {
    isLoggedIn: false,
    setLogin: () => { },
    authToken: undefined,
    setToken: () => { },
    userName: undefined,
    setUser: () => { },
    isUserDetail: undefined,
    setIsUserDetail: () => {},
    userGlobal: undefined,
    setUserGlobal: () => {}
  }
);
const UserContextProvider = UserContext.Provider;

function App() {

  const parsedLoggedIn = JSON.parse(localStorage.getItem("login")) || false;
  const name = localStorage.getItem('name') || '';
  const token = localStorage.getItem('token') || '';
  const [isLoggedIn, setLogin] = useState(parsedLoggedIn);
  const [authToken, setToken] = useState(token);
  const [userName, setUser] = useState(name);
  const [isUserDetail, setIsUserDetail] = useState(false);
  const [userGlobal, setUserGlobal] = useState({});

  useEffect(() => {
    localStorage.setItem('login', isLoggedIn);
    localStorage.setItem('name', userName);
    localStorage.setItem('token', authToken);
    // document.body.style.backgroundColor = "#EDF6FF";
  }, [isLoggedIn, authToken, userName]);

  let user = {
    isLoggedIn,
    setLogin,
    authToken,
    setToken,
    userName,
    setUser,
    isUserDetail,
    setIsUserDetail,
    userGlobal,
    setUserGlobal
  };
  
  return (
    <UserContextProvider value={user}>
      <div className="main-body">
      <div className="appView">
      </div>
        <Routes/>
        <Toast/>
      </div>
    </UserContextProvider>
  );
}

export default App;
