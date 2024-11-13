import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/moodel logo.png";
import { MotionComponent } from "../components/MotionComponent";

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-screen w-full bg-[linear-gradient(to_right,rgba(128,128,128,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.2)_1px,transparent_1px)] bg-[size:80px_80px]">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50 opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-12 py-16 px-8">
          <img className="mx-auto w-32 h-auto -mb-10" src={logo} alt="Logo" />
          <h1 className="text-5xl font-bold text-blue-400">Contact Us</h1>
          <p className="text-lg text-center text-neutral-600 max-w-4xl">
            We value your feedback and are always happy to hear from you! Feel free to reach out with any questions.
          </p>

          {/* Contact Form */}
          <form className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-blue-400 font-semibold">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-blue-400 font-semibold">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-blue-400 font-semibold">Message</label>
              <textarea
                placeholder="Your message"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="5"
              ></textarea>
            </div>

            <MotionComponent
              as="button"
              type="submit"
              className="w-full rounded-md bg-blue-400 px-4 py-2 text-white font-bold shadow hover:bg-blue-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </MotionComponent>
          </form>

          {/* Back to Home */}
          <MotionComponent
            as={Link}
            to="/"
            className="mt-4 text-blue-400 hover:text-blue-500 font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </MotionComponent>
        </div>
      </section>
    </>
  );
}
