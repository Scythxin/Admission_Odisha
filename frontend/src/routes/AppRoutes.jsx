import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import API_BASE from "../config/api";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import CollegeList from "../pages/Colleges/CollegePage";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Course from "../pages/Course/Course";
import AllCourses from "../pages/Course/AllCourses";
import About from "../pages/About/About";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import Field from "../pages/Course/Field";
import FieldDetail from "../pages/Course/FieldCards/FieldDetail";
import SpecificFieldDetail from "../pages/Course/SpecificFieldDetail";
import CourseDetail from "../pages/Course/CourseDetail";
import Dashboard from "../pages/Dashboard/Dashboard";
import CollegeDetail from "../pages/Colleges/CollegeDetail";
import CollegeCourseSpecializations from "../pages/Colleges/CollegeCourseSpecializations";

import { Navigate } from "react-router-dom";
import Wishlist from "../pages/Colleges/Wishlist";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const PageVisitTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const logVisit = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        await fetch(`${API_BASE}?r=site/api-log-page-visit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          body: JSON.stringify({ path: location.pathname })
        });
      } catch (e) {}
    };
    logVisit();
  }, [location.pathname]);

  return null;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <PageVisitTracker />
      <Routes>
        {/* Existing routes */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/colleges"
        element={
          <MainLayout>
            <CollegeList />
          </MainLayout>
        }
      />
      <Route
        path="/colleges/:id"
        element={
          <MainLayout>
            <CollegeDetail />
          </MainLayout>
        }
      />
      <Route
        path="/colleges/:collegeId/courses/:courseName"
        element={
          <MainLayout>
            <CollegeCourseSpecializations />
          </MainLayout>
        }
      />
      {/* Wishlist route */}
      <Route
        path="/wishlist"
        element={
          <MainLayout>
            <Wishlist />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />
      <Route path="/streams" element={<Navigate to="/field" replace />} />
      <Route
        path="/course"
        element={
          <MainLayout>
            <Course />
          </MainLayout>
        }
      />
      <Route
        path="/courses"
        element={
          <MainLayout>
            <AllCourses />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />
      {/* Auth routes */}
      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />{" "}
      <Route
        path="/verify-otp"
        element={
          <MainLayout>
            <VerifyOtp />
          </MainLayout>
        }
      />
      {/* Fields */}
      <Route
        path="/field"
        element={
          <MainLayout>
            <Field />
          </MainLayout>
        }
      />
      <Route
        path="/field/:fieldSlug"
        element={
          <MainLayout>
            <FieldDetail />
          </MainLayout>
        }
      />
      {/* Course Details */}
      <Route
        path="/course/:specializationSlug"
        element={
          <MainLayout>
            <SpecificFieldDetail />
          </MainLayout>
        }
      />
      <Route
        path="/course-detail/:courseSlug"
        element={
          <MainLayout>
            <CourseDetail />
          </MainLayout>
        }
      />
      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
    </Routes>
    </>
  );
};

export default AppRoutes;
