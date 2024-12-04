import React from "react"
import { UserIcon, ArrowRightStartOnRectangleIcon, HomeIcon } from "@heroicons/react/24/outline"
import { useAuth } from "../../middleware/AuthProvider"
import { Link } from "react-router-dom"

const sidebarLinks = [
  { text: "Home", href: "/teacher/", icon: HomeIcon },
  { text: "Profile", href: "/teacher/profile", icon: UserIcon },
]

export default function TeacherSidebar() {
  const { removeAuth } = useAuth()
  const [isMaximized, setIsMaximized] = React.useState(false)

  return (
    <aside
      className={`transition-width inset-y-0 left-0 z-40 min-h-screen border-r-2 border-blue-300 bg-blue-400 shadow-md duration-200 ${
        isMaximized ? "w-16 md:w-48" : "w-16"
      }`}
      onMouseEnter={() => setIsMaximized(true)}
      onMouseLeave={() => setIsMaximized(false)}
    >
      {/* Wrapper */}
      <nav className="flex h-full min-w-full flex-col place-items-start justify-start space-y-4 py-12">
        {/* Pages Section */}
        <section className="min-w-full border-b-2 border-blue-300 py-4">
          <ul className="space-y-4">
            {sidebarLinks.map((sideLink, index) => {
              const IconComponent = sideLink.icon

              return (
                <li
                  key={index}
                  className="rounded-sm px-5 py-2 text-neutral-200 hover:text-neutral-50 hover:drop-shadow-md"
                >
                  <Link to={sideLink.href} className="flex items-center">
                    <IconComponent className="h-auto w-6" aria-hidden="true" />

                    <span
                      className={`duration-400 ease ml-2 transform text-xs transition-opacity ${isMaximized ? "hidden opacity-0 md:block md:opacity-100" : "hidden opacity-0"}`}
                    >
                      {sideLink.text}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        <button
          onClick={removeAuth}
          className="flex min-w-full place-items-center rounded-sm px-5 py-2 text-neutral-200 hover:text-neutral-50 hover:drop-shadow-md"
        >
          <ArrowRightStartOnRectangleIcon className="h-auto w-6" />
          <span
            className={`duration-400 ease ml-2 transform text-xs transition-opacity ${isMaximized ? "hidden opacity-0 md:block md:opacity-100" : "hidden opacity-0"}`}
          >
            Logout
          </span>
        </button>
      </nav>
    </aside>
  )
}
