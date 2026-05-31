import React, { useState, useEffect } from "react";
import API_BASE from "../../config/api";
import { Link } from "react-router-dom";

import login_img from "../../assets/images/loginnn.png";
import { MdEmail, MdSecurity } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
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
    // Show the OTP modal immediately without waiting for the backend response
    setShowOtpModal(true);
    setTimer(120);

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
        setShowOtpModal(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login Successful");

        if (data.user.is_admin === 1) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/";
        }
      } else if (data.status === "needs_verification") {
        // Modal is already open and timer is already running, so nothing more to do
      } else {
        // Close the modal and show the error message if login fails
        setShowOtpModal(false);
        alert(data.message);
      }
    } catch (err) {
      setShowOtpModal(false);
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
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("OTP Verified! Login Successful.");

        if (data.user.is_admin === 1) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/";
        }
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
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100">
      
      {/* Top Gradient Bar */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>
      
      <div className="p-8">
        <div className="text-center mb-6">
          {/* Animated Icon Container */}
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-primary to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h3>
          <p className="text-gray-500 text-sm">
            We've sent a 6-digit code to
          </p>
          <p className="font-semibold text-gray-800 text-sm mt-1 bg-gray-100 inline-block px-3 py-1 rounded-full">
            {email}
          </p>
        </div>

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          {/* OTP Input Fields - 6 Separate Boxes */}
          <div className="flex justify-center gap-2 sm:gap-3">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 bg-gray-50/50"
                value={otp[index] || ""}
                onChange={(e) => {
                  const newOtp = otp.split('');
                  newOtp[index] = e.target.value.replace(/\D/g, '');
                  setOtp(newOtp.join(''));
                  if (e.target.value && index < 5) {
                    const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`);
                    if (nextInput) nextInput.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !otp[index] && index > 0) {
                    const prevInput = document.querySelector(`input[name="otp-${index - 1}"]`);
                    if (prevInput) prevInput.focus();
                  }
                }}
                name={`otp-${index}`}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Timer with Circular Progress */}
          <div className="relative flex justify-center">
            <div className="relative w-14 h-14">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke={timer < 10 ? "#EF4444" : "#6366F1"}
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${(timer / 60) * 150.8} 150.8`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xs font-bold ${timer < 10 ? "text-red-500" : "text-primary"}`}>
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Resend Option */}
          {timer === 0 && (
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-primary font-medium text-sm hover:underline transition"
              >
                Resend OTP
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowOtpModal(false)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={otp.length !== 6}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95"
            >
              Verify & Continue
            </button>
          </div>
        </form>
      </div>
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

        {/* Right Login - Adjusted with better spacing */}
        <div className="p-8 md:p-10 lg:p-12">
          
          {/* Top Icon */}
          <div className="flex justify-center mb-4">
            <HiOutlineUserCircle className="text-primary text-3xl" />
          </div>

          {/* Title */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Login to your account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600 block mb-1.5">
                Email Address
              </label>

              <div className="flex items-center border border-gray-200 rounded-md px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary">
                <MdEmail className="text-gray-400 mr-2 text-lg" />
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
              <label className="text-sm text-gray-600 block mb-1.5">
                Password
              </label>

              <div className="flex items-center border border-gray-200 rounded-md px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary">

                <RiLockPasswordLine className="text-gray-400 mr-2 text-lg" />

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
                  className="text-gray-500 cursor-pointer hover:text-primary transition"
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
              className="w-full bg-primary text-white py-2.5 rounded-md font-semibold hover:opacity-90 transition mt-6 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register - Direct link without divider */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
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
    </div>
  );
};

export default Login;

