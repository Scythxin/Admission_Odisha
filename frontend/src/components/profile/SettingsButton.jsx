import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import {
  FaCog,
  FaTimes,
  FaLock,
  FaGlobe,
  FaHeadset,
  FaEnvelope,
  FaPhoneAlt
} from "react-icons/fa";
import API_BASE from "../../config/api";

const SettingsButton = ({ onClick, variant = "desktop" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("password"); // "password", "language", "support"
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("language") || "en");
  const token = localStorage.getItem("token");

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleOpen = (e) => {
    setIsOpen(true);
    if (onClick) onClick(e);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await fetch(`${API_BASE}?r=auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword
        })
      });

      const resData = await response.json();
      if (resData.status === "success") {
        setPasswordSuccess("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(resData.message || "Failed to change password.");
      }
    } catch (error) {
      setPasswordError("Something went wrong. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const renderButton = () => {
    if (variant === "mobile") {
      return (
        <button
          onClick={handleOpen}
          className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FaCog className="text-sm text-gray-500" />
          Settings
        </button>
      );
    }

    return (
      <button
        onClick={handleOpen}
        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100 transition-all duration-200"
      >
        <FaCog className="text-xs text-gray-500" />
        Settings
      </button>
    );
  };

  return (
    <>
      {renderButton()}

      {/* Settings Modal */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px]">
            {/* Sidebar / Tabs */}
            <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-100 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">Settings</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSettingsTab("password");
                      setPasswordError("");
                      setPasswordSuccess("");
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 ${settingsTab === "password"
                        ? "bg-[#6C4DF6] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <FaLock className="text-sm" />
                    Change Password
                  </button>
                  <button
                    onClick={() => setSettingsTab("language")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 ${settingsTab === "language"
                        ? "bg-[#6C4DF6] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <FaGlobe className="text-sm" />
                    Language
                  </button>
                  <button
                    onClick={() => setSettingsTab("support")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 ${settingsTab === "support"
                        ? "bg-[#6C4DF6] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <FaHeadset className="text-sm" />
                    Help & Support
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 md:mt-0 w-full text-center text-sm font-medium text-gray-400 hover:text-gray-600 py-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                Close
              </button>
            </div>

            {/* Content Panel */}
            <div className="flex-1 p-8 overflow-y-auto relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>

              {settingsTab === "password" && (
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Change Password</h4>
                  <p className="text-sm text-gray-500 mb-6">Update your password to keep your account secure.</p>

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#6C4DF6] focus:ring-2 focus:ring-[#6C4DF6]/20 transition-all duration-200 text-sm focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#6C4DF6] focus:ring-2 focus:ring-[#6C4DF6]/20 transition-all duration-200 text-sm focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#6C4DF6] focus:ring-2 focus:ring-[#6C4DF6]/20 transition-all duration-200 text-sm focus:outline-none"
                      />
                    </div>

                    {passwordError && (
                      <p className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-lg border border-red-100">
                        {passwordError}
                      </p>
                    )}

                    {passwordSuccess && (
                      <p className="text-xs text-green-600 font-semibold bg-green-50 p-2.5 rounded-lg border border-green-100">
                        {passwordSuccess}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="w-full bg-[#6C4DF6] hover:bg-[#5B3EE0] text-white py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {passwordLoading ? "Saving Changes..." : "Save Password"}
                    </button>
                  </form>
                </div>
              )}

              {settingsTab === "language" && (
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Language Preference</h4>
                  <p className="text-sm text-gray-500 mb-6">Choose your preferred language for the interface.</p>

                  <div className="space-y-3">
                    {[
                      { code: "en", label: "English", native: "English" },
                      { code: "hi", label: "Hindi", native: "हिन्दी" },
                      { code: "od", label: "Odia", native: "ଓଡ଼ିଆ" }
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLang(item.code);
                          i18n.changeLanguage(item.code);
                          localStorage.setItem("language", item.code);
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${lang === item.code
                            ? "border-[#6C4DF6] bg-[#F5F3FF]"
                            : "border-gray-100 hover:border-gray-200 bg-white"
                          }`}
                      >
                        <div className="text-left">
                          <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                          <p className="text-xs text-gray-400">{item.native}</p>
                        </div>
                        {lang === item.code && (
                          <div className="w-5 h-5 rounded-full bg-[#6C4DF6] flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {settingsTab === "support" && (
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Help & Support</h4>
                  <p className="text-sm text-gray-500 mb-6">Get in touch with us if you have any questions or issues.</p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                        <FaEnvelope className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Us</p>
                        <a href="mailto:support@admissionodisha.in" className="text-sm font-bold text-[#6C4DF6] hover:underline">
                          support@admissionodisha.in
                        </a>
                        <p className="text-xs text-gray-500 mt-0.5">We usually reply within 24 hours.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                        <FaPhoneAlt className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Call Us</p>
                        <a href="tel:+919114422555" className="text-sm font-bold text-gray-800 hover:text-[#6C4DF6] transition-colors">
                          +91 91144 22555
                        </a>
                        <p className="text-xs text-gray-500 mt-0.5">Mon - Sat (9:00 AM - 6:00 PM)</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-800">
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1">Need immediate guidance?</p>
                      <p className="text-xs leading-relaxed">
                        You can fill out the contact form or use the guidance popup helper on the homepage to register a query and receive custom support.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default SettingsButton;
