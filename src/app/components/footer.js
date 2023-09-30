import React from 'react';

function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      fontSize: '10px'
      }}>
      {'Made with love by Arvindh, Bella, Eric, and Kevin ♥︎ \t'}
      &copy; {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;