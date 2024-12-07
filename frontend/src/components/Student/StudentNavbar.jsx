import React from "react"

import { Link } from "react-router-dom"
import light_logo from "../../assets/moodel-logo-light.png"
import { InboxIcon } from "@heroicons/react/20/solid"
import { ExclamationCircleIcon } from "@heroicons/react/24/solid"
import temp_image from "../../assets/team-members/porter.png"

export default function StudentNavbar({ context }) {
  const { userDetails } = context

  return (
    <header className="h-16 w-full border-b-4 border-blue-300 bg-blue-400">
      <div className="flex h-full justify-between px-8 py-4">
        {/* Title */}
        <Link to="/teacher" className="flex place-items-center">
          <img className="h-auto w-10" src={light_logo} alt="Logo" />
          <h1 className="ease ml-2 font-bold text-neutral-100">Student Dashboard</h1>
        </Link>

        {/* Right Side Controls */}
        <div className="flex place-items-center gap-2">
          {/* Inbox */}
          <button className="rounded-xl border-2 bg-blue-400 p-2 text-white hover:bg-white hover:text-blue-400 active:bg-blue-300">
            <ExclamationCircleIcon className="absolute top-2 ml-3 h-auto w-4 fill-red-400" />
            <InboxIcon className="h-auto w-4" />
          </button>
          {/* Profile Picture */}
          <button>
            <img className="h-auto w-10 rounded-full" src={userDetails.profilePicture} alt="Logo" />
          </button>
        </div>
      </div>
    </header>
  )
}
