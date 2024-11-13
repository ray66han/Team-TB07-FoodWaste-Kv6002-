import React from 'react';
import './styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="footer bg-dark text-white text-center py-3">
      <p>&copy; {currentYear} ExpiryAlert. All rights reserved.</p>
    </footer>
  );
};

export default Footer;