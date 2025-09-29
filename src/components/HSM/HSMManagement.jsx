import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { leadershipAPI } from '../../services/leadershipService';
import { getLocalizedValue, getLocalizedArray, getCurrentLanguage } from '../../utils/localization';

const LeadershipPage = () => {
  const { t, i18n } = useTranslation();
  const [leadershipData, setLeadershipData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получаем текущий язык из i18n
  const currentLanguage = i18n.language || 'ru';

  useEffect(() => {
    const fetchLeadershipData = async () => {
      try {
        setLoading(true);
        const response = await leadershipAPI.getAll();
        setLeadershipData(response.data.results || response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching leadership data:', err);
        setError('Не удалось загрузить данные о руководстве');
      } finally {
        setLoading(false);
      }
    };

    fetchLeadershipData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const directors = leadershipData.filter(person => person.is_director);
  const departmentHeads = leadershipData.filter(person => !person.is_director);

  const getPersonName = (person) => {
    return getLocalizedValue(person, 'name', currentLanguage);
  };

  const getPersonPosition = (person) => {
    return getLocalizedValue(person, 'position', currentLanguage);
  };

  const getPersonDegree = (person) => {
    return getLocalizedValue(person, 'degree', currentLanguage);
  };

  const getPersonExperience = (person) => {
    return getLocalizedValue(person, 'experience', currentLanguage);
  };

  const getPersonBio = (person) => {
    return getLocalizedValue(person, 'bio', currentLanguage);
  };

  const getPersonAchievements = (person) => {
    return getLocalizedArray(person, 'achievements', currentLanguage);
  };

  const getPersonDepartment = (person) => {
    return getLocalizedValue(person, 'department', currentLanguage);
  };

  const getPersonSpecialization = (person) => {
    return getLocalizedValue(person, 'specialization', currentLanguage);
  };

  const getPersonStaffCount = (person) => {
    return getLocalizedValue(person, 'staff_count', currentLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('leadership.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('leadership.subtitle')}
          </p>
        </div>

        {/* Директор */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {t('leadership.directorate')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {directors.map((director) => (
              <div
                key={director.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-4">
                      <img
                        src={director.image_url || "/api/placeholder/300/300"}
                        alt={getPersonName(director)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {getPersonName(director)}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-2">
                      {getPersonPosition(director)}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      {getPersonDegree(director)}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      {t('leadership.experience')}: {getPersonExperience(director)}
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <span className="mr-2">📧</span>
                      {director.email}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold mb-2">{t('leadership.achievements')}:</p>
                      <ul className="space-y-1">
                        {getPersonAchievements(director).slice(0, 3).map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            <span className="text-xs">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Заведующие кафедрами */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {t('leadership.departmentHeads')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departmentHeads.map((head) => (
              <div
                key={head.id}
                className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100"
              >
                <div className="p-5">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden shadow-md mb-3">
                      <img
                        src={head.image_url || "/api/placeholder/300/300"}
                        alt={getPersonName(head)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {getPersonName(head)}
                    </h3>
                    <p className="text-blue-600 font-semibold text-sm mb-1">
                      {getPersonPosition(head)}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {getPersonDepartment(head)}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="mr-2">🎓</span>
                      <span>{getPersonDegree(head)}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="mr-2">📅</span>
                      <span>{t('leadership.experience')}: {getPersonExperience(head)}</span>
                    </div>
                    {getPersonStaffCount(head) && (
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="mr-2">👥</span>
                        <span>{getPersonStaffCount(head)}</span>
                      </div>
                    )}
                  </div>

                  {getPersonSpecialization(head) && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-700 font-semibold mb-1">{t('leadership.specialization')}:</p>
                      <p className="text-xs text-gray-600 leading-tight">
                        {getPersonSpecialization(head)}
                      </p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="mr-2">📧</span>
                        <span className="truncate">{head.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default LeadershipPage;