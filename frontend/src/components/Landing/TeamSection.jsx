import BrettImage from "../../assets/team-members/brett.jpg"
import RigelImage from "../../assets/team-members/rigel.jpg"
import MargaImage from "../../assets/team-members/marga.jpg"
import PorterImage from "../../assets/team-members/porter.png"
import GabeImage from "../../assets/team-members/gabe.jpg"

export default function TeamSection() {
  // Array of team members with their names, image URLs, and roles
  const teamMembers = [
    {
      name: "Brett Arda",
      image: BrettImage,
      role: "Hipster",
    },
    {
      name: "Rigel Baltazar",
      image: RigelImage,
      role: "Coder",
    },
    {
      name: "Margaret Matunog",
      image: MargaImage,
      role: "Designer",
    },
    {
      name: "Nicolo Porter",
      image: PorterImage,
      role: "Hacker",
    },
    {
      name: "Gabe San Diego",
      image: GabeImage,
      role: "Hustler",
    },
  ]
  return (
    <>
      {/* Team Section */}
      <section id="team" className="relative min-h-screen w-full px-8 py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50 opacity-60" />
        <div className="relative z-10 flex flex-col items-center space-y-12 overflow-y-auto">
          <h2 className="text-4xl font-bold text-blue-400">Meet the Team</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {/* Team Members */}
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex-none rounded-lg bg-white p-4 shadow-lg"
                style={{ minWidth: "220px", maxWidth: "220px", minHeight: "230px" }}
              >
                <img
                  src={member.image}
                  alt={`${member.name}`}
                  className="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
                />
                <h3 className="text-center text-lg font-bold">{member.name}</h3>
                <p className="text-center text-neutral-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
