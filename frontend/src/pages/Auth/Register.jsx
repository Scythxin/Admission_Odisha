import React, { useState, useContext } from "react";
import API_BASE from "../../config/api";
import { Link } from "react-router-dom";
import login_img from "../../assets/images/login_img.png";
import { MdEmail, MdPerson, MdLocationCity, MdPhone } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    city: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", form);

    try {
      const res = await fetch(`${API_BASE}?r=auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.status === "success") {
        alert("Registered Successfully");
        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log("Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-24 md:py-12">
      {/* Main Card */}
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl overflow-hidden mt-10 md:mt-0">
        
        {/* Right Register */}
        <div className="p-8 md:p-10">
          
          {/* Top Icon */}
          <div className="flex justify-center mb-3">
            <HiOutlineUserAdd className="text-primary text-3xl" />
          </div>

          {/* Title */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Create an Account
            </h2>
            <p className="text-sm text-gray-500">
              Join us to start exploring colleges
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-600 block mb-1">Full Name</label>
                <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                  <MdPerson className="text-gray-400 mr-2" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full outline-none text-sm bg-transparent"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-600 block mb-1">Phone</label>
                <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                  <MdPhone className="text-gray-400 mr-2" />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full outline-none text-sm bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">Email Address</label>
              <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                <MdEmail className="text-gray-400 mr-2" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">City</label>
              <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                <MdLocationCity className="text-gray-400 mr-2" />
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">Password</label>
              <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                <RiLockPasswordLine className="text-gray-400 mr-2" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full outline-none text-sm bg-transparent"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Register Button */}
            <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-md font-semibold hover:opacity-90 transition mt-4 shadow-md">
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="text-center text-sm text-gray-400 my-5">
            or continue with
          </div>

          {/* Social Login */}
          <div className="flex gap-3">
            <button className="flex items-center justify-center gap-2 border w-full py-2 rounded-md hover:bg-gray-50 transition text-sm">
              <FaGoogle className="text-[#DB4437]" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border w-full py-2 rounded-md hover:bg-gray-50 transition text-sm">
              <FaFacebookF className="text-[#1877F2]" />
              Facebook
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;