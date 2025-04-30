import './Footer.css';

const Footer = () => (
  <footer className="footer">
    

    {/* Main columns */}
    <div className="footer__content">
      <div className="footer__col footer__col--about">
        <h3>VDr</h3>
        <p>
          Your trusted health companion, connecting you with verified, background-checked doctors for quality care.
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
      {/* Newsletter signup */}
    <div className="footer__newsletter">
      <h2 className="footer__newsletter-title">Stay Informed</h2>
      <p className="footer__newsletter-text">
        Subscribe to get health tips and VDr updates straight to your inbox.
      </p>
      <form className="footer__newsletter-form" onSubmit={e => e.preventDefault()}>
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
    </div>

    {/* Bottom legal bar */}
    <div className="footer__bottom">
      <p>&copy; {new Date().getFullYear()} Hiscope Entreprises. All rights reserved.</p>
      <div className="footer__legal">
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
    </div>
  </footer>
);

export default Footer;
