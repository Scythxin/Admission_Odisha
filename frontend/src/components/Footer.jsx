import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import footerLogo from "/src/assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#071B52] text-white pt-8 pb-4">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 pb-6 border-b border-white/10">
          {/* Logo + About */}
          <div className="lg:col-span-1">
            <img
              src={footerLogo}
              alt="Admission Odisha"
              className="w-[150px] mb-3"
            />

            <p className="text-sm text-white/80 leading-relaxed">
              Your one-stop platform for exploring courses, colleges and
              admission opportunities across Odisha.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="/"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#071B52] transition text-sm"
              >
                <FaFacebookF />
              </a>

              <a
                href="/"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#071B52] transition text-sm"
              >
                <FaInstagram />
              </a>

              <a
                href="/"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#071B52] transition text-sm"
              >
                <FaYoutube />
              </a>

              <a
                href="/"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#071B52] transition text-sm"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-3">Quick Links</h3>

            <ul className="space-y-2 text-white/80 text-sm">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/colleges">College</Link>
              </li>
              <li>
                <Link to="/course">Course</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="font-bold text-base mb-3">For Students</h3>

            <ul className="space-y-2 text-white/80 text-sm">
              <li>
                <a href="/">Apply Now</a>
              </li>
              <li>
                <a href="/">Scholarships</a>
              </li>
              <li>
                <a href="/">Cut-Off</a>
              </li>
              <li>
                <a href="/">Help Center</a>
              </li>
            </ul>
          </div>

          {/* For Parents */}
          <div>
            <h3 className="font-bold text-base mb-3">For Parents</h3>

            <ul className="space-y-2 text-white/80 text-sm">
              <li>
                <a href="/">Admission Process</a>
              </li>
              <li>
                <a href="/">Documents Required</a>
              </li>
              <li>
                <a href="/">Fee Structure</a>
              </li>
              <li>
                <a href="/">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base mb-3">Contact Us</h3>

            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-2">
                <FaPhoneAlt className="mt-0.5 text-sm" />
                <p>+91 1234567890</p>
              </div>

              <div className="flex items-start gap-2">
                <FaEnvelope className="mt-0.5 text-sm" />
                <p>support@admissionodisha.in</p>
              </div>

              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-0.5 text-sm" />
                <p>Bhubaneswar, Odisha, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center pt-4">
          <p className="text-sm text-white/60">
            © 2026 Admission Odisha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;