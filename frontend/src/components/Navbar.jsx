import React from "react"
import { motion, stagger } from "framer-motion"
import useSafeAnimate from "../lib/hooks/useSafeAnimate"
import { Link } from "react-router-dom"
import logo from "../assets/logo192.png"
import { Bars4Icon } from "@heroicons/react/20/solid"
import { MotionComponent } from "./MotionComponent"

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 })

function useMenuAnimation(isMobile) {
  const [scope, animate] = useSafeAnimate()

  React.useEffect(() => {
    animate(
      "ul",
      {
        clipPath: isMobile ? "inset(0% 0% 0% 0% round 10px)" : "inset(10% 50% 90% 50% round 10px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      },
    )

    animate(
      "li",
      isMobile ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isMobile ? staggerMenuItems : 0,
      },
    )
  }, [animate, isMobile, scope])

  return scope
}

const navLinks = [
  { text: "Login", href: "/auth" },
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isMobile, toggleMobile] = React.useState(false)
  const mobileMenuScope = useMenuAnimation(isMobile)

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 w-full border-b-4 border-blue-300 bg-blue-400 shadow-sm">
      {/* Section Wrapper */}
      <section className="mx-auto flex h-full w-full place-items-center justify-between px-4 md:w-[1100px]">
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
                      className="text-sm font-extrabold text-[#F3F3F3] hover:text-[#FFFF] hover:drop-shadow-lg"
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
          className="block h-auto w-8 text-[#F3F3F3] md:hidden"
          onClick={() => toggleMobile(!isMobile)}
        />
      </section>

      {/* Mobile: Nav Menu */}
      {isMobile && (
        <motion.nav
          className="fixed w-full bg-blue-400 py-2"
          ref={mobileMenuScope}
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ul className="space-y-4 text-center">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className="text-sm font-extrabold text-[#F3F3F3] hover:text-[#FFFF] hover:drop-shadow-lg"
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
