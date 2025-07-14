import React from 'react';

const Footer = () => {
  return (
    <div>
      <div className="container my-5 mb-5">
        <footer className="bg-dark text-center text-white">
          <div className="text-center p-3 " style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2020 Copyright:{' '}
            <a className="text-white">pasindu Kavishka</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;