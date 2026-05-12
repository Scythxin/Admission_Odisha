import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Star, Heart, Share2, 
  School, CheckCircle, GraduationCap, 
  Globe, Info, Award, Users, BookOpen, 
  TrendingUp, HelpCircle, Phone, Mail,
  Calendar, Building, Maximize, ExternalLink
} from 'lucide-react';
import { ASSETS_BASE } from '../../config/api';

const CollegeDetail = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCollegeDetail = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}?r=site/api-college-detail&id=${id}`);
        const result = await response.json();
        if (result.status === 'success') {
          setCollege(result.data.college);
          setCourses(result.data.courses);
        }
      } catch (error) {
        console.error("Error fetching college details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollegeDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const getImageUrl = (imagePath, isBanner = false) => {
    if (!imagePath) {
      return isBanner 
        ? 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop'
        : '/src/assets/images/temple.png';
    }
    if (imagePath.startsWith('http')) return imagePath;
    return `${ASSETS_BASE}/${imagePath}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">College Not Found</h2>
          <p className="text-gray-600 mb-6">The college you are looking for might have been removed or is unavailable.</p>
          <Link to="/colleges" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
            Back to Colleges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FC] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
            <span className="text-gray-400">›</span>
            <Link to="/colleges" className="hover:text-indigo-600 transition">Colleges</Link>
            <span className="text-gray-400">›</span>
            <span className="text-indigo-600 font-medium truncate">{college.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100">
          {/* Banner Image */}
          <div className="h-64 md:h-96 w-full relative">
            <img 
              src={getImageUrl(college.banner_image, true)} 
              alt={college.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>

          {/* College Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Logo/Icon */}
            <div className="bg-white p-4 rounded-2xl shadow-2xl relative z-10 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center border-4 border-white">
              <img 
                src={getImageUrl(college.image)} 
                alt="logo" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title & Stats */}
            <div className="flex-1 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="bg-indigo-600/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {college.type || 'University'}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-md">{college.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-200">
                <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <MapPin size={16} className="text-indigo-400" />
                  <span className="text-sm font-medium">{college.location}, Odisha</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold">{college.rating} <span className="text-gray-300 font-normal">(1280 Reviews)</span></span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-[#071B52] font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-lg active:scale-95">
                <Heart size={20} />
                <span>Add to Wishlist</span>
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
                Enquire Now
              </button>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Established', value: college.established_year || '1992', icon: <Calendar size={20} />, bg: 'bg-blue-50', color: 'text-blue-600' },
            { label: 'Type', value: college.type || 'Deemed University', icon: <Building size={20} />, bg: 'bg-indigo-50', color: 'text-indigo-600' },
            { label: 'Approved By', value: college.approved_by || 'UGC, AICTE', icon: <Award size={20} />, bg: 'bg-teal-50', color: 'text-teal-600' },
            { label: 'Campus Size', value: college.campus_size || '100+ Acres', icon: <Maximize size={20} />, bg: 'bg-amber-50', color: 'text-amber-600' },
          ].map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
              <div className={`${item.bg} ${item.color} p-3 rounded-xl`}>
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                <p className="text-sm font-bold text-[#071B52]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-[#071B52] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-indigo-600 rounded-full"></span>
                About {college.name}
              </h2>
              <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
                <p>{college.description}</p>
              </div>
              <button className="mt-6 text-indigo-600 font-bold flex items-center gap-1 hover:gap-2 transition-all group">
                Read More 
                <TrendingUp size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              {/* Key Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-10 border-t border-gray-50">
                {[
                  { label: 'Accredited', value: 'NAAC A++', icon: <Award className="text-indigo-500" /> },
                  { label: 'Students', value: '10000+', icon: <Users className="text-blue-500" /> },
                  { label: 'Faculty', value: '1000+', icon: <Building className="text-amber-500" /> },
                  { label: 'Countries', value: '50+', icon: <Globe className="text-teal-500" /> },
                  { label: 'Programs', value: '100+', icon: <BookOpen className="text-purple-500" /> },
                  { label: 'Placement', value: 'Top Records', icon: <TrendingUp className="text-green-500" /> },
                  { label: 'Collaboration', value: 'Global', icon: <Globe className="text-orange-500" /> },
                  { label: 'Research', value: '24+', icon: <Maximize className="text-red-500" /> },
                ].map((highlight, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center text-center group hover:bg-white hover:shadow-md border border-transparent hover:border-indigo-100 transition duration-300">
                    <div className="p-2 bg-white rounded-xl shadow-sm mb-3 group-hover:scale-110 transition duration-300">
                      {highlight.icon}
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{highlight.label}</p>
                    <p className="text-sm font-bold text-[#071B52]">{highlight.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Courses Offered Section */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#071B52] flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-indigo-600 rounded-full"></span>
                    Courses Offered
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 ml-4">Explore popular programs offered by {college.name}</p>
                </div>
                <button className="bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition duration-300 text-sm">
                  View All Courses
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {college.courses && college.courses.length > 0 ? college.courses.map((course, idx) => (
                  <Link 
                    key={idx} 
                    to={`/colleges/${college.id}/courses/${course.name}`}
                    className="p-6 border border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group cursor-pointer block"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        <GraduationCap size={24} />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-gray-600">{course.duration}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#071B52] mb-2 group-hover:text-indigo-600 transition-colors">{course.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">Click to view available specializations and detailed curriculum.</p>
                  </Link>
                )) : (
                  <div className="col-span-full py-10 text-center bg-gray-50 rounded-2xl">
                    <p className="text-gray-500">No courses listed for this college yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-indigo-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  Why Choose {college.name}?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'NAAC A++ accredited with world-class infrastructure',
                    'Global exposure with 50+ international partnerships',
                    'Experienced faculty and research-driven learning',
                    'Vibrant campus life with 100+ student clubs',
                    'Excellent placement record with top recruiters',
                    'Industry-oriented programs and innovation hub'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 bg-green-500 rounded-full p-0.5">
                        <CheckCircle size={14} className="text-white" />
                      </div>
                      <p className="text-indigo-100 text-sm font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Abstract decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full -mr-32 -mt-32 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16 opacity-5"></div>
            </div>

          </div>

          {/* Right Column - Quick Info & Sidebar */}
          <div className="space-y-8">
            
            {/* Quick Information Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-8">
              <h3 className="text-xl font-bold text-[#071B52] mb-8 flex items-center gap-3">
                <Info size={24} className="text-indigo-600" />
                Quick Information
              </h3>
              
              <div className="space-y-6">
                {[
                  { label: 'University Type', value: college.type || 'Deemed University', icon: <School size={18} /> },
                  { label: 'Established', value: college.established_year || '1992', icon: <Calendar size={18} /> },
                  { label: 'Approved By', value: college.approved_by || 'UGC, AICTE, NAAC A++', icon: <Award size={18} /> },
                  { label: 'Rankings', value: college.rankings || 'Among Top 20 Universities in India', icon: <Star size={18} /> },
                  { label: 'Website', value: college.website || 'www.college.ac.in', icon: <Globe size={18} />, isLink: true },
                  { label: 'Address', value: college.address || 'Patia, Bhubaneswar, Odisha', icon: <MapPin size={18} /> },
                ].map((info, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="mt-0.5 text-indigo-400 group-hover:text-indigo-600 transition-colors">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{info.label}</p>
                      {info.isLink ? (
                        <a href={`https://${info.value}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1">
                          {info.value}
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <p className="text-sm font-bold text-[#071B52] leading-tight mt-1">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 pt-8 border-t border-gray-50 text-center">
                <p className="text-sm font-bold text-[#071B52] mb-4">Have Questions? We're here to help!</p>
                <div className="flex flex-col gap-3">
                  <a href="tel:+911234567890" className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md active:scale-95">
                    <Phone size={18} />
                    Call Now
                  </a>
                  <a href="mailto:contact@admissionodisha.in" className="flex items-center justify-center gap-2 bg-white text-[#071B52] py-3 rounded-xl font-bold border border-gray-100 hover:bg-gray-50 transition active:scale-95">
                    <Mail size={18} />
                    Email Us
                  </a>
                </div>
              </div>
            </div>

            {/* Similar Colleges Section (Optional) */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-[#071B52] mb-4 px-2">Need Guidance?</h3>
              <div className="bg-indigo-50 rounded-2xl p-6 relative overflow-hidden">
                <p className="text-xs text-indigo-800 font-medium relative z-10">Get free counseling and find the right career path with our expert advisors.</p>
                <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg text-xs font-bold relative z-10 hover:bg-indigo-700 transition">
                  Talk to Expert
                </button>
                <HelpCircle size={80} className="absolute -bottom-4 -right-4 text-indigo-200/50" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
