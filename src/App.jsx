import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./App.css";
import Homepage from "./pages/Home";
import DoctorVerification from "./pages/doctorVerificationpage";
import FindDoctorPage from "./pages/findDoctorPage";
import LoginAndRegistration from "./pages/loginAndRegistrationPage";
import IndividualRegisterPage from "./pages/individualRegisterPage";
import SosPage from "./pages/sosPage";
import DoctorRegisterPage from "./pages/doctorRegisterPage";
import FounderPage from "./pages/ourFoundersPage";
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
import { useSWUpdateToast } from "./sw-update";

const App = () => {
  const [location, setLocation] = useState();
  const currentUrl = window.location.href;
  console.log(`url:${currentUrl}`);
  const { showUpdate, reload } = useSWUpdateToast();

  useEffect(() => {
    setLocation(currentUrl);
  }, [currentUrl]);

  
  return (
    <>
      <Router>
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
            {/* <Route path="/FounderPage" element={<FounderPage />} /> */}
            <Route path="/insurancePage" element={<Insurance />} />
            <Route path="/demoPage" element={<HomeDeliveryMedicine />} />
            <Route path="/doctorProfilePage" element={<DoctorProfilePage />} />
            <Route path="/mainInsurancePage" element={<MainInsurance />} />
            <Route path="/doctorID/:id" element={<DoctorID />} />
            <Route path="/QRCodeGenerator" element={<QRCodeGenerator />} />
            <Route path="/docDashboard" element={<DocDashboard />} />
            <Route path="/whyVDr" element={<WhyVDr />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      {showUpdate && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-xl shadow-lg z-50 flex items-center space-x-2">
          <span>New version available.</span>
          <button className="underline" onClick={reload}>
            Refresh
          </button>
          <button onClick={() => setShowUpdate(false)} className="ml-2 text-sm">
            ✕
          </button>
        </div>
      )}
    </>
  );
};
export default App;
