import React, { useContext } from "react";
import { FaEnvelope, FaPhone, FaGithub, FaMapMarkerAlt, FaCopyright } from "react-icons/fa";
import { PaletteContext } from "../context/PaletteContext";
import "../assets/css/footer.css";

const Footer = () => {
  const { state } = useContext(PaletteContext);

  return (
    <footer className={`footer ${state?.palette?.name || "blue-palette"}`}>
      <div className="footer-container">
        {/* Contact Section */}
        <div className="footer-section contact">
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <span>
              <a href="mailto:satyamss980101@gmail.com" style={{ textDecoration: "none", color: "inherit" }}>
                satyamss980101@gmail.com
              </a>
            </span>

          </div>
          <div className="contact-item">
            <FaPhone className="icon" />
            <span>+91 9262577708</span>
          </div>
          <div className="contact-item">
            <FaGithub className="icon" />
            <a href="https://github.com/satyamss9801" target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>
        </div>

        <div className="vertical-line"></div>

        {/* Copyright & Location */}
        <div className="footer-section copyright">
          <FaCopyright className="icon" />
          <span>2025 Satyam Kumar</span>
          <div className="location">
            <FaMapMarkerAlt className="icon" />
            <span>Noida Sector 49</span>
          </div>
        </div>

        <div className="vertical-line"></div>

        {/* Features Section */}
        <div className="footer-section features">
          <h4>Features</h4>
          <ul>
            <li> Voice - to - Text Notes</li>
            <li> Text - to - Voice Notes</li>
            <li> Theme Customization</li>
            <li> Search & Organize Notes</li>
            <li> Secure Storage</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
