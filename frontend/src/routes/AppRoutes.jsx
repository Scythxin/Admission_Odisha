import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import CollegeList from "../pages/Colleges/CollegePage";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Course from "../pages/Course/Course";
import About from "../pages/About/About";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import Field from "../pages/Course/Field";
import FieldDetail from "../pages/Course/FieldCards/FieldDetail";
import CourseDetail from "../pages/Course/CourseDetail";
import Dashboard from "../pages/Dashboard/Dashboard";
import CollegeDetail from "../pages/Colleges/CollegeDetail";
import CollegeCourseSpecializations from "../pages/Colleges/CollegeCourseSpecializations";
import { Navigate } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Existing routes */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/colleges" element={<MainLayout><CollegeList /></MainLayout>} />
      <Route path="/colleges/:id" element={<MainLayout><CollegeDetail /></MainLayout>} />
      <Route path="/colleges/:collegeId/courses/:courseName" element={<MainLayout><CollegeCourseSpecializations /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
      <Route path="/streams" element={<Navigate to="/field" replace />} />
      <Route path="/course" element={<MainLayout><Course /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />

      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* Fields */}
      <Route path="/field" element={<MainLayout><Field /></MainLayout>} />
      <Route path="/field/:fieldSlug" element={<MainLayout><FieldDetail /></MainLayout>} />

      {/* Course Details */}
      <Route path="/course/:specializationSlug" element={<MainLayout><CourseDetail /></MainLayout>} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;