import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  const [playingVideo, setPlayingVideo] = useState(false);

  const timeline = [
    { 
      year: 1636, 
      event: t('about.timeline_1636'),
      description: t('about.timeline_1636_desc'),
      icon: "🏛️"
    },
    { 
      year: 1782, 
      event: t('about.timeline_1782'),
      description: t('about.timeline_1782_desc'),
      icon: "🏥"
    },
    { 
      year: 1869, 
      event: t('about.timeline_1869'),
      description: t('about.timeline_1869_desc'),
      icon: "⚕️"
    },
    { 
      year: 1999, 
      event: t('about.timeline_1999'),
      description: t('about.timeline_1999_desc'),
      icon: "🌍"
    },
    { 
      year: 2020, 
      event: t('about.timeline_2020'),
      description: t('about.timeline_2020_desc'),
      icon: "🔬"
    }
  ];

  const values = [
    { 
      icon: "🎯", 
      title: t('about.value_1_title'), 
      description: t('about.value_1_desc')
    },
    { 
      icon: "👁️", 
      title: t('about.value_2_title'), 
      description: t('about.value_2_desc')
    },
    { 
      icon: "💡", 
      title: t('about.value_3_title'), 
      description: t('about.value_3_desc')
    },
    { 
      icon: "🌟", 
      title: t('about.value_4_title'), 
      description: t('about.value_4_desc')
    }
  ];

  const achievements = [
    { 
      number: "387", 
      label: t('about.faculty_count'),
      icon: "👩‍🏫",
      color: "blue"
    },
    { 
      number: "13", 
      label: t('about.schools_count'),
      icon: "🏢",
      color: "blue"
    },
    { 
      number: "23,000", 
      label: t('about.students_count'),
      icon: "🎓",
      color: "blue"
    },
    { 
      number: "371", 
      label: t('about.years_count'),
      icon: "📅",
      color: "blue"
    }
  ];

  const schools = [
    { name: t('about.medical_school'), established: "1782", icon: "🏥" },
    { name: t('about.business_school'), established: "1908", icon: "💼" },
    { name: t('about.engineering_school'), established: "1847", icon: "⚙️" },
    { name: t('about.law_school'), established: "1817", icon: "⚖️" },
    { name: t('about.education_school'), established: "1920", icon: "📚" },
    { name: t('about.public_health_school'), established: "1913", icon: "🌍" }
  ];

  const researchCenters = [
    { name: t('about.wyss_institute'), focus: t('about.bioengineering'), icon: "🔬" },
    { name: t('about.broad_institute'), focus: t('about.genomics'), icon: "🧬" },
    { name: t('about.radcliffe_institute'), focus: t('about.advanced_study'), icon: "🎓" },
    { name: t('about.berkman_center'), focus: t('about.internet_society'), icon: "🌐" }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-700 transition-colors duration-200 font-medium">
              {t('nav.home')}
            </a>
            <span className="text-gray-400">›</span>
            <span className="text-blue-700 font-semibold">{t('nav.about')}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <section className="text-center mb-20 animate-fadeInUp">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 px-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                {t('about.hero_title')}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                {t('about.hero_subtitle')}
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-white to-blue-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.achievements_title')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
                <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-2 group-hover:text-blue-900 transition-colors duration-300">
                  {achievement.number}
                </div>
                <p className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">
                  {achievement.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.mission_values')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 border border-blue-100 hover:border-blue-300">
                <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">
                  {value.description}
                </p>
                <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full mt-4"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.university_history')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full"></div>
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{item.icon}</span>
                      <span className="text-2xl font-bold text-blue-700 group-hover:text-blue-900 transition-colors duration-300">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors duration-300">
                      {item.event}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg hover:bg-blue-800 hover:scale-125 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.leadership')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="group bg-gradient-to-br from-white to-blue-50 p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-6xl text-white group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  👩‍🎓
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-2">
                    {t('about.rector_name')}
                  </h3>
                  <p className="text-xl text-blue-700 group-hover:text-blue-900 transition-colors duration-300 mb-4">
                    {t('about.rector_title')}
                  </p>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
                    {t('about.rector_bio')}
                  </p>
                  <div className="mt-6 flex justify-center md:justify-start">
                    <div className="w-0 group-hover:w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Schools Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.academic_schools')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schools.map((school, index) => (
              <div key={index} className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
                <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                  {school.icon}
                </div>
                <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-2">
                  {school.name}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {t('about.established')}: {school.established}
                </p>
                <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full mt-4"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Centers Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.research_centers')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {researchCenters.map((center, index) => (
              <div key={index} className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
                <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                  {center.icon}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-2">
                  {center.name}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {center.focus}
                </p>
                <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full mt-4"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.video_presentation')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="group relative bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              {!playingVideo ? (
                <div 
                  className="relative aspect-video flex items-center justify-center cursor-pointer"
                  onClick={() => setPlayingVideo(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-800/80 flex items-center justify-center">
                    <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-2xl group-hover:shadow-3xl transition-shadow duration-500">
                        <div className="w-0 h-0 border-l-8 border-l-blue-600 border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {t('about.watch_video')}
                      </h3>
                      <p className="text-blue-200">
                        {t('about.video_duration')}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&cc_load_policy=1&cc_lang_pref=ru"
                    title="University Presentation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-3xl"
                  ></iframe>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {t('about.subtitles_available')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Campus Resources Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.campus_resources')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
              <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">📚</div>
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                {t('about.library_system')}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {t('about.library_desc')}
              </p>
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full mt-4"></div>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
              <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">🏃‍♂️</div>
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                {t('about.athletics')}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {t('about.athletics_desc')}
              </p>
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full mt-4"></div>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
              <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">🏠</div>
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                {t('about.student_housing')}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {t('about.housing_desc')}
              </p>
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full mt-4"></div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.quick_links')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <a href="/about/management" className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 border border-blue-100 hover:border-blue-200">
              <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                👥
              </div>
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                {t('about.management')}
              </h3>
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full"></div>
            </a>
            
            <a href="/about/documents" className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 border border-blue-100 hover:border-blue-200">
              <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                📋
              </div>
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                {t('about.charter_documents')}
              </h3>
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full"></div>
            </a>
            
            <a href="/about/careers" className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 border border-blue-100 hover:border-blue-200">
              <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                💼
              </div>
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                {t('about.careers')}
              </h3>
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full"></div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
