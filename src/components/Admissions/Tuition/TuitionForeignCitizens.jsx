import React, { useState } from 'react';
import { Building2, DollarSign, FileText, GraduationCap, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TuitionForeignCitizens = () => {
  const { t } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState('usd');

  // Статичные данные для стоимости программ для иностранцев
  const tuitionData = {
    general: {
      name: t('tuitionForeign.general.name', 'Лечебное дело'),
      programs: [
        {
          program: t('tuitionForeign.general.prog1', 'Лечебное дело (6 лет)'),
          usd: '3,500',
          eur: '3,200',
          som: '310,000'
        },
        {
          program: t('tuitionForeign.general.prog2', 'Лечебное дело (на английском)'),
          usd: '4,000',
          eur: '3,700',
          som: '350,000'
        }
      ]
    },
    dentistry: {
      name: t('tuitionForeign.dentistry.name', 'Стоматология'),
      programs: [
        {
          program: t('tuitionForeign.dentistry.prog1', 'Стоматология (5 лет)'),
          usd: '4,500',
          eur: '4,200',
          som: '400,000'
        },
        {
          program: t('tuitionForeign.dentistry.prog2', 'Ортодонтия (специализация)'),
          usd: '5,000',
          eur: '4,600',
          som: '450,000'
        }
      ]
    },
    pharmacy: {
      name: t('tuitionForeign.pharmacy.name', 'Фармация'),
      programs: [
        {
          program: t('tuitionForeign.pharmacy.prog1', 'Фармация (5 лет)'),
          usd: '3,000',
          eur: '2,800',
          som: '270,000'
        },
        {
          program: t('tuitionForeign.pharmacy.prog2', 'Клиническая фармация'),
          usd: '3,200',
          eur: '3,000',
          som: '290,000'
        }
      ]
    },
    nursing: {
      name: t('tuitionForeign.nursing.name', 'Сестринское дело'),
      programs: [
        {
          program: t('tuitionForeign.nursing.prog1', 'Сестринское дело (4 года)'),
          usd: '2,500',
          eur: '2,300',
          som: '220,000'
        },
        {
          program: t('tuitionForeign.nursing.prog2', 'Сестринское дело (магистратура)'),
          usd: '2,800',
          eur: '2,600',
          som: '250,000'
        }
      ]
    }
  };

  // Статичные данные для дополнительных расходов
  const additionalCosts = [
    {
      category: t('tuitionForeign.costs.accommodation', 'Проживание'),
      items: [
        { name: t('tuitionForeign.costs.dormitory', 'Общежитие'), cost: '$200-300/мес', description: t('tuitionForeign.costs.dormitoryDesc', 'Двухместная комната') },
        { name: t('tuitionForeign.costs.apartment', 'Аренда квартиры'), cost: '$300-600/мес', description: t('tuitionForeign.costs.apartmentDesc', 'Зависит от района') }
      ],
      icon: '🏠',
      color: 'blue'
    },
    {
      category: t('tuitionForeign.costs.living', 'Ежемесячные расходы'),
      items: [
        { name: t('tuitionForeign.costs.food', 'Питание'), cost: '$150-250/мес', description: t('tuitionForeign.costs.foodDesc', 'Включая столовую и продукты') },
        { name: t('tuitionForeign.costs.transport', 'Транспорт'), cost: '$20-40/мес', description: t('tuitionForeign.costs.transportDesc', 'Общественный транспорт') },
        { name: t('tuitionForeign.costs.personal', 'Личные расходы'), cost: '$100-200/мес', description: t('tuitionForeign.costs.personalDesc', 'Одежда, развлечения') }
      ],
      Icon: DollarSign,
      color: 'green'
    },
    {
      category: t('tuitionForeign.costs.oneTime', 'Единоразовые расходы'),
      items: [
        { name: t('tuitionForeign.costs.visa', 'Студенческая виза'), cost: '$50-100', description: t('tuitionForeign.costs.visaDesc', 'Консульский сбор') },
        { name: t('tuitionForeign.costs.medical', 'Медицинская страховка'), cost: '$200-400/год', description: t('tuitionForeign.costs.medicalDesc', 'Полное покрытие') },
        { name: t('tuitionForeign.costs.documents', 'Оформление документов'), cost: '$100-200', description: t('tuitionForeign.costs.documentsDesc', 'Переводы, нострификация') }
      ],
      Icon: FileText,
      color: 'purple'
    }
  ];

  // Статичные данные для стипендий
  const scholarships = [
    {
      title: t('tuitionForeign.scholarships.government', 'Государственная стипендия'),
      description: t('tuitionForeign.scholarships.governmentDesc', 'Полное покрытие обучения от правительства КР'),
      coverage: t('tuitionForeign.scholarships.governmentCoverage', '100% стоимости обучения'),
      requirements: [
        t('tuitionForeign.scholarships.govReq1', 'Высокие академические показатели'),
        t('tuitionForeign.scholarships.govReq2', 'Рекомендации от посольства'),
        t('tuitionForeign.scholarships.govReq3', 'Знание русского или английского языка')
      ],
      deadline: t('tuitionForeign.scholarships.govDeadline', '31 марта'),
      icon: Building2
    },
    {
      title: t('tuitionForeign.scholarships.university', 'Университетская стипендия'),
      description: t('tuitionForeign.scholarships.universityDesc', 'Частичная компенсация от университета'),
      coverage: t('tuitionForeign.scholarships.universityCoverage', '25-50% стоимости обучения'),
      requirements: [
        t('tuitionForeign.scholarships.uniReq1', 'Отличные результаты вступительных экзаменов'),
        t('tuitionForeign.scholarships.uniReq2', 'Мотивационное письмо'),
        t('tuitionForeign.scholarships.uniReq3', 'Портфолио достижений')
      ],
      deadline: t('tuitionForeign.scholarships.uniDeadline', '15 мая'),
      Icon: GraduationCap
    },
    {
      title: t('tuitionForeign.scholarships.merit', 'Стипендия за заслуги'),
      description: t('tuitionForeign.scholarships.meritDesc', 'Поощрение выдающихся студентов'),
      coverage: t('tuitionForeign.scholarships.meritCoverage', '15-30% скидка'),
      requirements: [
        t('tuitionForeign.scholarships.merReq1', 'Активное участие в научной работе'),
        t('tuitionForeign.scholarships.merReq2', 'Волонтерская деятельность'),
        t('tuitionForeign.scholarships.merReq3', 'Лидерские качества')
      ],
      deadline: t('tuitionForeign.scholarships.merDeadline', 'В течение года'),
      Icon: Star
    }
  ];

  // Банковские реквизиты для иностранцев
  const bankDetails = {
    usd: {
      bankName: t('tuitionForeign.bank.nameUSD', 'Демир Банк SWIFT: DEMIKGKA'),
      account: 'USD 9876543210987654',
      swift: 'DEMIKGKA',
      correspondent: 'JP Morgan Chase Bank, New York',
      recipient: t('tuitionForeign.bank.recipient', 'OO "Medical University"')
    },
    eur: {
      bankName: t('tuitionForeign.bank.nameEUR', 'Optima Bank SWIFT: OPTIMAKG'),
      account: 'EUR 1357924680135792',
      swift: 'OPTIMAKG',
      correspondent: 'Deutsche Bank AG, Frankfurt',
      recipient: t('tuitionForeign.bank.recipient', 'OO "Medical University"')
    }
  };

  const faculties = Object.keys(tuitionData);

  const getCurrencySymbol = () => {
    switch(selectedCurrency) {
      case 'usd': return '$';
      case 'eur': return '€';
      case 'som': return t('tuitionForeign.som', 'сом');
      default: return '$';
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'border-blue-200 bg-blue-50',
      green: 'border-green-200 bg-green-50',
      purple: 'border-purple-200 bg-purple-50'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {t('tuitionForeign.title', 'Стоимость обучения для иностранных граждан')}
          </h1>
          <p className="text-xl opacity-90">
            {t('tuitionForeign.subtitle', 'Полная информация о стоимости программ, дополнительных расходах и стипендиях')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Переключатель валют */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {t('tuitionForeign.tuition.title', 'Стоимость программ обучения')}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedCurrency('usd')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCurrency === 'usd'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setSelectedCurrency('eur')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCurrency === 'eur'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                EUR (€)
              </button>
              <button
                onClick={() => setSelectedCurrency('som')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCurrency === 'som'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('tuitionForeign.som', 'СОМ')}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {faculties.map((faculty, index) => (
              <div key={faculty} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {tuitionData[faculty].name}
                </h3>
                <div className="space-y-3">
                  {tuitionData[faculty].programs.map((program, progIndex) => (
                    <div key={progIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">{program.program}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-600">
                          {getCurrencySymbol()}{program[selectedCurrency]}
                        </span>
                        <p className="text-sm text-gray-600">
                          {selectedCurrency === 'som' ? t('tuitionForeign.perYear', '/год') : '/year'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
            <p className="text-sm text-blue-800">
              <strong>{t('tuitionForeign.note', 'Примечание:')}</strong> {' '}
              {t('tuitionForeign.noteText', 'Курсы валют могут изменяться. Оплата принимается в долларах США, евро или сомах КР.')}
            </p>
          </div>
        </div>

        {/* Дополнительные расходы */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('tuitionForeign.additionalCosts.title', 'Дополнительные расходы')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {additionalCosts.map((category, index) => (
              <div key={index} className={`border-2 rounded-lg p-6 ${getColorClasses(category.color)}`}>
                <div className="text-center mb-4">
                  <span className="text-4xl mb-2 block">
                <category.Icon className="w-6 h-6" />
              </span>
                  <h3 className="text-xl font-semibold text-gray-800">{category.category}</h3>
                </div>
                
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                        <span className="text-sm font-bold text-green-600">{item.cost}</span>
                      </div>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">
              {t('tuitionForeign.budgetEstimate.title', 'Примерный месячный бюджет:')}
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-yellow-800">
                  <strong>{t('tuitionForeign.budgetEstimate.minimum', 'Минимальный:')}</strong> $470-590/мес
                </p>
                <p className="text-yellow-800">
                  <strong>{t('tuitionForeign.budgetEstimate.comfortable', 'Комфортный:')}</strong> $720-1090/мес
                </p>
              </div>
              <div>
                <p className="text-xs text-yellow-700">
                  {t('tuitionForeign.budgetEstimate.note', '* Не включая стоимость обучения')}
                </p>
                <p className="text-xs text-yellow-700">
                  {t('tuitionForeign.budgetEstimate.varies', '* Расходы могут варьироваться в зависимости от образа жизни')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Стипендии и скидки */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('tuitionForeign.scholarships.title', 'Стипендии и льготы')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {scholarships.map((scholarship, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-center mb-4">
                  <span className="text-4xl mb-2 block">
                <scholarship.Icon className="w-6 h-6" />
              </span>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{scholarship.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{scholarship.description}</p>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {scholarship.coverage}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-gray-800 text-sm">
                    {t('tuitionForeign.scholarships.requirements', 'Требования:')}
                  </h4>
                  {scholarship.requirements.map((req, reqIndex) => (
                    <div key={reqIndex} className="flex items-start text-sm text-gray-700">
                      <span className="text-green-600 mr-2 mt-0.5">•</span>
                      {req}
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm text-gray-600">
                    <strong>{t('tuitionForeign.scholarships.deadline', 'Срок подачи:')}</strong> {scholarship.deadline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Банковские реквизиты */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {t('tuitionForeign.bankDetails.title', 'Банковские реквизиты для международных переводов')}
            </h2>
   
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* USD реквизиты */}
            <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">
                {t('tuitionForeign.bankDetails.usdTitle', 'Для переводов в USD')}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="font-medium text-gray-600">
                    {t('tuitionForeign.bankDetails.bank', 'Банк:')}
                  </label>
                  <p className="text-gray-800">{bankDetails.usd.bankName}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">
                    {t('tuitionForeign.bankDetails.account', 'Счет:')}
                  </label>
                  <p className="text-gray-800 font-mono">{bankDetails.usd.account}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">SWIFT:</label>
                  <p className="text-gray-800 font-mono">{bankDetails.usd.swift}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">
                    {t('tuitionForeign.bankDetails.correspondent', 'Банк-корреспондент:')}
                  </label>
                  <p className="text-gray-800">{bankDetails.usd.correspondent}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">
                    {t('tuitionForeign.bankDetails.recipient', 'Получатель:')}
                  </label>
                  <p className="text-gray-800">{bankDetails.usd.recipient}</p>
                </div>
              </div>
            </div>

            {/* EUR реквизиты */}
            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <h3 className="text-lg font-semibold text-green-800 mb-4">
                {t('tuitionForeign.bankDetails.eurTitle', 'Для переводов в EUR')}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="font-medium text-gray-600">
                    {t('tuitionForeign.bankDetails.bank', 'Банк:')}
                  </label>
                  <p className="text-gray-800">{bankDetails.eur.bankName}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">
                    {t('tuitionForeign.bankDetails.account', 'Счет:')}
                  </label>
                  <p className="text-gray-800 font-mono">{bankDetails.eur.account}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">SWIFT:</label>
                  <p className="text-gray-800 font-mono">{bankDetails.eur.swift}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">
                    {t('tuitionForeign.bankDetails.correspondent', 'Банк-корреспондент:')}
                  </label>
                  <p className="text-gray-800">{bankDetails.eur.correspondent}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">
                    {t('tuitionForeign.bankDetails.recipient', 'Получатель:')}
                  </label>
                  <p className="text-gray-800">{bankDetails.eur.recipient}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.768 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-sm text-red-800 mb-2">
                  <strong>{t('tuitionForeign.bankDetails.important', 'Важные моменты при переводе:')}</strong>
                </p>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• {t('tuitionForeign.bankDetails.rule1', 'Все банковские комиссии несет отправитель')}</li>
                  <li>• {t('tuitionForeign.bankDetails.rule2', 'В назначении платежа укажите ФИО студента и "tuition fee"')}</li>
                  <li>• {t('tuitionForeign.bankDetails.rule3', 'Переводы могут занимать 3-5 рабочих дней')}</li>
                  <li>• {t('tuitionForeign.bankDetails.rule4', 'Сохраняйте подтверждение о переводе до получения зачетки')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Контактная информация */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('tuitionForeign.contact.title', 'Финансовый отдел для иностранных студентов')}
            </h2>
            <p className="text-gray-600">
              {t('tuitionForeign.contact.subtitle', 'Мы поможем с любыми вопросами по оплате и финансированию обучения')}
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
                {t('tuitionForeign.contact.phone', 'Телефон')}
              </h3>
              <p className="text-gray-600">+996 312 545 003</p>
              <p className="text-gray-600">+996 555 123 789</p>
            </div>
            
            <div className="p-4">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('tuitionForeign.contact.email', 'Email')}
              </h3>
              <p className="text-gray-600">finance.intl@su.edu.kg</p>
              <p className="text-gray-600">scholarships@su.edu.kg</p>
            </div>
            
            <div className="p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('tuitionForeign.contact.support', 'Поддержка 24/7')}
              </h3>
              <p className="text-gray-600">WhatsApp: +996 555 123 789</p>
              <p className="text-gray-600">Telegram: @su_finance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionForeignCitizens;
