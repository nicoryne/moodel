import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { login } from "../services/auth"


export default function LoginForm() {
    const navigate = useNavigate();
    const [passwordHidden, togglePasswordHidden] = React.useState(false);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [role, setRole] = React.useState(null);

    const handleLogin = () => {
        
        if(!email || !password || !role) {
            // TODO: handle no input
            return 
        }

        let data = login(email, password, role);

        if (data) {
          localStorage.setItem("data", JSON.stringify(data));
          navigate(`/${role}/home`);
        }
    };

    return (
        <form className="w-80 md:w-96 h-fit mx-auto my-32 text-[#212121] border-blue-200 border-2 rounded-md p-8 space-y-4">
            <div>
                <Link></Link>
                <Link></Link>
            </div>
            {/* Form Group */}
            {/* Email */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="font-bold">Email</label>
                <input
                    name="email"
                    id="email"
                    className="p-1 border-blue-200 border-b-2 outline-none active:border-blue-300"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {/* Password */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="font-bold">Password</label>
                <div className="flex w-full space-x-1 border-b-2 border-blue-200 active:border-blue-300 outline-blue-400">
                    <input
                        name="password"
                        id="password"
                        className="p-1 flex-1 outline-none"
                        type={passwordHidden ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!passwordHidden ? (
                        <EyeIcon
                            className="h-auto w-8 px-1 cursor-pointer text-neutral-400"
                            onClick={() => togglePasswordHidden(true)}
                        />
                    ) : (
                        <EyeSlashIcon
                            className="h-auto w-8 px-1 cursor-pointer text-neutral-400"
                            onClick={() => togglePasswordHidden(false)}
                        />
                    )}
                </div>
                {/* Role Selection */}
                <div className="space-y-2 py-4">
                    <label htmlFor="role-type" className="font-bold">Login as a</label>
                    <div className="flex space-x-4">
                        <div className="space-x-2">
                            <input
                                type="radio"
                                id="teacher"
                                name="role-type"
                                value="teacher"
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="teacher">Teacher</label>
                        </div>
                        <div className="space-x-2">
                            <input
                                type="radio"
                                id="student"
                                name="role-type"
                                value="student"
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="student">Student</label>
                        </div>
                    </div>
                </div>
            </div>
            {/* Login */}
            <button className="w-full rounded-md text-white bg-blue-400 p-1 font-bold" onClick={handleLogin}>Login</button>
        </form>
    );
}
