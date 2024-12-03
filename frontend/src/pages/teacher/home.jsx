import React from "react"
import { Link } from "react-router-dom"
import { TeacherContext } from "./layout"
import dark_logo from "../../assets/moodel-logo-dark.png"
import temp_image from "../../assets/team-members/porter.png"
import Modal from "../../components/Modal"
import {
  BriefcaseIcon,
  ClockIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  PhoneIcon,
  CakeIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import { useAuth } from "../../middleware/AuthProvider"
import TeacherCourseTab from "../../components/Teacher/TeacherCourseTab"
import { createCourse, teacherGetByEmail, createTeacherCourseOwnership } from "../../services/index"
import { encryptCourseId, decryptJoinCode } from "../../lib/utils/courseEncryptor"
import { enc } from "crypto-js"

export default function TeacherHome() {
  const userDetails = React.useContext(TeacherContext)
  const { cookies, updateUser } = useAuth()

  // Submissions Graph
  const timeNow = new Date()
  const [submissionsYear, setSubmissionsYear] = React.useState(timeNow.getFullYear())
  const getAllDaysGroupedByMonth = (year) =>
    Array.from({ length: 12 }, (_, month) => ({
      month: new Date(year, month, 1).toLocaleString("en-US", { month: "short" }),
      days: Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, day) => ({
        date: new Date(year, month, day + 1),
        submissions: Math.floor(Math.random() * 10),
      })),
    }))
  const [submissionsByMonth, setSubmissionsByMonth] = React.useState(getAllDaysGroupedByMonth(submissionsYear))

  const [sortedCourses, setSortedCourses] = React.useState(null)
  const [renderCourses, setRenderCourses] = React.useState(null)
  const [courseFilter, setCourseFilter] = React.useState("")

  // Sorting
  React.useEffect(() => {
    if (userDetails.courses) {
      let sortedCourses = userDetails.courses.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)

        if (dateB - dateA !== 0) {
          return dateB - dateA
        }

        const titleA = a.course.title.toLowerCase()
        const titleB = b.course.title.toLowerCase()
        return titleA.localeCompare(titleB)
      })

      setSortedCourses(sortedCourses)
      setRenderCourses(sortedCourses)
    }
  }, [userDetails.courses])

  // Search Filter
  React.useEffect(() => {
    if (courseFilter === "") {
      setRenderCourses(sortedCourses)
    } else {
      const filteredCourses = sortedCourses.filter((courseData) =>
        courseData.course.title.toLowerCase().includes(courseFilter.toLowerCase()),
      )
      setRenderCourses(filteredCourses)
    }
  }, [courseFilter, sortedCourses])

  // Modal
  const [showCreateCourseModal, setShowCreateCourseModal] = React.useState(false)
  const [modalProps, setModalProps] = React.useState(null)

  // Create Course
  const [courseTitle, setCourseTitle] = React.useState("")
  const [courseDescription, setCourseDescription] = React.useState("")

  const resetCreateCourse = () => {
    setCourseTitle("")
    setCourseDescription("")
    setShowCreateCourseModal(false)
    setModalProps(null)
  }

  const handleCourseCreation = () => {
    if (courseTitle && courseDescription) {
      let formData = {
        title: courseTitle,
        description: courseDescription,
        createdAt: new Date().toLocaleDateString("en-CA"),
      }

      createCourse(formData, cookies.token)
        .then((newCourse) => {
          let ownershipData = {
            teacherCourseId: {
              teacherId: cookies.user.teacherId,
              courseId: newCourse.courseId,
            },
            createdAt: formData.createdAt,
          }
          createTeacherCourseOwnership(ownershipData, cookies.token)

          let encrypedCode = encryptCourseId(newCourse.courseId)

          console.log("Encryped Code: " + encrypedCode)

          setModalProps({
            title: "Success",
            message: "Course created successfully!",
            type: "success",
          })

          setTimeout(async () => {
            let newTeacher = await teacherGetByEmail(userDetails.email, cookies.token)
            updateUser(newTeacher)
            resetCreateCourse()
          }, 2000)
        })
        .catch((error) => {
          console.error("Error creating a course:", error)
          setModalProps({
            title: "Error",
            message: "Failed to create a course. Please try again.",
            type: "error",
            onCancel: () => resetCreateCourse(),
          })
        })
    } else {
      setModalProps({
        title: "Invalid Input",
        message: "Invalid fields.",
        type: "error",
        onCancel: () => resetCreateCourse(),
      })
    }
  }

  return (
    <>
      {showCreateCourseModal && (
        <Modal
          ModalProps={{
            title: "Creating a Course",
            type: "OK",
            children: (
              <form className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="course-title" className="text-sm font-semibold text-neutral-500">
                      Title
                    </label>
                    <input
                      type="text"
                      id="course-title"
                      name="course-title"
                      className="rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                    ></input>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="course-description" className="text-sm font-semibold text-neutral-500">
                      Description
                    </label>
                    <textarea
                      id="course-description"
                      name="course-description"
                      rows="3"
                      className="resize-none rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </form>
            ),
            onCancel: () => resetCreateCourse(),
            onConfirm: () => handleCourseCreation(),
          }}
        />
      )}
      {modalProps && <Modal ModalProps={modalProps} />}
      <div className="mx-auto flex gap-8 p-8 md:w-[900px] lg:w-[1100px]">
        {/* Profile */}
        <section className="flex w-72 flex-col gap-4">
          <img className="rounded-full border-2" src={temp_image} width={256} height={256} alt="Profile" />
          {/* Name and Email */}
          <div>
            <h2 className="text-3xl font-bold text-neutral-600">
              {userDetails.fname} {userDetails.lname}
            </h2>
            <span className="text-base text-neutral-400">{userDetails.email}</span>
          </div>
          <Link
            to="/teacher/profile"
            className="rounded-md border-2 border-blue-200 bg-blue-400 p-1 text-center text-sm font-bold text-white hover:bg-blue-300"
          >
            Edit Profile
          </Link>
          <div className="flex gap-1 text-sm">
            <BriefcaseIcon className="h-auto w-4 text-blue-300" />
            <span className="font-bold text-blue-400">{userDetails.courses?.length}</span>
            <span className="text-blue-300">Courses Active</span>
          </div>
          <div className="flex gap-1 border-b-2 pb-2 text-sm">
            <ClockIcon className="h-auto w-4 text-blue-300" />
            <span className="font-bold text-blue-400">
              {timeNow.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="text-blue-300">
              {timeNow
                .toLocaleTimeString("en-US", {
                  second: "2-digit",
                  timeZoneName: "short",
                })
                .substring(2)}
            </span>
          </div>
          <h3 className="text-xs font-semibold text-neutral-400">Account Details</h3>
          <div className="flex gap-1 text-sm">
            <PhoneIcon className="h-auto w-4 text-blue-300" />
            <span className="text-blue-300">{userDetails.phoneNumber}</span>
          </div>
          <div className="flex gap-1 text-sm">
            <CakeIcon className="h-auto w-4 text-blue-300" />
            <span className="text-blue-300">
              {new Date(userDetails.birthdate).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex w-full gap-1 text-sm">
            <HomeIcon className="h-auto w-4 text-blue-300" />
            <span className="text-blue-300">{userDetails.address}</span>
          </div>
        </section>

        {/* Details */}
        <section>
          {/* Contribution Graph */}
          <div className="flex flex-col gap-3 border-b-2 py-6">
            <h2 className="text-lg font-bold text-neutral-600">Submissions in {submissionsYear}</h2>
            <div className="flex flex-col gap-1">
              {/* Month Labels */}
              <div className="flex items-center justify-between text-sm text-neutral-400">
                {submissionsByMonth.map((monthData) => (
                  <span key={monthData.month}>{monthData.month}</span>
                ))}
              </div>
              {/* Submissions Grid */}
              <div className="grid grid-cols-12 gap-1">
                {submissionsByMonth.map((monthData, monthIndex) => (
                  <div key={monthIndex} className="grid grid-flow-col grid-rows-8 gap-1">
                    {monthData.days.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="h-3 w-3 rounded"
                        style={{
                          backgroundColor:
                            day.submissions > 0 // if no submissions then set to default grayish color
                              ? `rgba(96, 165, 250, ${day.submissions / 10})`
                              : "rgba(209, 213, 219, 1)",
                        }}
                        title={`${day.date.toDateString()} - ${day.submissions} submissions`}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="flex flex-col gap-2 py-8">
            <h2 className="text-lg font-bold text-neutral-600">Courses</h2>
            <aside className="flex justify-between gap-2">
              <input
                className="flex-1 rounded-md border-2 py-1 indent-2 text-sm text-neutral-600 focus:outline-blue-400"
                type="text"
                placeholder="Find a course.."
                onChange={(e) => setCourseFilter(e.target.value)}
              />
              <button
                type="button"
                className="flex place-items-center gap-2 rounded-lg bg-blue-400 px-6 py-2 text-sm font-bold text-white hover:bg-blue-300"
                onClick={(e) => {
                  setShowCreateCourseModal(true)
                }}
              >
                <BookOpenIcon className="h-auto w-4" /> Create
              </button>
            </aside>
            <div>
              <ul>
                {renderCourses?.length > 0 ? (
                  renderCourses.map((courseData, index) => <TeacherCourseTab courseData={courseData} key={index} />)
                ) : (
                  <div className="mx-auto flex w-fit flex-col text-center">
                    <img className="w-80 opacity-30" src={dark_logo} alt="Moodel Logo" width={256} height={256} />
                    <p className="font-semibold text-neutral-400">No Courses Found</p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
