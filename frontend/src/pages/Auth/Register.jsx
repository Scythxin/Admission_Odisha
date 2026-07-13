import React, { useState } from "react";
import API_BASE from "../../config/api";
import { Link } from "react-router-dom";
import { MdEmail, MdLocationCity } from "react-icons/md";
import { RiLockPasswordLine, RiUserLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { GoogleLogin } from "@react-oauth/google";
import registerIllustration from "../../assets/images/register.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}?r=auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        alert(data.message);
        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log("Error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?r=auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });
      const data = await res.json();
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Google Signup Successful");
        if (data.user.is_admin === 1) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/";
        }
      } else {
        alert(data.message || "Google Signup failed");
      }
    } catch (err) {
      console.log("Error:", err);
      alert("Something went wrong with Google Signup");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    alert("Google Signup Failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ff] px-4 py-8">
      {/* Main Card */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Left Panel - Full Image like Login page */}
        <div className="hidden md:flex h-full items-center justify-center bg-gray-50 p-8">
          
          <img 
            src={registerIllustration} 
            alt="Registration Illustration"
            className="w-full h-full object-contain object-center"
          />
        </div>

        {/* Right Register Form */}
        <div className="p-8 md:p-10 lg:p-12">
          
          {/* Top Icon */}
          <div className="flex justify-center mb-4">
            <HiOutlineUserGroup className="text-primary text-3xl" />
          </div>

          {/* Title */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Join us and start your journey
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600 block mb-1.5">
                Full Name
              </label>
              <div className="flex items-center border border-gray-200 rounded-md px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary">
                <RiUserLine className="text-gray-400 mr-2 text-lg" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full outline-none text-sm bg-transparent"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600 block mb-1.5">
                Email Address
              </label>
              <div className="flex items-center border border-gray-200 rounded-md px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary">
                <MdEmail className="text-gray-400 mr-2 text-lg" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full outline-none text-sm bg-transparent"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone & City - Two columns */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1.5">
                  Phone Number
                </label>
                <div className="flex items-center border border-gray-200 rounded-md px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary">
                  <FiPhone className="text-gray-400 mr-2 text-lg" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    className="w-full outline-none text-sm bg-transparent"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1.5">
                  City
                </label>
                <div className="flex items-center border border-gray-200 rounded-md px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary">
                  <MdLocationCity className="text-gray-400 mr-2 text-lg" />
                  <input
                    type="text"
                    name="city"
                    placeholder="Your city"
                    className="w-full outline-none text-sm bg-transparent"
                    value={form.city}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                  name="password"
                  placeholder="Create a password"
                  className="w-full outline-none text-sm bg-transparent"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 cursor-pointer hover:text-primary transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1.5">
                Password must be at least 6 characters
              </p>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2.5 rounded-md font-semibold hover:opacity-90 transition mt-4 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">or sign up with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Signup Button */}
          <div className="flex justify-center w-full [&>div]:w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="outline"
              size="large"
              shape="rectangular"
              width="360"
            />
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;