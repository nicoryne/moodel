import React from "react"
import { Link, useOutletContext } from "react-router-dom"
import dark_logo from "../../assets/moodel-logo-dark.png"
import temp_image from "../../assets/team-members/porter.png"
import Modal from "../../components/Modal"
import { BriefcaseIcon, ClockIcon, BookOpenIcon, PhoneIcon, CakeIcon, HomeIcon } from "@heroicons/react/24/solid"
import { useAuth } from "../../middleware/AuthProvider"
import TeacherCourseTab from "../../components/Teacher/TeacherCourseTab"
import { createCourse, createTeacherCourseOwnership, getStudentCourseEnrollmentsByCourseId } from "../../services/index"
import TeacherCourseRequest from "../../components/Teacher/TeacherCourseRequest"

export default function TeacherHome() {
  const { cookies, reloadUser } = useAuth()
  const { userDetails } = useOutletContext()

  // Submissions Graph
  const timeNow = new Date()

  const [sortedCourses, setSortedCourses] = React.useState(null)
  const [renderCourses, setRenderCourses] = React.useState(null)
  const [courseFilter, setCourseFilter] = React.useState("")

  // Course Requests

  const [courseRequests, setCourseRequests] = React.useState(new Set())

  React.useEffect(() => {
    const fetchCourseRequests = async () => {
      let courses = userDetails.courses

      if (!courses) {
        return
      }

      for (let course of courses) {
        let courseId = course.course.courseId

        let enrollments = await getStudentCourseEnrollmentsByCourseId(courseId, cookies.token)

        enrollments.forEach((enrollment) => {
          if (!enrollment.isVerified) {
            let courseRequest = {
              courseId: enrollment.course.courseId,
              courseTitle: enrollment.course.title,
              studentId: enrollment.student.studentId,
              studentName: enrollment.student.fname + " " + enrollment.student.lname,
              studentEmail: enrollment.student.email,
              createdAt: enrollment.createdAt,
              teacherEmail: userDetails.email,
            }

            setCourseRequests((prev) => new Set(prev).add(JSON.stringify(courseRequest)))
          }
        })
      }
    }

    fetchCourseRequests()
  }, [userDetails.courses, cookies, userDetails.email])

  const handleRequest = (requestToRemove) => {
    setCourseRequests((prevRequests) => {
      const updatedRequests = new Set([...prevRequests])
      updatedRequests.delete(JSON.stringify(requestToRemove))
      return updatedRequests
    })
  }

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
          setModalProps({
            title: "Success",
            message: "Course created successfully!",
            type: "success",
          })

          setTimeout(async () => {
            reloadUser()
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
        <section className="w-full">
          {/* Course Requests  */}
          <div className="flex flex-col gap-3 border-b-2 py-6">
            <h2 className="text-lg font-bold text-neutral-600">Course Enrollment Requests</h2>
            {courseRequests?.size > 0 ? (
              <div>
                {[...courseRequests].map((request, index) => {
                  const parsedRequest = JSON.parse(request)
                  return (
                    <TeacherCourseRequest
                      key={index}
                      request={parsedRequest}
                      token={cookies.token}
                      onRequestHandled={() => handleRequest(parsedRequest)}
                    />
                  )
                })}
              </div>
            ) : (
              <div className="mx-auto flex w-fit flex-col text-center">
                <img className="mx-auto w-32 opacity-30" src={dark_logo} alt="Moodel Logo" width={64} height={64} />
                <p className="font-semibold text-neutral-400">No Course Enrollment Requests Found</p>
              </div>
            )}
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
