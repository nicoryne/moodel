import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./middleware/AuthProvider"

import Landing from "./pages/landing"
import Layout from "./pages/layout"
import LoginPage from "./pages/login"
import SignUpPage from "./pages/signup"
import Unauthorized from "./pages/unauthorized"

import StudentCourses from "./pages/student/student-courses"
import StudentLayout from "./pages/student/student-layout"
import StudentProfilePage from "./pages/student/student-profile"

import TeacherLayout from "./pages/teacher/teacher-layout"
import TeacherProfile from "./pages/teacher/teacher-profile"
import TeacherCourses from "./pages/teacher/teacher-courses"

import AdminLayout from "./pages/admin/admin-layout"
import AdminTeachers from "./pages/admin/admin-teachers"
import AdminStudents from "./pages/admin/admin-students"
import AdminLoginPage from "./pages/admin-login"
import AdminCourses from "./pages/admin/admin-courses"

import PrivateRoutes from "./middleware/ProtectedRoutes"

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
              <Route path="courses" element={<StudentCourses />} />
              <Route path="profile" element={<StudentProfilePage />} />
            </Route>
          </Route>

          {/* Teacher Routes */}
          <Route element={<PrivateRoutes allowedRoles={["teacher"]} />}>
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route path="courses" element={<TeacherCourses />} />
              <Route path="profile" element={<TeacherProfile />} />
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
