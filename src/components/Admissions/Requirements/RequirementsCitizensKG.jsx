import React from 'react';
import { useTranslation } from 'react-i18next';

const RequirementsCitizensKG = () => {
  const { t } = useTranslation();

  // Статичные данные для минимальных баллов по ОРТ
  const ortScores = [
    { specialty: t('requirementsCitizensKG.ortScores.generalMedicine'), score: 140 },
    { specialty: t('requirementsCitizensKG.ortScores.dentistry'), score: 135 },
    { specialty: t('requirementsCitizensKG.ortScores.pharmacy'), score: 130 },
    { specialty: t('requirementsCitizensKG.ortScores.nursing'), score: 120 },
    { specialty: t('requirementsCitizensKG.ortScores.publicHealth'), score: 125 },
  ];

  // Статичные данные для медицинских требований
  const medicalRequirements = [
    t('requirementsCitizensKG.medicalReqs.generalHealth'),
    t('requirementsCitizensKG.medicalReqs.vaccination'),
    t('requirementsCitizensKG.medicalReqs.fluorography'),
    t('requirementsCitizensKG.medicalReqs.bloodTest'),
    t('requirementsCitizensKG.medicalReqs.urineTest'),
    t('requirementsCitizensKG.medicalReqs.psychologist'),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {t('requirementsCitizensKG.title', 'Требования для граждан КР')}
          </h1>
          <p className="text-xl opacity-90">
            {t('requirementsCitizensKG.subtitle', 'Академические и документальные требования для поступления')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Минимальные баллы по ОРТ */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('requirementsCitizensKG.ortScores.title', 'Минимальные баллы по ОРТ')}
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      {t('requirementsCitizensKG.ortScores.specialty', 'Специальность')}
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      {t('requirementsCitizensKG.ortScores.minScore', 'Мин. балл')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ortScores.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800">{item.specialty}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                          {item.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Медицинские требования */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('requirementsCitizensKG.medical.title', 'Медицинские требования')}
              </h2>
            </div>
            
            <div className="space-y-3">
              {medicalRequirements.map((requirement, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{requirement}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <p className="text-sm text-yellow-800">
                <strong>{t('requirementsCitizensKG.medical.note')}</strong> {' '}
                {t('requirementsCitizensKG.medical.noteText')}
              </p>
            </div>
          </div>

          {/* Условия поступления */}
          <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('requirementsCitizensKG.admission.title', 'Условия поступления')}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Бюджетные места */}
              <div className="border-2 border-green-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-center mb-4">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    {t('requirementsCitizensKG.admission.budget.title', 'Бюджетные места')}
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    {t('requirementsCitizensKG.admission.budget.citizenship')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    {t('requirementsCitizensKG.admission.budget.highScores')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    {t('requirementsCitizensKG.admission.budget.competition')}
                  </li>
                </ul>
              </div>

              {/* Контрактные места */}
              <div className="border-2 border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-center mb-4">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    {t('requirementsCitizensKG.admission.contract.title', 'Контрактные места')}
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {t('requirementsCitizensKG.admission.contract.minScore')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {t('requirementsCitizensKG.admission.contract.payment')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {t('requirementsCitizensKG.admission.contract.guarantee')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Контактная информация */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('requirementsCitizensKG.contact.title')}
            </h2>
            <p className="text-gray-600">
              {t('requirementsCitizensKG.contact.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('requirementsCitizensKG.contact.phone')}
              </h3>
              <p className="text-gray-600">+996 312 545 000</p>
            </div>
            
            <div className="p-4">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('requirementsCitizensKG.contact.email')}
              </h3>
              <p className="text-gray-600">admissions@su.edu.kg</p>
            </div>
            
            <div className="p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('requirementsCitizensKG.contact.hours')}
              </h3>
              <p className="text-gray-600">
                {t('requirementsCitizensKG.contact.schedule')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsCitizensKG;
