import React from "react"
import dark_logo from "../../assets/moodel-logo-dark.png"
import { MotionComponent } from "../../components/MotionComponent"

export default function ContactSection() {
  return (
    <>
      <section
        id="contact"
        className="relative min-h-screen w-full bg-[linear-gradient(to_right,rgba(128,128,128,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.2)_1px,transparent_1px)] bg-[size:80px_80px]"
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-blue-50 opacity-60" />
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-12 px-8 py-16">
          <img className="mx-auto -mb-20 h-auto w-32" src={dark_logo} alt="Logo" />
          <h1 className="text-5xl font-black text-blue-400">Contact Us</h1>
          <p className="max-w-4xl text-center text-lg text-neutral-600">
            We value your feedback and are always happy to hear from you! Feel free to reach out with any questions.
          </p>

          {/* Contact Form */}
          <form className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-blue-400">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-blue-400">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-blue-400">Message</label>
              <textarea
                placeholder="Your message"
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="5"
              ></textarea>
            </div>

            <MotionComponent
              as="button"
              type="submit"
              className="w-full rounded-md bg-blue-400 px-4 py-2 font-bold text-white shadow hover:bg-blue-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </MotionComponent>
          </form>
        </div>
      </section>
    </>
  )
}
