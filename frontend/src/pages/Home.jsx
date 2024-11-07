import React from "react"
import { MotionComponent } from "../components/MotionComponent"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <>
      <section className="relative h-screen w-full bg-[linear-gradient(to_right,rgba(128,128,128,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.2)_1px,transparent_1px)] bg-[size:80px_80px]">
        {/* Gradient overlay div */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-blue-50 opacity-60" />

        {/* Content */}
        <div className="relative z-10 flex h-full w-full flex-col place-items-center justify-center space-y-8 p-8">
          <div className="text-center">
            <h1 className="text-6xl font-black text-blue-400">Moodel</h1>
            <p className="text-neutral-400">An easy project and document management system for students and teachers</p>
          </div>
          <MotionComponent
            as={Link}
            to="/signup"
            className="hidden rounded-lg bg-white px-16 py-2 text-2xl font-bold text-blue-400 shadow-sm hover:bg-blue-300 hover:text-white hover:drop-shadow-md active:bg-blue-400 md:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join us!
          </MotionComponent>
        </div>
      </section>
      <section className="relative h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50 opacity-60" />
      </section>
    </>
  )
}
