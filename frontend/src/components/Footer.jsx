import React from 'react';

function Footer() {
  return (
    <footer className="footer container">
      <p className="footer__copyright-text">© {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;