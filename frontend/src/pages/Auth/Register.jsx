import React, { useState } from "react";
import API_BASE from "../../config/api";
import { Link } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash
} from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";

const Register = () => {
  const [showPass, setShowPass] = useState(false);

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

  // ✅ SAME BACKEND LOGIC (unchanged)
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen font-[Poppins]">

      {/* LEFT PANEL (UI kept) */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-50 via-indigo-100 to-purple-300">
        <h1 className="text-4xl font-extrabold text-indigo-900 leading-tight mb-4">
          Your Dream <br />
          Our Guidance <br />
          Your <span className="text-teal-500">Future</span>
        </h1>
        <p className="text-gray-600 text-sm">
          Join thousands of students and start your journey towards a
          bright future.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center bg-indigo-50 px-6 py-10">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-8">

          <h2 className="text-xl font-bold text-center text-indigo-900">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Sign up and start your journey
          </p>

          {/* FORM CONNECTED */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name + Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                icon={<FaUser />}
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <Input
                icon={<FaPhone />}
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <Input
              icon={<FaEnvelope />}
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            {/* City */}
            <Input
              icon={<MdLocationCity />}
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-indigo-400">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full py-2 outline-none text-sm bg-transparent"
                  placeholder="Create password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Register
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

/* Reusable Input */
const Input = ({ icon, label, ...props }) => (
  <div>
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-indigo-400">
      <span className="text-gray-400 mr-2">{icon}</span>
      <input {...props} className="w-full py-2 outline-none text-sm bg-transparent" />
    </div>
  </div>
);

export default Register;