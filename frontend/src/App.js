import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./middleware/AuthProvider"

import Landing from "./pages/landing"
import Layout from "./pages/layout"
import LoginPage from "./pages/login"
import SignUpPage from "./pages/signup"
import Unauthorized from "./pages/unauthorized"

import StudentHome from "./pages/student/home"
import StudentLayout from "./pages/student/layout"
import StudentProfile from "./pages/student/profile"

import TeacherHome from "./pages/teacher/home"
import TeacherLayout from "./pages/teacher/layout"
import TeacherProfile from "./pages/teacher/profile"
import TeacherCourseView from "./pages/teacher/course-view"

import AdminLayout from "./pages/admin/admin-layout"
import AdminTeachers from "./pages/admin/admin-teachers"
import AdminStudents from "./pages/admin/admin-students"
import AdminLoginPage from "./pages/admin-login"
import AdminCourses from "./pages/admin/admin-courses"

import PrivateRoutes from "./middleware/ProtectedRoutes"
import TeacherProjectView from "./pages/teacher/project-view"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Navbar Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
          </Route>

          {/* Non-navbar Routes */}
          <Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>

          {/* Private Routes */}
          {/* Student Routes */}
          <Route element={<PrivateRoutes allowedRoles={["student"]} />}>
            <Route path="/student" element={<StudentLayout />}>
              <Route path="" element={<StudentHome />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>
          </Route>

          {/* Teacher Routes */}
          <Route element={<PrivateRoutes allowedRoles={["teacher"]} />}>
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route path="" element={<TeacherHome />} />
              <Route path="profile" element={<TeacherProfile />} />
              <Route path="courses/:courseName" element={<TeacherCourseView />} />
              <Route path="courses/:courseName/projects/:projectName" element={<TeacherProjectView />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<PrivateRoutes allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="courses" element={<AdminCourses />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
