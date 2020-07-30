import React, { useState } from "react";
import "./Header.css";
import { ReactComponent as SvgBars } from "../../SVG/bars.svg";
import { ReactComponent as SvgRocket } from "../../SVG/iconmonstr-rocket-13.svg";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const [showNav, setShowNav] = useState(false);

  const location = useLocation();

  const showNavClass = () => {
    return (
      (showNav ? "" : "hide-nav ") +
      "w-full block flex-grow lg:flex lg:items-center lg:w-auto"
    );
  };
  const getNavClass = (pathname) => {
    return (
      (location.pathname === pathname
        ? "font-bold text-white disabled:opacity-75 "
        : "text-teal-200 ") +
      "block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4"
    );
  };

  return (
    <nav
      id="header"
      data-testid="Header"
      className="flex items-center justify-between flex-wrap bg-teal-500 p-6"
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <SvgRocket />
        <span className="font-semibold text-xl tracking-tight">
          Our Solar System
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setShowNav(!showNav)}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <SvgBars />
        </button>
      </div>
      <div className={showNavClass()}>
        <div className="text-sm lg:flex-grow">
          <Link to="/" className={getNavClass("/")}>
            The Planets
          </Link>
          <Link to="/solarsystem" className={getNavClass("/solarsystem")}>
            The Solar System
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
