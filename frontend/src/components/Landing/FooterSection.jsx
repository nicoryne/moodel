import React from "react"
import { MotionComponent } from "../../components/MotionComponent"
import { Link } from "react-router-dom"
import dark_logo from "../../assets/moodel-logo-dark.png"

export default function FooterSection() {
  return (
    <footer className="bg-white-50 text-blue-400">
      <div className="container mx-auto px-6 py-2">
        {/* Grid layout */}
        <div className="flex flex-wrap justify-between">
          {/* Logo and description */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link to="/" className="mt-4 flex items-center space-x-1">
              <img
                src={require("../../assets/moodel-logo-dark.png")}
                alt="Moodel Logo"
                className="h-12 w-12"
              />
              <h2 className="text-2xl font-black">Moodel</h2>
            </Link>
            <p className="mt-1 text-sm">
              A project and document management system for students and teachers.
            </p>
          </div>

          {/* Navigation Links - Can Add More */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="mt-6 text-lg font-black">Quick Links</h3>
            <ul className="space-y-0.5">
              <li>
                <Link to="/#about" className="hover:underline">
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-blue-100 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Moodel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}