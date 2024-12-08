import React, { useEffect, useState } from "react"
import { Link, useOutletContext } from "react-router-dom"
import dark_logo from "../../assets/moodel-logo-dark.png"
import Modal from "../../components/Modal"
import {
  ClockIcon,
  BookOpenIcon,
  PhoneIcon,
  UserCircleIcon,
  CakeIcon,
  HomeIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid"
import { useAuth } from "../../middleware/AuthProvider"
import StudentCourseTab from "../../components/Student/StudentCourseTab"
import { decryptJoinCode } from "../../lib/utils/courseEncryptor"
import { createStudentCourseEnrollment, getSubmissionsByStudentId } from "../../services/index"

export default function StudentHome() {
  const { cookies, reloadUser } = useAuth()
  const { userDetails } = useOutletContext()

  const timeNow = new Date()
  const [submissionsYear, setSubmissionsYear] = React.useState(timeNow.getFullYear())
  const [mySubmissions, setMySubmissions] = React.useState(null)

  React.useEffect(() => {
    const fetchSubmissions = async () => {
      if (userDetails?.studentId) {
        try {
          const data = await getSubmissionsByStudentId(userDetails.studentId, cookies.token)

          if (data) {
            setMySubmissions(data)
          }
        } catch (error) {
          console.error("Error fetching submissions:", error)
        }
      }
    }

    fetchSubmissions()
  }, [cookies.token, userDetails.studentId])

  // documention because this looks confusing lol
  const getAllDaysGroupedByMonth = (year, submissions) => {
    // step 1: turn the submissions array into a map (key-value pairs) grouped by date.
    // - key: a normalized string representation of the date (e.g., "Mon Nov 11 2024").
    // - value: the count of submissions on that specific date.
    const submissionsCountByDate = submissions.reduce((acc, submission) => {
      const submissionDate = new Date(submission.submissionDate).toDateString() // ignore time for normalization
      acc[submissionDate] = (acc[submissionDate] || 0) + 1 // counts the submissions for each date
      return acc
    }, {})

    // step 2: generate an array for all 12 months of the year.
    return Array.from({ length: 12 }, (_, month) => ({
      // `month`: get the short name of the month (e.g., "Jan").
      month: new Date(year, month, 1).toLocaleString("en-US", { month: "short" }),

      // `days`: generate an array for all the days in the current month.
      days: Array.from(
        { length: new Date(year, month + 1, 0).getDate() }, // number of days in the month
        (_, day) => {
          // create a Date object for the current day.
          const currentDate = new Date(year, month, day + 1).toDateString()

          // return the day object with the date and number of submissions.
          return {
            date: new Date(year, month, day + 1), // full Date object for precise representation
            submissions: submissionsCountByDate[currentDate] || 0, // get submission count or default to 0
          }
        },
      ),
    }))
  }

  const [submissionsByMonth, setSubmissionsByMonth] = React.useState([])

  React.useEffect(() => {
    if (mySubmissions) {
      setSubmissionsByMonth(getAllDaysGroupedByMonth(submissionsYear, mySubmissions))
    }
  }, [mySubmissions, submissionsYear])

  // Courses Filter Rendering
  const [renderCourses, setRenderCourses] = React.useState(userDetails.courses)
  const [courseFilter, setCourseFilter] = React.useState("")

  React.useEffect(() => {
    if (courseFilter === "") {
      setRenderCourses(userDetails.courses)
    } else {
      const filteredCourses = userDetails.courses.filter((courseData) =>
        courseData.course.title.toLowerCase().includes(courseFilter.toLowerCase()),
      )
      setRenderCourses(filteredCourses)
    }
  }, [courseFilter, userDetails.courses])

  // Modal
  const [showJoinCourseModal, setJoinCourseModal] = React.useState(false)
  const [modalProps, setModalProps] = React.useState(null)

  // Join Course
  const [joinCode, setJoinCode] = React.useState("")

  const resetJoinCourse = () => {
    setJoinCode("")
    setJoinCourseModal(false)
    setModalProps(false)
  }

  const handleJoinCourse = () => {
    if (joinCode) {
      try {
        let courseId = decryptJoinCode(joinCode)

        if (courseId) {
          let formData = {
            studentCourseId: {
              studentId: cookies.user.studentId,
              courseId: courseId,
            },
            createdAt: new Date(),
            isVerified: false,
          }

          createStudentCourseEnrollment(formData, cookies.token)
            .then(() => {
              setModalProps({
                title: "Success",
                message: "Please wait for the teacher to verify your enrollment.",
                type: "success",
              })

              setTimeout(async () => {
                reloadUser()
                resetJoinCourse()
              }, 2000)
            })
            .catch((error) => {
              console.error("Error joining course:", error)
              setModalProps({
                title: "Error",
                message: "Failed to join the course. Please try again.",
                type: "error",
                onCancel: () => resetJoinCourse(),
              })
            })
        } else {
          setModalProps({
            title: "Invalid Code",
            message: "The join code is invalid.",
            type: "error",
            onCancel: () => resetJoinCourse(),
          })
        }
      } catch (error) {
        console.error("Error processing join code:", error)
        setModalProps({
          title: "Error",
          message: "An error occurred while processing the join code. Please try again.",
          type: "error",
          onCancel: () => resetJoinCourse(),
        })
      }
    } else {
      setModalProps({
        title: "Invalid Input",
        message: "Please enter a valid join code.",
        type: "error",
        onCancel: () => resetJoinCourse(),
      })
    }
  }

  return (
    <>
      {showJoinCourseModal && (
        <Modal
          ModalProps={{
            title: "Joining a Course",
            type: "OK",
            children: (
              <form className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                  <label htmlFor="join-code" className="text-sm font-semibold text-neutral-500">
                    Enter code provided by your Teacher
                  </label>
                  <input
                    type="text"
                    id="join-code"
                    name="join-code"
                    className="rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                  ></input>
                </div>
              </form>
            ),
            onCancel: () => resetJoinCourse(),
            onConfirm: () => handleJoinCourse(),
          }}
        />
      )}
      {modalProps && <Modal ModalProps={modalProps} />}
      <div className="mx-auto flex gap-8 p-8 md:w-[900px] lg:w-[1100px]">
        {/* Profile */}
        <section className="flex w-72 flex-col gap-4">
          {userDetails.profilePicture ? (
            <img
              className="rounded-full border-2"
              width={256}
              height={256}
              src={userDetails.profilePicture}
              alt="Profile"
            />
          ) : (
            <UserCircleIcon width={256} height={256} className="rounded-full border-2 text-neutral-400" />
          )}
          {/* Name and Email */}
          <div>
            <h2 className="text-3xl font-bold text-neutral-600">
              {userDetails.fname} {userDetails.lname}
            </h2>
            <span className="text-base text-neutral-400">{userDetails.email}</span>
          </div>
          <Link
            to="/student/profile"
            className="rounded-md border-2 border-blue-200 bg-blue-400 p-1 text-center text-sm font-bold text-white hover:bg-blue-300"
          >
            Edit Profile
          </Link>
          <div className="flex gap-1 text-sm">
            <AcademicCapIcon className="h-auto w-4 text-neutral-400" />
            <span className="font-bold text-neutral-400">{userDetails.courses?.length}</span>
            <span className="text-neutral-400">Courses Enrolled</span>
          </div>
          <div className="flex gap-1 border-b-2 pb-2 text-sm">
            <ClockIcon className="h-auto w-4 text-neutral-400" />
            <span className="font-bold text-neutral-400">
              {timeNow.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="text-neutral-300">
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
            <PhoneIcon className="h-auto w-4 text-neutral-400" />
            <span className="text-neutral-400">{userDetails.phoneNumber}</span>
          </div>
          <div className="flex gap-1 text-sm">
            <CakeIcon className="h-auto w-4 text-neutral-400" />
            <span className="text-neutral-400">
              {new Date(userDetails.birthdate).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex w-full gap-1 text-sm">
            <HomeIcon className="h-auto w-4 text-neutral-400" />
            <span className="text-neutral-400">{userDetails.address}</span>
          </div>
        </section>

        {/* Details */}
        <section className="w-full">
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
                  setJoinCourseModal(true)
                }}
              >
                <BookOpenIcon className="h-auto w-4" /> Join
              </button>
            </aside>
            <div>
              <ul>
                {renderCourses.length > 0 ? (
                  renderCourses.map((courseData, index) => (
                    <StudentCourseTab courseData={courseData} key={index} token={cookies.token} />
                  ))
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
