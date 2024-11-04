import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo192.png";
import { Bars4Icon } from "@heroicons/react/20/solid";


const navLinks = [
  { text: "Login", href: "/login"},
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenu, toggleMobileMenu] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full h-16 bg-blue-400 shadow-sm border-b-4 border-blue-300">
      {/* Section Wrapper */}
      <section className="flex place-items-center w-full h-full md:w-[1100px] mx-auto px-4 justify-between">
        <div className="flex space-x-8 place-items-center">
          {/* Image Logo */}
          <img src={logo} className="h-auto w-8" />
          {/* Desktop: Nav Links */}
          <nav className="md:block hidden">
            <ul className="flex space-x-4">
              {navLinks
              .filter((link) => link.text !== "Login")
              .map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="font-extrabold text-sm text-[#F3F3F3] hover:text-[#FFFF] hover:drop-shadow-lg"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Link to="/login" className="hidden md:block bg-white rounded-lg px-8 py-1 text-blue-400 font-bold hover:text-white hover:bg-blue-300 shadow-sm hover:drop-shadow-md active:bg-blue-400">Login</Link>
        {/* Mobile: Hamburger */}
        <Bars4Icon className="md:hidden block text-[#F3F3F3] h-auto w-8" onClick={() => (toggleMobileMenu(!mobileMenu))}/>
      </section>

       {/* Mobile: Nav Menu */}
       {mobileMenu && (<nav className="fixed bg-blue-400 w-full py-2">
          <ul className="space-y-4 text-center">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className="uppercase font-extrabold text-sm text-[#F3F3F3] hover:text-[#FFFF] hover:drop-shadow-lg"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>)}
    </header>
  );
}
