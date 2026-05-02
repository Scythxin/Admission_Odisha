import React, { useEffect, useState } from 'react';
import parent from "../../assets/images/parent.png";
import student from "../../assets/images/student.png";

import { Link } from 'react-router-dom';
import { 
  Target, Eye, Award, CheckCircle2, ShieldCheck, 
  Headphones, Zap, Bell, Users, School, GraduationCap, MapPin, ChevronRight,
  Sparkles, TrendingUp, Heart, Star
} from 'lucide-react';

const About = () => {
  const [animatedText, setAnimatedText] = useState("");
  const fullText = "Empowering Students, Building Futures";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setAnimatedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      label: "Trusted", 
      sub: "Colleges", 
      icon: <School size={24} />, 
      color: "text-[#5B3DF5]",
      bg: "bg-[#5B3DF5]/10",
      link: "/college"
    },
    { 
      label: "Diverse", 
      sub: "Courses", 
      icon: <GraduationCap size={24} />, 
      color: "text-[#14B8A6]",
      bg: "bg-[#14B8A6]/10",
      link: "/course"
    },
    { 
      label: "Empowering Careers", 
      sub: "Of Students", 
      icon: <Users size={24} />, 
      color: "text-[#F59E0B]",
      bg: "bg-[#F59E0B]/10",
      link: "/students"
    },
    { 
      label: "Across Various ", 
      sub: "Regions", 
      icon: <MapPin size={24} />, 
      color: "text-[#3B82F6]",
      bg: "bg-[#3B82F6]/10",
      link: "/districts"
    },
  ];

  const values = [
    { title: "Transparency", color: "text-[#5B3DF5]", icon: <ShieldCheck size={16} />, desc: "Clear and verified information", bg: "bg-[#5B3DF5]/10" },
    { title: "Student First", color: "text-[#14B8A6]", icon: <Users size={16} />, desc: "Best quality in everything we do", bg: "bg-[#14B8A6]/10" },
    { title: "Excellence", color: "text-[#F59E0B]", icon: <Award size={16} />, desc: "Honest, ethical and responsible", bg: "bg-[#F59E0B]/10" },
  ];

  const features = [
    { t: "Verified Information", ic: <ShieldCheck size={20} />, c: "text-[#5B3DF5]", bg: "bg-[#5B3DF5]/10", d: "All colleges and courses are verified and updated regularly", link: "/verified-info" },
    { t: "Easy Process", ic: <Zap size={20} />, c: "text-[#14B8A6]", bg: "bg-[#14B8A6]/10", d: "Simple steps to search, apply and get admission", link: "/how-it-works" },
    { t: "Expert Support", ic: <Headphones size={20} />, c: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", d: "Our counselors are always ready to help you", link: "/contact" },
    { t: "Secure Platform", ic: <ShieldCheck size={20} />, c: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10", d: "Your data is safe with 100% privacy", link: "/privacy" },
    { t: "Timely Updates", ic: <Bell size={20} />, c: "text-[#EC4899]", bg: "bg-[#EC4899]/10", d: "Stay informed with important deadlines", link: "/alerts" },
  ];

  const parentFeatures = [
    { t: "Right Guidance", d: "Get expert advice to choose the right course", ic: <Zap size={16} />, c: "text-[#5B3DF5]", link: "/guidance" },
    { t: "Complete Support", d: "We are with you from selection to admission", ic: <CheckCircle2 size={16} />, c: "text-[#14B8A6]", link: "/support" },
    { t: "Safe & Secure", d: "Your child's information is 100% safe", ic: <ShieldCheck size={16} />, c: "text-[#F59E0B]", link: "/security" },
    { t: "Peace of Mind", d: "Stress-free decisions for your family", ic: <Headphones size={16} />, c: "text-[#3B82F6]", link: "/peace-of-mind" },
  ];

  return (
    <div className="bg-[#F8F8FC] min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white pt-8 pb-12 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT - Text Content */}
            <div>
              <h1 className="text-[36px] sm:text-[44px] md:text-[50px] leading-[1.2] font-bold text-[#071B52]">
                <span className="text-[#4F46E5]">{animatedText}</span>
              </h1>

              <p className="text-[#5E6282] text-base sm:text-lg mt-4 max-w-[560px]">
                Admission Odisha is your one-stop platform to explore colleges, courses and admission opportunities across Odisha. 
                We make the admission process simple, transparent and accessible for everyone.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link to="/colleges">
                  <button className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Explore Colleges
                    <TrendingUp size={18} />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="border-2 border-[#4F46E5] text-[#4F46E5] px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#4F46E5] hover:text-white transition-all duration-300">
                    Contact Us
                    <Headphones size={18} />
                  </button>
                </Link>
              </div>
            </div>

            {/* RIGHT - Student Image */}
            <div className="relative flex justify-center">
              <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-r from-[#D8B4FE] to-[#C4B5FD] opacity-60 blur-2xl animate-pulse"></div>
              <img
                src={student}
                alt="Students"
                className="relative z-10 w-[280px] sm:w-[380px] md:w-[460px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="max-w-[1280px] mx-auto mt-8 px-4 sm:px-6 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Link to={s.link} key={i}>
              <div className="group bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className={`${s.bg} w-12 h-12 rounded-xl flex items-center justify-center ${s.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </div>
                <p className="text-xl font-bold text-[#071B52] leading-none">{s.label}</p>
                <p className="text-xs text-gray-500 font-medium mt-1">{s.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. MISSION, VISION & VALUES - Auto height based on text */}
      <section className="max-w-[1280px] mx-auto py-16 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#071B52] text-center mb-10">
          Mission, Vision & Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission */}
          <div className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-[#071B52]">Our Mission</h3>
              <div className="bg-[#4F46E5]/10 p-3 rounded-xl text-[#4F46E5] group-hover:rotate-12 transition-transform duration-300">
                <Target size={24} />
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed flex-grow">
              To bridge the gap between students and the right educational opportunities. We provide accurate information, 
              expert guidance and a smooth admission experience so that every student can achieve their dreams.
            </p>
          </div>

          {/* Vision */}
          <div className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-[#071B52]">Our Vision</h3>
              <div className="bg-[#14B8A6]/10 p-3 rounded-xl text-[#14B8A6] group-hover:rotate-12 transition-transform duration-300">
                <Eye size={24} />
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed flex-grow">
              To become Odisha's most trusted education platform, empowering every student and parent to make 
              informed decisions for a better and brighter future.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-full flex flex-col">
            <h3 className="font-bold text-xl text-[#071B52] mb-4">Our Values</h3>
            <div className="space-y-3 flex-grow">
              {values.map((v, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 ${v.bg} rounded-xl transition-all duration-300`}>
                  <div className={`${v.color}`}>{v.icon}</div>
                  <div>
                    <span className="text-sm font-bold text-[#071B52] block">{v.title}</span>
                    <span className="text-xs text-gray-500">{v.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 italic pt-3 mt-2 border-t border-gray-100">
              "Honest, ethical and responsible in our work"
            </p>
          </div>
        </div>
      </section>

      {/* 4. FOR PARENTS SECTION - Larger Image */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-md border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Parent Image - Made Larger */}
            <div className="md:w-2/5 w-full flex justify-center">
              <img 
                src={parent} 
                alt="Parents with child" 
                className="w-full max-w-[350px] md:max-w-[400px] object-contain rounded-2xl"
              />
            </div>
            
            <div className="md:w-3/5 w-full">
              <h3 className="text-2xl md:text-3xl font-bold text-[#071B52] mb-3">For Parents, With Care</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                We understand how important your child's future is. That's why we provide you the right information 
                and support at every step of the admission journey.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {parentFeatures.map((item, i) => (
                  <Link to={item.link} key={i}>
                    <div className="flex gap-3 group cursor-pointer p-2 rounded-xl hover:bg-gray-50 transition-all duration-300">
                      <div className={`${item.c} bg-gray-100 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        {item.ic}
                      </div>
                      <div>
                        <h6 className="font-semibold text-sm text-[#071B52]">{item.t}</h6>
                        <p className="text-xs text-gray-500">{item.d}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURES GRID - Premium Look */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#071B52] text-center mb-10">
          Our Premium Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {features.map((f, i) => (
            <Link to={f.link} key={i}>
              <div className="group bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 text-center">
                <div className={`${f.bg} w-14 h-14 rounded-xl flex items-center justify-center ${f.c} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {f.ic}
                </div>
                <h6 className="font-bold text-sm text-[#071B52] mb-2">{f.t}</h6>
                <p className="text-xs text-gray-500 leading-relaxed">{f.d}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
          <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              We are committed to making education <br className="hidden md:block"/> accessible to every student in Odisha.
            </h2>
            <p className="text-white/80 text-sm italic">
              "Your dream is our responsibility. Your success is our mission."
            </p>
          </div>
          <Link to="/colleges">
            <button className="relative z-10 bg-white text-[#4F46E5] px-8 py-3.5 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              Explore Colleges
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </div>
      </section>

    </div>
  );
};

export default About;