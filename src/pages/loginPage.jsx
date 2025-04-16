import { useState } from "react";
import "./loginPage.css";
import { useNavigate } from "react-router-dom";
import Googlelogo from "../assets/icons/google.png";
import DoctorVerification from "./doctorVerificationpage";
import docRegister from "../assets/Images/docRegister.png";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    const LOGIN_API_URL =
      role === "doctor"
        ? "http://localhost:8080/doctors/login"
        : "http://localhost:8080/users/login";

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.text();
        alert(`WELCOME LOGIN SUCCESSFUL!`);
            if(role === "doctor") {
             navigate("/doctorVerificationpage");
             }
           else {
             navigate("/findDoctorPage");
             }
      } else {
        const errorMessage = await response.text();
        alert(`Login failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    const registerData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    const REGISTER_API_URL =
      role === "doctor"
        ? "http://localhost:8080/doctors/register"
        : "http://localhost:8080/users/register";

    try {
      const response = await fetch(REGISTER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        alert("Registration successful!");
        setFormData({ username: "", email: "", password: "" });
        setRole("");
        // navigate("/doctorVerificationpage");
      } else {
        const errorMessage = await response.text();
        alert(`Registration failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration.");
    }
  };

  const showLogin = () => {
    setActiveTab("login");
    setRole("");
  };

  const showRegister = () => {
    setActiveTab("register");
    setRole("");
  };

  const showDoctorForm = () => setRole("doctor");
  const showUserForm = () => setRole("user");
  const goBack = () => setRole("");

  return (
    <div className="loginContainer">
     
        <img
          src={docRegister}
          alt="Healthcare illustration"
          className="docRegisterImg"
        />
      

      <div className="container">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={showLogin}
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={showRegister}
          >
            Register
          </button>
        </div>

        {/* ----------------- LOGIN TAB ----------------- */}
        {activeTab === "login" && (
          <div className="form-container">
            <h2>Login</h2>

            {!role && (
              <div className="role-selection">
                <p>Select Role to Login:</p>
                <button className="role-btn" onClick={showDoctorForm}>
                  Doctor
                </button>
                <button className="role-btn" onClick={showUserForm}>
                  User
                </button>
              </div>
            )}

            {role && (
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Login as {role}</button>
                <button type="button" onClick={goBack} className="role-btn">
                  Back
                </button>
                <div className="forget">Forget password ?</div>
                <div className="login-h1">continue with</div>
                <img src={Googlelogo} alt="google" className="small-image" />
              </form>
            )}
          </div>
        )}

        {/* ----------------- REGISTER TAB ----------------- */}
        {activeTab === "register" && !role && (
          <div className="form-container">
            <h2>Register</h2>
            <button className="role-btn" onClick={showDoctorForm}>
              Are you a HealthCare Professional?
            </button>
            <button className="role-btn" onClick={showUserForm}>
              User
            </button>
            <div className="title1">
              <li>If you are a doctor, click on the first button</li>
            </div>
            <div className="title2">
              <li>If you are a user, click on the second button</li>
            </div>
            <div className="title3">
              <li>
                Register in our VDR app and get ultra benefits and discounts.
              </li>
            </div>
          </div>
        )}

        {(activeTab === "register" && role) && (
          <div className="form-container">
            <h2>{role === "doctor" ? "Doctor" : "User"} Registration</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Register as {role}</button>
            </form>
            <button className="role-btn" onClick={goBack}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
