import React from "react"
import { motion } from "framer-motion"

import { Link } from "react-router-dom"
import logo from "../assets/logo192.png"
import { Bars4Icon } from "@heroicons/react/20/solid"
import { MotionComponent } from "./MotionComponent"

const navLinks = [
  { text: "Login", href: "/auth" },
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isMobileMenuOpen, toggleMobileMenu] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 w-full border-b-4 transition-colors duration-300 ${
        isScrolled
          ? "border-blue-300 bg-blue-400"
          : `border-transparent ${isMobileMenuOpen ? "bg-white" : "bg-transparent"}`
      }`}
    >
      {/* Section Wrapper */}
      <section className="mx-auto flex h-full w-full place-items-center justify-between px-4 md:w-[800px]">
        <div className="flex place-items-center space-x-8">
          {/* Image Logo */}
          <img src={logo} className="h-auto w-8" alt="Moodel Logo" />
          {/* Desktop: Nav Links */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {navLinks
                .filter((link) => link.text !== "Login")
                .map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className={`text-sm font-extrabold transition-colors duration-300 hover:drop-shadow-sm ${isScrolled ? "text-[#F3F3F3] hover:text-[#FFFF]" : "text-blue-400 hover:text-blue-500"}`}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>

        <MotionComponent
          as={Link}
          to="/login"
          className="hidden rounded-lg bg-white px-8 py-1 text-xs font-bold text-blue-400 shadow-sm hover:bg-blue-300 hover:text-white hover:drop-shadow-md active:bg-blue-400 md:block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </MotionComponent>
        {/* Mobile: Hamburger */}
        <MotionComponent
          as={Bars4Icon}
          whileTap={{ scale: 0.95 }}
          className={`block h-auto w-8 transition-colors duration-300 md:hidden ${isScrolled ? "text-[#F3F3F3]" : "text-blue-300"}`}
          onClick={() => toggleMobileMenu(!isMobileMenuOpen)}
        />
      </section>

      {/* Mobile: Nav Menu */}
      {isMobileMenuOpen && (
        <motion.nav
          className={`fixed h-screen w-full justify-center transition-colors duration-300 ${isScrolled ? "bg-blue-400" : "bg-white"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="space-y-8 pt-16 text-center text-2xl">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className={`font-extrabold transition-colors duration-300 ${isScrolled ? "text-[#F3F3F3]" : "text-blue-300"}`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </header>
  )
}
