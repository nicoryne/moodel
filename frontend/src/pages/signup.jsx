import React from "react";
import { Link } from "react-router-dom";

export default function StudentSignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [role, setRole] = React.useState("student");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <>
      <h1>Signup</h1>
      <p>This is signup</p>
    </>
  );
}
