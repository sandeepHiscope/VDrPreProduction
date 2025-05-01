import { createContext, useState } from "react";

export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const setUser = (value) => setIsUser(value);
  const setDoctor = (value) => setIsDoctor(value);
  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout, isUser, isDoctor, setUser, setIsDoctor }}>
      {children}
    </LoginContext.Provider>
  );
}; 

export default LoginContextProvider;
