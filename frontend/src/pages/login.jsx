import React from "react";

import { login } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    let data = login(email, password, "teacher");
    if (data) {
      localStorage.setItem("data", JSON.stringify(data));
      navigate("/teacher/home");
    }
  };

  return (
    <>
      <section className="w-full h-full">
        {/* Form */}
        <LoginForm />
      </section>
    </>
  );
}
