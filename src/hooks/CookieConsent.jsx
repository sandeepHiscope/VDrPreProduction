import React, { useState, useEffect } from 'react';
import './CookieConsent.css';
import {   ShieldQuestion,
} from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    // If no choice has been made, show the popup
    if (!cookieConsent) {
      // Small delay to ensure the popup appears after page loads
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    // Here you would initialize your cookies/tracking
  };
  const handleAcceptnecessary = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    // Here you would initialize your cookies/tracking
  };
  
  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
    // Here you would ensure no non-essential cookies are set
  };
  
  if (!isVisible) {
    return null;
  }
  
return (
    <div className="cookie-consent-container">
        <div className="cookie-consent">
            <div className="cookie-content">
                <div className="cookie-icon">
                    <ShieldQuestion name="shield-question" size={24} color="#555555" />
                </div>
                <div>
                    <h3>We Value Your Privacy</h3>
                    <p>Your experience matters to us! We use cookies to make your visit seamless, improve our services, and provide content tailored to your interests. Rest assured, we respect your data and never misuse it. By clicking "Accept All", you empower us to deliver the best experience possible.</p>
                </div>
            </div>
            <div className="cookie-actions">
                <button className="btn-reject" onClick={handleAcceptnecessary}>Accept Only Necessary</button>
                <button className="btn-accept" onClick={handleAccept}>Accept All Cookies</button>
            </div>
        </div>
    </div>
);
};

export default CookieConsent;