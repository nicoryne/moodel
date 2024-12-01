import dark_logo from "../../assets/moodel-logo-dark.png"

// NEED TO ADD PHOTOS FOR EACH FEATURE, STILL LOOKING FOR DESIGN
export default function FeaturesSection() {
  return (
    <section
  id="features"
  className="relative h-auto w-full bg-[linear-gradient(to_right,rgba(128,128,128,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.2)_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-xl opacity-90" />


      <div className="relative z-10 flex flex-col items-center justify-center space-y-12 px-8 py-16">
      <h1 className="text-5xl font-black text-blue-400">Moodel's Features</h1>
        {/* Features */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* User Authentication and Management */}
          <div className="w-full transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 md:w-1/3">
            <div className="flex items-center gap-4">
              <img src="https://via.placeholder.com/50x50?text=User" alt="User Authentication" className="text-blue-400 text-4xl" />
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-blue-400">User Authentication and Management</h2>
                <p className="text-neutral-600">
                  Users are required to create and sign-in to their accounts before accessing the app, with
                  functionality to edit demographic information and sign out.
                </p>
              </div>
            </div>
          </div>

          {/* Personalized User Profiles */}
          <div className="w-full transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 md:w-1/3">
            <div className="flex items-center gap-4">
              <img src="https://via.placeholder.com/50x50?text=Cog" alt="Personalized User Profiles" className="text-blue-400 text-4xl" />
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-blue-400">Personalized User Profiles</h2>
                <p className="text-neutral-600">
                  Users can customize their profiles, adjusting the theme and personal details to fit their preferences.
                </p>
              </div>
            </div>
          </div>

          {/* Student Submissions Dashboard */}
          <div className="w-full transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 md:w-1/3">
            <div className="flex items-center gap-4">
              <img src="https://via.placeholder.com/50x50?text=File" alt="Student Submissions Dashboard" className="text-blue-400 text-4xl" />
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-blue-400">Student Submissions Dashboard</h2>
                <p className="text-neutral-600">
                  A dashboard that allows students to track their submissions, progress, and receive feedback from teachers.
                </p>
              </div>
            </div>
          </div>

          {/* Teacher Project Dashboard */}
          <div className="w-full transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 md:w-1/3">
            <div className="flex items-center gap-4">
              <img src="https://via.placeholder.com/50x50?text=Check" alt="Teacher Project Dashboard" className="text-blue-400 text-4xl" />
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-blue-400">Teacher Project Dashboard</h2>
                <p className="text-neutral-600">
                  Teachers can track ongoing projects, monitor late submissions, and manage project progress with CRUD capabilities.
                </p>
              </div>
            </div>
          </div>

          {/* Predictive Submission Management Assistant */}
          <div className="w-full transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 md:w-1/3">
            <div className="flex items-center gap-4">
              <img src="https://via.placeholder.com/50x50?text=AI" alt="Predictive Submission Management Assistant" className="text-blue-400 text-4xl" />
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-blue-400">Predictive Submission Management Assistant</h2>
                <p className="text-neutral-600">
                  AI-driven assistant predicts submission trends and optimizes document management, ensuring timely submissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
