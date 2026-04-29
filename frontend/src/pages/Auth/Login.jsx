import React, { useState } from "react";
import { useContext } from "react";

import login_img from "../../assets/images/login_img.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi2";


import {
  FaGoogle,
  FaFacebookF,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const handleLogin = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:8080/index.php?r=auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.status === "success") {

    localStorage.setItem("token", data.token); // yahi

    alert("Login Successful");
    window.location.href = "/";

  } else {
    alert(data.message);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ff] px-4">

      {/* Main Card */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* Left Full Image */}
        <div className="hidden md:block h-full">
          <img
            src={login_img}
            alt="login banner"
            className="w-full h-full object-cover object-center"
          />
        </div>

       {/* Right Login */}
<div className="p-8 md:p-10">

  {/* Top Icon */}
  <div className="flex justify-center mb-3">
    <HiOutlineUserCircle className="text-primary text-2xl" />
  </div>

  {/* Title */}
  <div className="mb-6 text-center">
    <h2 className="text-2xl font-bold text-gray-800">
      Welcome Back
    </h2>
    <p className="text-sm text-gray-500">
      Login to your account
    </p>
  </div>

  {/* Form */}
  <form className="space-y-4" onSubmit={handleLogin}>

    {/* Email */}
    <div>
      <label className="text-sm text-gray-600 block mb-1">
        Email Address
      </label>

      <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
        <MdEmail className="text-gray-400 mr-2" />
        <input
  type="email"
  placeholder="Enter your email"
  className="w-full outline-none text-sm"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
      </div>
    </div>

    {/* Password */}
    <div>
      <label className="text-sm text-gray-600 block mb-1">
        Password
      </label>

      <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
        
        <RiLockPasswordLine className="text-gray-400 mr-2" />

       <input
  type={showPassword ? "text" : "password"}
  placeholder="Enter your password"
  className="w-full outline-none text-sm"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

        <span
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div className="text-right mt-2">
        <span className="text-xs text-primary cursor-pointer hover:underline">
          Forgot Password?
        </span>
      </div>
    </div>

    {/* Login Button */}
    <button className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:opacity-90 transition mt-4">
      Login
    </button>
  </form>

  {/* Divider */}
  <div className="text-center text-sm text-gray-400 my-6">
    or continue with
  </div>

  {/* Social Login */}
  <div className="flex gap-3">
    
    {/* Google */}
    <button className="flex items-center justify-center gap-2 border w-full py-2 rounded-md hover:bg-gray-50 transition text-sm">
      <FaGoogle className="text-[#DB4437]" />
      Google
    </button>

    {/* Facebook */}
    <button className="flex items-center justify-center gap-2 border w-full py-2 rounded-md hover:bg-gray-50 transition text-sm">
      <FaFacebookF className="text-[#1877F2]" />
      Facebook
    </button>

  </div>

  {/* Register */}
  <p className="text-center text-sm text-gray-500 mt-6">
    Don't have an account?{" "}
    <Link
      to="/register"
      className="text-primary font-medium hover:underline"
    >
      Register
    </Link>
  </p>

</div>
      </div>
    </div>
  );
};

export default Login;