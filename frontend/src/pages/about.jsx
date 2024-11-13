import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/moodel logo.png";
import BrettImage from "../assets/Brett.jpg";
import RigelImage from "../assets/Rigel.jpg";
import MargaImage from "../assets/Marga.jpg";
import PorterImage from "../assets/Porter.jpg";
import GabeImage from "../assets/Gabe.jpg";
import { MotionComponent } from "../components/MotionComponent";

export default function AboutPage() {
  // Array of team members with their names, image URLs, and roles
  const teamMembers = [
    {
      name: 'Brett Arda',
      image: BrettImage,
      role: 'Lead Developer'
    },
    {
      name: 'Rigel Baltazar',
      image: RigelImage,
      role: 'Backend Engineer'
    },
    {
      name: 'Margaret Matunog',
      image: MargaImage,
      role: 'Project Manager'
    },
    {
      name: 'Nicolo Porter',
      image: PorterImage,
      role: 'UX Designer'
    },
    {
      name: 'Gabe San Diego',
      image: GabeImage,
      role: 'Backend Engineer'
    }
  ];

  return (
    <>
      <section className="relative h-3/4 w-full bg-[linear-gradient(to_right,rgba(128,128,128,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.2)_1px,transparent_1px)] bg-[size:80px_80px]">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50 opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-12 py-16 px-8">
          <img className="mx-auto w-32 h-auto -mb-10" src={logo} alt="Logo" />
          <h1 className="text-5xl font-bold text-blue-400">About Moodel</h1>
          <p className="text-lg text-center text-neutral-600 max-w-4xl">
            Moodel is a project and document management platform specifically tailored for students and teachers. Our mission is to simplify and streamline the educational process by offering user-friendly tools for organization, collaboration, and productivity.
          </p>

          <div className="flex flex-wrap justify-center gap-8 pt-12">
            <div className="w-full md:w-1/3 p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Our Vision</h2>
              <p className="text-neutral-600">
                To revolutionize how students and educators interact, making learning and teaching more efficient, accessible, and engaging.
              </p>
            </div>
    
            <div className="w-full md:w-1/3 p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Our Mission</h2>
              <p className="text-neutral-600">
                Providing intuitive solutions that bridge the gap between academic challenges and technology, fostering collaboration and success in the academic world.
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
            Join our community
          </MotionComponent>
        </div>
      </section>

        {/* Team Section */}
    <section className="relative min-h-screen w-full bg-blue-50 py-16 px-8">
        <div className="relative z-10 flex flex-col items-center space-y-12">
            <h2 className="text-4xl font-bold text-blue-400">Meet the Team</h2>
            <div className="flex space-x-4 overflow-x-auto">
            {/* Team Members */}
            {teamMembers.map((member, index) => (
                <div
                key={index}
                className="bg-white p-4 shadow-lg rounded-lg flex-none"
                style={{ minWidth: '220px', maxWidth: '220px', minHeight: '230px' }}
                >
                <img
                    src={member.image}
                    alt={`${member.name}`}
                    className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-lg font-bold text-center">{member.name}</h3>
                <p className="text-neutral-600 text-center">{member.role}</p>
                </div>
            ))}
            </div>
        </div>
    </section>
    </>
  );
}
