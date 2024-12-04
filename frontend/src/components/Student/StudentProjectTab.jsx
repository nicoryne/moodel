import React from "react"
import {
  UserGroupIcon,
  PresentationChartLineIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid"

import { Link, useLocation } from "react-router-dom"

export default function StudentProjectTab({ project, courseId }) {
  const location = useLocation()
  const projectSlug = project.title.replace(/\s+/g, "-").toLowerCase()

  return (
    <div className="flex place-items-center justify-between rounded-lg border-2 border-blue-300 px-8 shadow-md">
      <div className="flex flex-col gap-8 pb-4 pt-8">
        <div className="flex gap-8">
          <div className="flex gap-2">
            <PresentationChartLineIcon className="h-auto w-12 text-blue-400" />
            <div className="flex flex-col">
              <small className="text-xs text-neutral-400">Project Title</small>
              <Link
                to={`${location.pathname.replace(/\/$/, "")}/projects/${projectSlug}`}
                state={{ projectId: project.projectId, courseId: courseId }}
              >
                <h1 className="w-fit border-b-2 border-transparent text-xl font-bold text-blue-400 hover:border-blue-400">
                  {project.title}
                </h1>
              </Link>
            </div>
          </div>
          <div className="flex flex-col border-l-2 px-4">
            <small className="text-xs text-neutral-400">Project Description</small>
            <p className="text-sm font-semibold text-neutral-400">{project.description}</p>
          </div>
        </div>
        <div className="flex gap-8">
          <span className="flex gap-1 text-xs text-neutral-400">
            <CalendarDaysIcon className="h-4 w-auto" /> Created at{" "}
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Manila",
            })}
          </span>
          <span className="flex gap-1 text-xs text-neutral-400">
            <ClockIcon className="h-4 w-auto" /> Deadline on{" "}
            {new Date(project.submissionDeadline).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Manila",
            })}
          </span>
          <span className="flex gap-1 text-xs text-neutral-400">
            <TrophyIcon className="h-4 w-auto" />
            {project.totalPoints} Total Points
          </span>
          <span className="flex gap-1 text-xs text-neutral-400">
            {project.isGroupProject ? (
              <>
                <UserGroupIcon className="h-4 w-auto" />
                Group Submission
              </>
            ) : (
              <>
                <UserIcon className="h-4 w-auto" />
                Individual Submission
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
