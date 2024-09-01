import React from 'react';
import './style/footer.css';
import { NavLink } from 'react-router-dom';
import { BsBicycle } from "react-icons/bs";
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <NavLink to="/">
            <BsBicycle size={24}/> WindBreaker
          </NavLink>
          <p>Create, distribute and monetize your bicycle.</p>
        </div>
        <div className="footer-section">
          <h4>Service</h4>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/">Menu</NavLink></li>
            <li><NavLink to="/">Order</NavLink></li>
            <li><NavLink to="/">Invoice</NavLink></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><NavLink to="/">Apps</NavLink></li>
            <li><NavLink to="/">Developer</NavLink></li>
            <li><NavLink to="/">Integration</NavLink></li>
            <li><NavLink to="/">Pricing</NavLink></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><MdEmail /> m.hamzahpane27@gmail.com</li>
            <li><MdPhone /> +62 (812) 6485 - 8332</li>
            <li className="footer-socials">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 m.hamzahpane27@gmail.com. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
