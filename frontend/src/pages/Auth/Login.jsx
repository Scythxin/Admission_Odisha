import React, { useState, useEffect } from "react";
import API_BASE from "../../config/api";
import { Link } from "react-router-dom";

import login_img from "../../assets/images/login_img.png";
import { MdEmail, MdSecurity } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi2";
import {
  FaGoogle,
  FaFacebookF,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // OTP States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval;
    if (showOtpModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowOtpModal(false);
      alert("OTP expired. Please try logging in again.");
    }
    return () => clearInterval(interval);
  }, [showOtpModal, timer]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}?r=auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        alert("Login Successful");
        window.location.href = "/";
      } else if (data.status === "needs_verification") {
        setShowOtpModal(true);
        setTimer(60); // Reset timer
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return alert("Please enter 6-digit OTP");

    try {
      const res = await fetch(`${API_BASE}?r=auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        alert("OTP Verified! Login Successful.");
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ff] px-4 relative">
      
      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdSecurity className="text-primary text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Verify OTP</h3>
              <p className="text-sm text-gray-500 mt-2">
                We've sent a 6-digit code to <span className="font-semibold text-gray-700">{email}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="Enter 6-digit OTP"
                  className="w-full text-center text-2xl tracking-[0.5em] font-bold border-b-2 border-gray-200 outline-none focus:border-primary py-2 transition-colors"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  autoFocus
                />
              </div>

              <div className="text-center">
                <span className={`text-sm font-medium ${timer < 10 ? "text-red-500" : "text-gray-500"}`}>
                  Expires in: 00:{timer < 10 ? `0${timer}` : timer}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition shadow-lg shadow-primary/20"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                  className="w-full outline-none text-sm bg-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  className="w-full outline-none text-sm bg-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            <button 
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:opacity-90 transition mt-4 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
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