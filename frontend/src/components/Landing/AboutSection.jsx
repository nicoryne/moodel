import React from "react"
import { Link } from "react-router-dom"
import dark_logo from "../../assets/moodel-logo-dark.png"
import { MotionComponent } from "../../components/MotionComponent"

export default function AboutSection() {
  return (
    <>
      {/* About Section */}
      <section id="about" className="relative h-3/4 w-full">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50 opacity-60" />

        {/* Content */}
        <div className="relative z-10 flex max-h-full flex-col items-center justify-center space-y-12 overflow-y-auto px-8 py-16">
          <img className="mx-auto -mb-20 h-auto w-32" src={dark_logo} alt="Logo" />
          <h1 className="text-5xl font-black text-blue-400">About Moodel</h1>
          <p className="max-w-4xl text-center text-lg text-neutral-600">
            Moodel is a project and document management platform specifically tailored for students and teachers. Our
            mission is to simplify and streamline the educational process by offering user-friendly tools for
            organization, collaboration, and productivity.
          </p>

          <div className="flex flex-wrap justify-center gap-8 pt-12">
            <div className="w-full transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 md:w-1/3">
              <h2 className="mb-4 text-2xl font-semibold text-blue-400">Our Vision</h2>
              <p className="text-neutral-600">
                To revolutionize how students and educators interact, making learning and teaching more efficient,
                accessible, and engaging.
              </p>
            </div>

            <div className="w-full transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 md:w-1/3">
              <h2 className="mb-4 text-2xl font-semibold text-blue-400">Our Mission</h2>
              <p className="text-neutral-600">
                Providing intuitive solutions that bridge the gap between academic challenges and technology, fostering
                collaboration and success in the academic world.
              </p>
            </div>
          </div>

          <MotionComponent
            as={Link}
            to="/signup"
            className="rounded-lg bg-blue-400 px-8 py-3 text-xl font-bold text-white shadow hover:bg-blue-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join our community!
          </MotionComponent>
          
          
        </div>
      </section>
    </>
  )
}
