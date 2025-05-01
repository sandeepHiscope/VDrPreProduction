import { createContext, useState } from "react";

export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  /* const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  const [isDoctor, setIsDoctor] = useState(() => {
    return JSON.parse(localStorage.getItem("isDoctor")) || false;
  });

  const [isUser, setIsUser] = useState(() => {
    return JSON.parse(localStorage.getItem("isUser")) || false;
  }); */

  const setLogin = (value) => setIsLoggedIn(value);
  const setUser = (value) => setIsUser(value);
  const setDoctor = (value) => setIsDoctor(value);

  // Sync to localStorage on state change
  // useEffect(() => {
  //   localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  //   localStorage.setItem("isUser", JSON.stringify(isUser));
  //   localStorage.setItem("isDoctor", JSON.stringify(isDoctor));
  // }, [isLoggedIn, isUser, isDoctor]);
  return (
    <LoginContext.Provider
      value={{ isLoggedIn, isUser, isDoctor, setUser, setDoctor, setLogin }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
