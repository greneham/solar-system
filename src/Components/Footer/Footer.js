import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer id="footer" data-testid="Footer" className="bg-gray-300 bottom-0 w-full opacity-50">
      <div className="flex justify-center border-t-2 text-gray-500">
        &copy; 2020
      </div>
    </footer>
  );
}

export default Footer;
