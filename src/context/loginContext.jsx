import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  const [isDoctor, setIsDoctor] = useState(() => {
    return JSON.parse(localStorage.getItem("isDoctor")) || false;
  });

  const [isUser, setIsUser] = useState(() => {
    return JSON.parse(localStorage.getItem("isUser")) || false;
  });

  // 🔐 Secure login state updates
  const setLogin = (value) => {
    setIsLoggedIn(value);
    if (!value) {
      // 🚫 Clear everything on logout
      localStorage.clear();

      // 🚫 Block back button navigation
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        navigate("/loginAndRegistrationPage", { replace: true });
      };

      // ✅ Redirect to login
      navigate("/loginAndRegistrationPage", { replace: true });
    }
  };

  const setUser = (value) => setIsUser(value);
  const setDoctor = (value) => setIsDoctor(value);

  // 🔁 Sync to localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("isUser", JSON.stringify(isUser));
    localStorage.setItem("isDoctor", JSON.stringify(isDoctor));
  }, [isLoggedIn, isUser, isDoctor]);

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, isUser, isDoctor, setUser, setDoctor, setLogin }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
