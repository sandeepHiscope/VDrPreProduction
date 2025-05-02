import './footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__content">
      <div className="footer__col">
        <h3>VDr</h3>
        <p className='footer__description'>
          Your trusted health companion, connecting you with verified,
          background-checked doctors for quality care.
        </p>
      </div>

      <div className="footer__col">
        <h4>Explore</h4>
        <ul>
          <li><a href="/doctors">Our Doctors</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </div>

      <div className="footer__col">
        <h4>Support</h4>
        <ul>
          <li><a href="/faq">FAQs</a></li>
          <li><a href="/help-center">Help Center</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>

      <div className="footer__col">
        <h4>Connect</h4>
        <div className="footer__social">
          <a href="#"><img src="/icons/facebook.svg" alt="Facebook" /></a>
          <a href="#"><img src="/icons/linkedin.svg" alt="LinkedIn" /></a>
          <a href="#"><img src="/icons/twitter.svg" alt="Twitter" /></a>
          <a href="#"><img src="/icons/instagram.svg" alt="Instagram" /></a>
        </div>
        <p>Email: <a href="mailto:support@vdr.health">support@vdr.health</a></p>
        <p>Phone: <a href="tel:+919876543210">+91 98765 43210</a></p>
      </div>
    </div>

    <div className="footer__bottom">
      <p>&copy; {new Date().getFullYear()} Hiscope Enterprises. All rights reserved.</p>
      <div className="footer__legal">
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
    </div>
  </footer>
);

export default Footer;
