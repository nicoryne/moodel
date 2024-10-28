import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import StudentDashboard from "./pages/student/student-dashboard";
import TeacherDashboard from "./pages/teacher/teacher-dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Test from "./pages/teacher/test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student">
          <Route path="/student/home" element={<StudentDashboard />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher">
          <Route path="/teacher/home" element={<TeacherDashboard />} />
          <Route path="/teacher/testConnection" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
