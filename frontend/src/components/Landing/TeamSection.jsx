import BrettImage from "../../assets/team-members/brett.jpg"
import RigelImage from "../../assets/team-members/rigel.jpg"
import MargaImage from "../../assets/team-members/marga.jpg"
import PorterImage from "../../assets/team-members/porter.png"
import GabeImage from "../../assets/team-members/gabe.jpg"

export default function TeamSection() {
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
  ];

  return (
    <section id="team" className="relative min-h-screen w-full px-8 py-15">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-50 opacity-60" />
      <div className="relative z-10 flex flex-col items-center space-y-12 overflow-y-auto pt-16">
        <h2 className="text-4xl font-black text-white -mb-5 bg-blue-400 border-2 border-blue-400 shadow-lg rounded-md px-4 py-2">
          The Team Behind Moodel
        </h2>

        {/* Team Members */}
        <div className="flex overflow-x-auto scrollbar-hide pb-4 gap-4">
          <div className="flex flex-nowrap gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex-none transform rounded-lg bg-white p-4 shadow-lg"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={member.image}
                  alt={`${member.name}`}
                  className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                />
                <h3 className="text-center text-lg font-bold">{member.name}</h3>
                <p className="text-center text-neutral-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="w-full max-w-4xl transform rounded-lg bg-white p-6 shadow-lg">
          <h3 className="text-2xl font-black text-blue-400 mb-4 text-center">
            Where Moodel Was Founded
          </h3>
          <p className="text-center text-neutral-600 mb-6">
            <span className="font-bold">Moodel</span> started as a school project, created by students of the{" "}
            <span className="font-bold">Cebu Institute of Technology - University</span>. It was founded right here on
            our campus!
          </p>
          <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="CIT-U Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5075.670168099518!2d123.87615248605623!3d10.294272241686299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99c06b2e05b43%3A0x9464b122dffd3fa4!2sCIT-University%20ST%20Building%2C%20Natalio%20B.%20Bacalso%20Ave%2C%20Cebu%20City%2C%206000%20Cebu!5e1!3m2!1sen!2sph!4v1733032741611!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}