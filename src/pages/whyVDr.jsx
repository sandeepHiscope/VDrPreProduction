import React, { useState, useEffect } from 'react';
import './whyVDr.css';
import FounderPage from "./ourFoundersPage"
import tempImg from "../assets/Images/foundersImg/kiran.jpg"
import tempDoc from "../assets/Images/headerImages/docImg3.jpg"

const WhyVDr = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [statsCounter, setStatsCounter] = useState({
    doctors: 0,
    verifications: 0,
    users: 0
  });

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animate stats counters when they come into view
  useEffect(() => {
    const statsSection = document.getElementById('stats-section');
    
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start counter animations
          const animateStats = () => {
            const duration = 2000; // 2 seconds
            const frameDuration = 1000/60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            let frame = 0;
            
            const counter = setInterval(() => {
              frame++;
              const progress = frame / totalFrames;
              setStatsCounter({
                doctors: Math.floor(5000 * progress),
                verifications: Math.floor(15000 * progress),
                users: Math.floor(100000 * progress)
              });
              
              if (frame === totalFrames) {
                clearInterval(counter);
              }
            }, frameDuration);
          };
          
          animateStats();
          observer.unobserve(statsSection);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
    
    return () => {
      if (statsSection) observer.unobserve(statsSection);
    };
  }, []);

  return (<>
    <div className="why-we-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="fade-in-element">Healthcare Built On Trust</h1>
          <p className="fade-in-element delay-1">
            Connecting you with verified, background-checked doctors committed to 
            providing safe and high-quality healthcare.
          </p>
          <button className="cta-button fade-in-element delay-2" >
            Find Your Doctor
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="content-section about-section" id="about-us">
        <div className="section-header">
          <h2>Who We Are</h2>
          <div className="section-underline"></div>
        </div>
        <div className="two-column-grid">
          <div className="text-column">
            <h3>Our Vision</h3>
            <p>
              We envision a world where everyone has access to trusted healthcare providers. 
              Our platform was born from a single question: How can we ensure that patients 
              connect with qualified, ethical, and trustworthy doctors?
            </p>
            <p>
              Founded by a team of healthcare professionals and technology experts who experienced 
              firsthand the challenges of finding reliable medical care, we're committed to 
              transforming the healthcare landscape.
            </p>
          </div>
          <div className="image-column">
            <div className="image-container">
              <img src={tempDoc} alt="Our diverse team of healthcare and technology experts" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="content-section mission-section" id="our-mission">
        <div className="section-header">
          <h2>Why We Exist</h2>
          <div className="section-underline"></div>
        </div>
        <div className="problem-solution-grid">
          <div className="problem-card">
            <h3>The Problem</h3>
            <ul>
              <li>
                <span className="Problemicon">❌</span>
                <span className="Probletext">60% of patients report difficulty verifying their doctor's credentials</span>
              </li>
              <li>
                <span className="Problemicon">❌</span>
                <span className="Probletext">Medical misinformation leads to delayed proper treatment</span>
              </li>
              <li>
                <span className="Problemicon">❌</span>
                <span className="Probletext">Lack of transparency creates uncertainty and anxiety</span>
              </li>
              <li>
                <span className="Problemicon">❌</span>
                <span className="Probletext">Finding the right specialist can take weeks or months</span>
              </li>
            </ul>
          </div>
          <div className="solution-card">
            <h3>Our Solution</h3>
            <ul>
              <li>
                <span className="Solicon">✓</span>
                <span className="Soltext">Rigorous multi-step verification of every doctor's credentials</span>
              </li>
              <li>
                <span className="Solicon">✓</span>
                <span className="Soltext">Continuous monitoring of professional standings and reviews</span>
              </li>
              <li>
                <span className="Solicon">✓</span>
                <span className="Soltext">Transparent rating system based on patient outcomes</span>
              </li>
              <li>
                <span className="Solicon">✓</span>
                <span className="Soltext">Smart matching algorithm connects you with the perfect specialist</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="content-section process-section" id="our-process">
        <div className="section-header">
          <h2>How We Solve It</h2>
          <div className="section-underline"></div>
        </div>
        <div className="process-steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Comprehensive Background Check</h3>
            <p>
              Every doctor undergoes a thorough verification of medical licenses, 
              education, board certifications, and practice history.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Human Verification</h3>
            <p>
              Our proprietary system combines advanced AI with expert human review 
              to ensure nothing is missed in the vetting process.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Continuous Monitoring</h3>
            <p>
              We don't stop at initial verification. Our system continuously monitors 
              for any changes in credentials, reviews, or professional standing.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Patient Feedback Integration</h3>
            <p>
              Real patient experiences are carefully verified and incorporated into 
              our trust score, creating a complete picture of each doctor.
            </p>
          </div>
        </div>
        
        <div className="trust-badge">
          <div className="badge-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shield-icon">
              <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12L11 15L16 9" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="badge-text">
            <h4>Verified  Human Experts</h4>
            <p>Our dual-verification process ensures unmatched accuracy</p>
          </div>
        </div>
        
        <div className="stats-section" id="stats-section">
          <div className="stat-item">
            <div className="stat-number">{statsCounter.doctors.toLocaleString()}+</div>
            <div className="stat-label">Verified Doctors</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{statsCounter.verifications.toLocaleString()}+</div>
            <div className="stat-label">Verifications Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{statsCounter.users.toLocaleString()}+</div>
            <div className="stat-label">Satisfied Users</div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="content-section why-us-section" id="why-us">
        <div className="section-header">
          <h2>What Makes Us Different</h2>
          <div className="section-underline"></div>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Quality Assurance</h3>
            <p>
              Only the top 12% of doctors meet our rigorous standards. We prioritize 
              excellence in care, not quantity of providers.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Emotional Support</h3>
            <p>
              Finding healthcare shouldn't be clinical. Our platform guides you with 
              compassion through every step of your healthcare journey.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#9b59b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#9b59b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="#9b59b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13C17.7699 3.58385 19.0078 5.17973 19.0078 7.005C19.0078 8.83027 17.7699 10.4261 16 10.88" stroke="#9b59b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Community</h3>
            <p>
              Join a community of patients and providers united by a commitment to 
              transparent, ethical healthcare.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#f39c12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="#f39c12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="#f39c12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Complete Transparency</h3>
            <p>
              See the verification process in real-time. We show you exactly how each 
              doctor is vetted with nothing hidden behind closed doors.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="content-section testimonials-section">
        <div className="section-header">
          <h2>Trusted By Patients Like You</h2>
          <div className="section-underline"></div>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "After struggling to find a specialist I could trust, this platform matched 
                me with a doctor who not only had the right credentials but truly listened 
                to my concerns. The peace of mind knowing they've been thoroughly vetted is priceless."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-image">
                <img src={tempImg} alt="Sarah M." />
              </div>
              <div className="author-info">
                <h4>Sarah M.</h4>
                <p>Patient since 2023</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "As a physician, I appreciate the rigorous verification process. It ensures 
                that patients connect with qualified professionals and helps maintain the 
                integrity of our profession in an era of misinformation."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-image">
                <img src={tempImg} alt="Dr. James L." />
              </div>
              <div className="author-info">
                <h4>Dr. James L.</h4>
                <p>Cardiologist, Verified Provider</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "When my daughter needed specialized care, I couldn't risk choosing the wrong 
                doctor. This platform gave me confidence in my choice with transparent verification 
                and real patient reviews. The care she received was exceptional."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-image">
                <img src={tempImg} alt="Robert K." />
              </div>
              <div className="author-info">
                <h4>Robert K.</h4>
                <p>Parent of patient</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      {/* <section className="cta-section">
        <div className="cta-content">
          <h2>Join Our Community of Trust</h2>
          <p>
            Start your journey to better healthcare with providers who are verified, 
            trusted, and committed to your wellbeing.
          </p>
          <div className="cta-buttons">
            <button className="primary-cta">Find Your Doctor</button>
            <button className="secondary-cta">Learn About Our Process</button>
          </div>
        </div>
      </section> */}
    </div>
    <hr  className='text-neutral-400'/>
    <h1 className=' ml-[43%] mt-4'>Our Founders</h1>
        <FounderPage/>
    </>
  );
};

export default WhyVDr;