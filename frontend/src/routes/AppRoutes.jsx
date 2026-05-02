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
import EngAndTech from "../pages/Course/FieldCards/EngAndTech";
import CourseDetail from "../pages/Course/CourseDetail";



const AppRoutes = () => {
  return (
    <Routes>
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
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />
       <Route
        path="/course"
        element={
          <MainLayout>
            <Course />
          </MainLayout>
        }
      />
       <Route
        path="/field"
        element={
          <MainLayout>
            <Field />
          </MainLayout>
        }
      />
       <Route
        path="/field/engineering"
        element={
          <MainLayout>
            <EngAndTech />
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
        path="/course/computer-science-engineering"
        element={
          <MainLayout>
            <CourseDetail />
          </MainLayout>
        }
      />
      
       <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      
    </Routes>
  );
};

export default AppRoutes;