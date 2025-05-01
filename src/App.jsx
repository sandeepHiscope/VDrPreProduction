import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";

import "./App.css";
import Homepage from "./pages/Home";
import DoctorVerification from "./pages/doctorVerificationpage";
import FindDoctorPage from "./pages/findDoctorPage";
import LoginAndRegistration from "./pages/loginAndRegistrationPage";
import IndividualRegisterPage from "./pages/individualRegisterPage";
import SosPage from "./pages/sosPage";
import DoctorRegisterPage from "./pages/doctorRegisterPage";
import HomeDeliveryMedicine from "./pages/demoPage";
import Insurance from "./pages/insurancePage";
import DoctorProfilePage from "./pages/doctorProfilePage";
import MainInsurance from "./pages/mainInsurancePage";
import MainHeader from "./components/header";
import Footer from "./components/footer";
import VerifyDoc from "./pages/verifyDoc";
import DoctorID from "./pages/doctorID";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import DocDashboard from "./pages/docDashboard";
import ScrollToTop from "./components/scrollToTop";
import WhyVDr from "./pages/whyVDr";
import InstallPromptToast from "./hooks/InstallPromptToast.jsx";
import FounderPage from "./pages/ourFoundersPage";
import UserDashboard from "./pages/userDashboard";
import LoginContextProvider, { LoginContext } from "./context/loginContext.jsx";

const App = () => {
  const [location, setLocation] = useState();
  const currentUrl = window.location.href;
  console.log(`url:${currentUrl}`);

  useEffect(() => {
    setLocation(currentUrl);
  }, [currentUrl]);

  return (
    <>
      <Router>
        <LoginContextProvider>
          <ScrollToTop />
          <MainHeader />
          <div className="content-wrapper ">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/verifyDoc" element={<VerifyDoc />} />
              <Route
                path="/doctorVerificationpage"
                element={<DoctorVerification />}
              />
              <Route path="/findDoctorPage" element={<FindDoctorPage />} />
              <Route
                path="/loginAndRegistrationPage"
                element={<LoginAndRegistration />}
              />
              <Route
                path="/individualRegisterPage"
                element={<IndividualRegisterPage />}
              />
              <Route path="/sosPage" element={<SosPage />} />
              <Route
                path="/doctorRegisterPage"
                element={<DoctorRegisterPage />}
              />
              <Route path="/FounderPage" element={<FounderPage />} />
              <Route path="/FounderPage" element={<FounderPage />} />
              <Route path="/insurancePage" element={<Insurance />} />
              <Route path="/demoPage" element={<HomeDeliveryMedicine />} />
              <Route
                path="/doctorProfilePage"
                element={<DoctorProfilePage />}
              />
              <Route path="/mainInsurancePage" element={<MainInsurance />} />
              <Route path="/doctorID/:id" element={<DoctorID />} />
              <Route path="/QRCodeGenerator" element={<QRCodeGenerator />} />
              <Route path="/docDashboard" element={<DocDashboard />} />
              <Route path="/whyVDr" element={<WhyVDr />} />
              <Route path="/userDashboard" element={<UserDashboard />} />
            </Routes>
          </div>
          <Footer />
        </LoginContextProvider>
      </Router>

      <InstallPromptToast />
    </>
  );
};

export default App;
