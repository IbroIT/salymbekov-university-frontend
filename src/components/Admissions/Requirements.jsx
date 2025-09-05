import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Requirements = () => {
  const { t } = useTranslation();
  const [selectedProgram, setSelectedProgram] = useState('all');

  const programs = [
    { id: 'all', name: 'Все программы' },
    { id: 'medicine', name: 'Лечебное дело' },
    { id: 'dentistry', name: 'Стоматология' },
    { id: 'pharmacy', name: 'Фармация' },
    { id: 'nursing', name: 'Медсестринское дело' }
  ];

  const requirements = [
    {
      program: 'Лечебное дело',
      programId: 'medicine',
      ortScore: '120+',
      examinations: ['Биология', 'Химия'],
      documents: ['Аттестат о среднем образовании', 'Медицинская справка', 'Паспорт', 'Фотографии 3x4 (6 шт.)'],
      duration: '6 лет',
      language: 'Русский/Кыргызский'
    },
    {
      program: 'Стоматология',
      programId: 'dentistry',
      ortScore: '110+',
      examinations: ['Биология', 'Химия'],
      documents: ['Аттестат о среднем образовании', 'Медицинская справка', 'Паспорт', 'Фотографии 3x4 (6 шт.)'],
      duration: '5 лет',
      language: 'Русский/Кыргызский'
    },
    {
      program: 'Фармация',
      programId: 'pharmacy',
      ortScore: '100+',
      examinations: ['Химия', 'Биология'],
      documents: ['Аттестат о среднем образовании', 'Медицинская справка', 'Паспорт', 'Фотографии 3x4 (6 шт.)'],
      duration: '5 лет',
      language: 'Русский/Кыргызский'
    },
    {
      program: 'Медсестринское дело',
      programId: 'nursing',
      ortScore: '90+',
      examinations: ['Биология'],
      documents: ['Аттестат о среднем образовании', 'Медицинская справка', 'Паспорт', 'Фотографии 3x4 (6 шт.)'],
      duration: '4 года',
      language: 'Русский/Кыргызский'
    }
  ];

  const filteredRequirements = selectedProgram === 'all' 
    ? requirements 
    : requirements.filter(req => req.programId === selectedProgram);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Требования к поступлению
            </h1>
            <p className="text-xl opacity-90">
              Узнайте требования для поступления на различные программы
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Program Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Выберите программу</h2>
          <div className="flex flex-wrap gap-3">
            {programs.map(program => (
              <button
                key={program.id}
                onClick={() => setSelectedProgram(program.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedProgram === program.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {program.name}
              </button>
            ))}
          </div>
        </div>

        {/* Requirements Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-xl font-bold text-gray-800">
              Требования по программам
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Программа</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Балл ОРТ</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Вступительные</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Документы</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequirements.map((req, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{req.program}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {req.ortScore}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {req.examinations.map((exam, examIndex) => (
                          <span key={examIndex} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            {exam}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">Аттестат, Медсправка</div>
                        <div className="text-xs text-gray-500">+ стандартный пакет</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Required Documents Section */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Необходимые документы
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">
                  Общие требования для всех программ:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Аттестат о среднем образовании (оригинал + копия)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Паспорт (копия всех страниц)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Медицинская справка формы 086У</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Фотографии 3x4 см (6 штук)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Сертификат ОРТ</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">
                  Дополнительные документы:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Справка о доходах родителей (для получения скидки)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Документы о льготах (если имеются)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Характеристика из школы</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Портфолио достижений (рекомендуется)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-blue-800">
              📋 Важная информация
            </h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Все документы должны быть переведены на государственный язык</li>
              <li>• Иностранные документы требуют нострификации</li>
              <li>• Медицинская справка действительна 6 месяцев</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-green-800">
              📞 Нужна помощь?
            </h4>
            <p className="text-sm text-green-700 mb-3">
              Свяжитесь с приемной комиссией для получения консультации
            </p>
            <div className="space-y-1 text-sm text-green-700">
              <p>Телефон: +996 312 123 456</p>
              <p>Email: admission@salymbekov.edu.kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requirements;
