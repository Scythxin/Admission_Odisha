import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  GraduationCap, Clock, BookOpen, Users,
  Settings, Zap, Shield, Heart, ArrowLeft,
  Search, Info, ExternalLink, ChevronRight,
  Target, Award, Building, Globe
} from 'lucide-react';
import API_BASE from '../../config/api';
import { useEnquiry } from '../../context/EnquiryContext';

const CollegeCourseSpecializations = () => {
  const { collegeId, courseName } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}?r=site/api-college-course-specializations&college_id=${collegeId}&course_name=${courseName}`);
        const result = await response.json();
        if (result.status === 'success') {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching specializations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [collegeId, courseName]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Loading specializations...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Data Not Found</h2>
          <Link to="/colleges" className="text-indigo-600 font-bold hover:underline">Back to Colleges</Link>
        </div>
      </div>
    );
  }

  const { college, course, specializations } = data;

  return (
    <div className="bg-[#F8F9FC] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 md:py-3">
          <div className="flex flex-wrap items-center gap-1 md:gap-2 text-[11px] sm:text-xs md:text-sm text-gray-500">
            <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
            <ChevronRight size={12} className="text-gray-400 md:w-3.5 md:h-3.5" />
            <Link to="/colleges" className="hover:text-indigo-600 transition">Colleges</Link>
            <ChevronRight size={12} className="text-gray-400 md:w-3.5 md:h-3.5" />
            <Link to={`/colleges/${college.id}`} className="hover:text-indigo-600 transition truncate max-w-[120px] sm:max-w-none">{college.name}</Link>
            <ChevronRight size={12} className="text-gray-400 md:w-3.5 md:h-3.5" />
            <span className="text-indigo-600 font-medium truncate max-w-[100px] sm:max-w-none">{course.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 md:pt-6">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl bg-indigo-900 text-white">
          {/* Background Image / Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-900/90 to-transparent"></div>

          <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20 mb-4 md:mb-6">
              <Building size={14} className="text-indigo-300 md:w-4 md:h-4" />
              <span className="text-[10px] md:text-sm font-bold tracking-wider uppercase truncate max-w-[200px] sm:max-w-none">{college.name}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4">{course.name}</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-indigo-100 mb-6 md:mb-8 max-w-2xl leading-snug">{course.full_name || 'Bachelor of Technology'}</p>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 md:gap-12">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="p-2.5 md:p-3 bg-white/10 rounded-xl md:rounded-2xl backdrop-blur-md w-fit">
                  <Clock size={20} className="text-indigo-300 md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-indigo-200 font-bold uppercase tracking-widest">Duration</p>
                  <p className="text-base sm:text-lg font-bold">{course.duration}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="p-2.5 md:p-3 bg-white/10 rounded-xl md:rounded-2xl backdrop-blur-md w-fit">
                  <GraduationCap size={20} className="text-indigo-300 md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-indigo-200 font-bold uppercase tracking-widest">Degree Level</p>
                  <p className="text-base sm:text-lg font-bold">{course.degree_level}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 col-span-2">
                <div className="p-2.5 md:p-3 bg-white/10 rounded-xl md:rounded-2xl backdrop-blur-md w-fit">
                  <Zap size={20} className="text-indigo-300 md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-indigo-200 font-bold uppercase tracking-widest">Course Type</p>
                  <p className="text-base sm:text-lg font-bold">{course.course_type || 'Full Time'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 md:mt-12">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-5 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#071B52] mb-1 md:mb-2">{course.name} Branches</h2>
                <p className="text-sm md:text-base text-gray-500">Explore the specializations available under {course.name} program at {college.name}.</p>
              </div>
              <Link to={`/colleges/${college.id}`} className="inline-flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-bold hover:bg-indigo-100 transition-all self-start md:self-auto">
                <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" />
                Back to College
              </Link>
            </div>

            {/* Specializations Table - Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-indigo-50/50">
                    <th className="py-5 px-6 rounded-tl-2xl font-bold text-[#071B52] text-sm uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Settings size={18} className="text-indigo-600" />
                        Branch
                      </div>
                    </th>
                    <th className="py-5 px-6 font-bold text-[#071B52] text-sm uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-indigo-600" />
                        Total Seats
                      </div>
                    </th>
                    <th className="py-5 px-6 rounded-tr-2xl font-bold text-[#071B52] text-sm uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <BookOpen size={18} className="text-indigo-600" />
                        Specialization / Short Description
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {specializations.map((spec, idx) => (
                    <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="py-6 px-6 font-bold text-[#071B52] group-hover:text-indigo-600 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                            <Zap size={20} className="text-indigo-400" />
                          </div>
                          {spec.name}
                        </div>
                      </td>
                      <td className="py-6 px-6 font-bold text-gray-700">{spec.total_seats}</td>
                      <td className="py-6 px-6 text-gray-500 text-sm leading-relaxed max-w-md">{spec.short_desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Specializations List - Mobile */}
            <div className="md:hidden space-y-4">
              {specializations.map((spec, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-50">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0 mt-0.5">
                      <Zap size={16} />
                    </div>
                    <h3 className="font-bold text-[#071B52] leading-tight">{spec.name}</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5"><Users size={12}/> Total Seats</span>
                      <span className="font-bold text-gray-700 text-sm">{spec.total_seats}</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5"><BookOpen size={12}/> Description</span>
                      <p className="text-xs text-gray-600 leading-relaxed">{spec.short_desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-indigo-50/30 border-t border-gray-100 p-6 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { title: 'Industry Oriented', desc: 'Curriculum designed to meet industry standards and future demands.', icon: <Target size={20} className="text-indigo-600 md:w-6 md:h-6" /> },
                { title: 'Expert Faculty', desc: 'Learn from experienced faculty and industry professionals.', icon: <Users size={20} className="text-indigo-600 md:w-6 md:h-6" /> },
                { title: 'Modern Facilities', desc: 'Advanced labs, libraries and world-class infrastructure.', icon: <Building size={20} className="text-indigo-600 md:w-6 md:h-6" /> },
                { title: 'Placement Support', desc: 'Strong placement cell with top recruiters and career guidance.', icon: <Zap size={20} className="text-indigo-600 md:w-6 md:h-6" /> },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-[#071B52] mb-1">{feature.title}</h4>
                    <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 md:mt-16">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row items-center p-6 md:p-12 gap-6 md:gap-8 text-center md:text-left">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
            <Users size={32} className="text-indigo-600 md:w-10 md:h-10" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-3xl font-bold text-[#071B52] mb-2 md:mb-3">Have Questions About {course.name} Admissions?</h3>
            <p className="text-sm md:text-base text-gray-500">Our admission experts are here to help you choose the right branch for your future.</p>
          </div>
          <button
            onClick={openEnquiry}
            className="w-full md:w-auto bg-indigo-600 text-white px-6 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 md:gap-3"
          >
            Enquire Now
            <ChevronRight size={18} className="md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCourseSpecializations;
