import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import UserRoleSelection from "./pages/user-role-selection";
import StudentDashboard from "./pages/student/home";
import StudentLogin from "./pages/student/login";
import StudentSignUp from "./pages/student/signup";
import TeacherDashboard from "./pages/teacher/home";
import TeacherLogin from "./pages/teacher/login";
import TeacherSignUp from "./pages/teacher/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/role" element={<UserRoleSelection />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student">
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/signup" element={<StudentSignUp />} />
          <Route path="/student/home" element={<StudentDashboard />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher">
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacher/signup" element={<TeacherSignUp />} />
          <Route path="/teacher/home" element={<TeacherDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
