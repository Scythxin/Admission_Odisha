import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  GraduationCap, Clock, BookOpen, Users,
  Settings, Zap, Shield, Heart, ArrowLeft,
  Search, Info, ExternalLink, ChevronRight,
  Target, Award, Building, Globe
} from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';

const CollegeCourseSpecializations = () => {
  const { collegeId, courseName } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}?r=site/api-college-course-specializations&college_id=${collegeId}&course_name=${courseName}`);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link to="/colleges" className="hover:text-indigo-600 transition">Colleges</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link to={`/colleges/${college.id}`} className="hover:text-indigo-600 transition">{college.name}</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-indigo-600 font-medium">{course.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-indigo-900 text-white">
          {/* Background Image / Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-900/90 to-transparent"></div>

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
              <Building size={16} className="text-indigo-300" />
              <span className="text-sm font-bold tracking-wider uppercase">{college.name}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">{course.name}</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-2xl">{course.full_name || 'Bachelor of Technology'}</p>

            <div className="flex flex-wrap gap-6 md:gap-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                  <Clock size={24} className="text-indigo-300" />
                </div>
                <div>
                  <p className="text-xs text-indigo-200 font-bold uppercase tracking-widest">Duration</p>
                  <p className="text-lg font-bold">{course.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                  <GraduationCap size={24} className="text-indigo-300" />
                </div>
                <div>
                  <p className="text-xs text-indigo-200 font-bold uppercase tracking-widest">Degree Level</p>
                  <p className="text-lg font-bold">{course.degree_level}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                  <Zap size={24} className="text-indigo-300" />
                </div>
                <div>
                  <p className="text-xs text-indigo-200 font-bold uppercase tracking-widest">Course Type</p>
                  <p className="text-lg font-bold">{course.course_type || 'Full Time'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-[#071B52] mb-2">{course.name} Branches</h2>
                <p className="text-gray-500">Explore the specializations available under {course.name} program at {college.name}.</p>
              </div>
              <Link to={`/colleges/${college.id}`} className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-100 transition-all">
                <ArrowLeft size={18} />
                Back to College
              </Link>
            </div>

            {/* Specializations Table */}
            <div className="overflow-x-auto">
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
          </div>

          {/* Features Section */}
          <div className="bg-indigo-50/30 border-t border-gray-100 p-8 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Industry Oriented', desc: 'Curriculum designed to meet industry standards and future demands.', icon: <Target className="text-indigo-600" /> },
                { title: 'Expert Faculty', desc: 'Learn from experienced faculty and industry professionals.', icon: <Users className="text-indigo-600" /> },
                { title: 'Modern Facilities', desc: 'Advanced labs, libraries and world-class infrastructure.', icon: <Building className="text-indigo-600" /> },
                { title: 'Placement Support', desc: 'Strong placement cell with top recruiters and career guidance.', icon: <Zap className="text-indigo-600" /> },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#071B52] mb-1">{feature.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row items-center p-8 md:p-12 gap-8">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
            <Users size={40} className="text-indigo-600" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-[#071B52] mb-2">Have Questions About {course.name} Admissions?</h3>
            <p className="text-gray-500">Our admission experts are here to help you choose the right branch for your future.</p>
          </div>
          <button
            onClick={openEnquiry}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-3"
          >
            Enquire Now
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCourseSpecializations;
