
const FacultyMember = ({ faculty, language }) => {
  const { t } = useTranslation();
  
  const getName = () => {
    switch (language) {
      case 'kg':
        return `${faculty.last_name_kg || faculty.last_name} ${faculty.first_name_kg || faculty.first_name} ${faculty.middle_name_kg || faculty.middle_name}`.trim();
      case 'en':
        return `${faculty.first_name_en || faculty.first_name} ${faculty.last_name_en || faculty.last_name}`.trim();
      default:
        return faculty.full_name;
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <SafeImage
          src={faculty.photo}
          alt={getName()}
          className="w-full h-64 object-cover"
          fallback={
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          }
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {getName()}
        </h3>
        
        <p className="text-blue-600 font-medium mb-2">
          {faculty.position_display}
          {faculty.position_custom && `, ${faculty.position_custom}`}
        </p>
        
        {faculty.academic_degree_display && (
          <p className="text-gray-600 mb-2">
            {faculty.academic_degree_display}
            {faculty.academic_title && `, ${faculty.academic_title}`}
          </p>
        )}
        
        <div className="space-y-2 text-sm text-gray-600">
          {faculty.email && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href={`mailto:${faculty.email}`} className="text-blue-600 hover:text-blue-800">
                {faculty.email}
              </a>
            </div>
          )}
          
          {faculty.phone && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{faculty.phone}</span>
            </div>
          )}
          
          {faculty.office && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{t('hsm.office')}: {faculty.office}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FacultySection = ({ position, faculty, language }) => {
  const { t } = useTranslation();
  
  if (!faculty || faculty.length === 0) return null;
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
        {position.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map((member) => (
          <FacultyMember 
            key={member.id} 
            faculty={member} 
            language={language}
          />
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import hsmService from '../../services/hsmService';
import SafeImage from '../common/SafeImage';

const Faculty = () => {
  const { t, i18n } = useTranslation();
  const [facultyData, setFacultyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback данные для медицинского факультета
  const fallbackFacultyData = {
    'dean': {
      name: 'Декан',
      faculty: [
        {
          id: 1,
          full_name: 'Мамбетов Эрбол Зинкенович',
          first_name: 'Эрбол',
          last_name: 'Мамбетов',
          middle_name: 'Зинкенович',
          first_name_en: 'Erbol',
          last_name_en: 'Mambetov',
          first_name_kg: 'Эрбол',
          last_name_kg: 'Мамбетов',
          middle_name_kg: 'Зинкенович',
          position_display: 'Декан Высшей медицинской школы',
          academic_degree_display: 'Доктор медицинских наук, профессор',
          academic_title: 'Профессор',
          email: 'dean@medicine.su.edu.kg',
          phone: '+996 (312) 54-31-00',
          office: 'Кабинет 301',
          photo: null
        }
      ]
    },
    'professor': {
      name: 'Профессора',
      faculty: [
        {
          id: 2,
          full_name: 'Токтосунова Чынара Сыдыковна',
          first_name: 'Чынара',
          last_name: 'Токтосунова',
          middle_name: 'Сыдыковна',
          first_name_en: 'Chynara',
          last_name_en: 'Toktosunova',
          first_name_kg: 'Чынара',
          last_name_kg: 'Токтосунова',
          middle_name_kg: 'Сыдыковна',
          position_display: 'Профессор кафедры внутренних болезней',
          academic_degree_display: 'Доктор медицинских наук',
          academic_title: 'Профессор',
          email: 'ch.toktosunova@medicine.su.edu.kg',
          phone: '+996 (312) 54-31-01',
          office: 'Кабинет 205',
          photo: null
        },
        {
          id: 3,
          full_name: 'Исаков Темир Абдулаевич',
          first_name: 'Темир',
          last_name: 'Исаков',
          middle_name: 'Абдулаевич',
          first_name_en: 'Temir',
          last_name_en: 'Isakov',
          first_name_kg: 'Темир',
          last_name_kg: 'Исаков',
          middle_name_kg: 'Абдулаевич',
          position_display: 'Профессор кафедры хирургии',
          academic_degree_display: 'Доктор медицинских наук',
          academic_title: 'Профессор',
          email: 't.isakov@medicine.su.edu.kg',
          phone: '+996 (312) 54-31-02',
          office: 'Кабинет 210',
          photo: null
        }
      ]
    },
    'associate_professor': {
      name: 'Доценты',
      faculty: [
        {
          id: 4,
          full_name: 'Жумалиева Гүлнара Ислямовна',
          first_name: 'Гүлнара',
          last_name: 'Жумалиева',
          middle_name: 'Ислямовна',
          first_name_en: 'Gulnara',
          last_name_en: 'Zhumalieva',
          first_name_kg: 'Гүлнара',
          last_name_kg: 'Жумалиева',
          middle_name_kg: 'Ислямовна',
          position_display: 'Доцент кафедры педиатрии',
          academic_degree_display: 'Кандидат медицинских наук',
          academic_title: 'Доцент',
          email: 'g.zhumalieva@medicine.su.edu.kg',
          phone: '+996 (312) 54-31-03',
          office: 'Кабинет 115',
          photo: null
        }
      ]
    }
  };

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        setLoading(true);
        const data = await hsmService.getFacultyByPosition();
        // Если нет данных или данные не подходящие, используем fallback
        if (!data || Object.keys(data).length === 0) {
          setFacultyData(fallbackFacultyData);
        } else {
          setFacultyData(data);
        }
      } catch (err) {
        console.error('Error fetching faculty data:', err);
        // При ошибке используем fallback данные
        setFacultyData(fallbackFacultyData);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('hsm.error')}</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('hsm.faculty_title', 'Профессорско-преподавательский состав')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('hsm.faculty_description', 'Высококвалифицированные преподаватели и исследователи Высшей медицинской школы')}
          </p>
        </motion.div>

        {/* Faculty Sections */}
        <div className="space-y-12">
          {Object.entries(facultyData).map(([positionCode, positionData]) => (
            <FacultySection
              key={positionCode}
              position={positionData}
              faculty={positionData.faculty}
              language={i18n.language}
            />
          ))}
        </div>

        {/* Empty State */}
        {Object.keys(facultyData).length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('hsm.no_faculty', 'Преподаватели не найдены')}
              </h3>
              <p className="text-gray-600">
                {t('hsm.no_faculty_description', 'Информация о преподавателях скоро появится на сайте')}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Faculty;
