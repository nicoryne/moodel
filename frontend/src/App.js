import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import StudentDashboard from "./pages/student/student-dashboard";
import TeacherDashboard from "./pages/teacher/teacher-dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { AuthProvider } from "./middleware/AuthProvider";
import PrivateRoutes from "./middleware/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* General Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
          {/* Student Routes */}
          <Route path="/student">
              <Route path="/student/home" element={<StudentDashboard />} />
            </Route>

            {/* Teacher Routes */}
            <Route path="/teacher">
              <Route path="/teacher/home" element={<TeacherDashboard />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
