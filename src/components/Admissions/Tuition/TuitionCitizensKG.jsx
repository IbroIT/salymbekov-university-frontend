import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TuitionCitizensKG = () => {
  const { t } = useTranslation();
  const [selectedFaculty, setSelectedFaculty] = useState('general');

  // Статичные данные для стоимости программ
  const tuitionData = {
    general: {
      name: t('tuitionCitizens.general.name'),
      programs: [
        {
          program: t('tuitionCitizens.general.prog1'),
          budget: t('tuitionCitizens.budget'),
          contract: '250,000',
          currency: t('tuitionCitizens.som')
        },
        {
          program: t('tuitionCitizens.general.prog2'),
          budget: t('tuitionCitizens.noBudget'),
          contract: '280,000',
          currency: t('tuitionCitizens.som')
        }
      ]
    },
    dentistry: {
      name: t('tuitionCitizens.dentistry.name'),
      programs: [
        {
          program: t('tuitionCitizens.dentistry.prog1'),
          budget: t('tuitionCitizens.budget'),
          contract: '300,000',
          currency: t('tuitionCitizens.som')
        },
        {
          program: t('tuitionCitizens.dentistry.prog2', 'Ортодонтия (специализация)'),
          budget: t('tuitionCitizens.noBudget', 'Нет'),
          contract: '300,000',
          currency: t('tuitionCitizens.som', 'сом/год')
        }
      ]
    },
    pharmacy: {
      name: t('tuitionCitizens.pharmacy.name'),
      programs: [
        {
          program: t('tuitionCitizens.pharmacy.prog1'),
          budget: t('tuitionCitizens.budget'),
          contract: '200,000',
          currency: t('tuitionCitizens.som')
        },
        {
          program: t('tuitionCitizens.pharmacy.prog2', 'Клиническая фармация'),
          budget: t('tuitionCitizens.limitedBudget', 'Ограничено'),
          contract: '200,000',
          currency: t('tuitionCitizens.som', 'сом/год')
        }
      ]
    },
    nursing: {
      name: t('tuitionCitizens.nursing.name'),
      programs: [
        {
          program: t('tuitionCitizens.nursing.prog1'),
          budget: t('tuitionCitizens.budget'),
          contract: '180,000',
          currency: t('tuitionCitizens.som')
        },
        {
          program: t('tuitionCitizens.nursing.prog2', 'Сестринское дело (магистратура)'),
          budget: t('tuitionCitizens.limitedBudget', 'Ограничено'),
          contract: '180,000',
          currency: t('tuitionCitizens.som', 'сом/год')
        }
      ]
    }
  };

  // Статичные данные для рассрочки и льгот
  const paymentOptions = [
    {
      type: t('tuitionCitizens.payment.installment'),
      description: t('tuitionCitizens.payment.installmentDesc'),
      conditions: [
        t('tuitionCitizens.payment.cond1'),
        t('tuitionCitizens.payment.cond2'),
        t('tuitionCitizens.payment.cond3')
      ],
      icon: '💳'
    },
    {
      type: t('tuitionCitizens.payment.scholarship'),
      description: t('tuitionCitizens.payment.scholarshipDesc'),
      conditions: [
        t('tuitionCitizens.payment.scho1'),
        t('tuitionCitizens.payment.scho2'),
        t('tuitionCitizens.payment.scho3')
      ],
      icon: '🏆'
    },
    {
      type: t('tuitionCitizens.payment.social'),
      description: t('tuitionCitizens.payment.socialDesc'),
      conditions: [
        t('tuitionCitizens.payment.soc1'),
        t('tuitionCitizens.payment.soc2'),
        t('tuitionCitizens.payment.soc3')
      ],
      icon: '🤝'
    }
  ];

  // Банковские реквизиты
  const bankDetails = {
    bankName: t('tuitionCitizens.bank.name',),
    account: '1234567890123456',
    bik: '109001',
    inn: '12345678901234',
    recipient: t('tuitionCitizens.bank.recipient'),
    purpose: t('tuitionCitizens.bank.purpose')
  };

  const faculties = Object.keys(tuitionData);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {t('tuitionCitizens.title')}
          </h1>
          <p className="text-xl opacity-90">
            {t('tuitionCitizens.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Переключатель факультетов */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('tuitionCitizens.faculties.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {faculties.map((faculty) => (
              <button
                key={faculty}
                onClick={() => setSelectedFaculty(faculty)}
                className={`p-4 rounded-lg border-2 transition-all ${selectedFaculty === faculty
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
              >
                <h3 className="font-semibold">{tuitionData[faculty].name}</h3>
              </button>
            ))}
          </div>

          {/* Таблица стоимости */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                    {t('tuitionCitizens.table.program')}
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    {t('tuitionCitizens.table.budget')}
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    {t('tuitionCitizens.table.contract')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tuitionData[selectedFaculty].programs.map((program, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">
                      {program.program}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${program.budget === t('tuitionCitizens.budget')
                          ? 'bg-green-100 text-green-800'
                          : program.budget === t('tuitionCitizens.limitedBudget')
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {program.budget}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="text-lg font-bold text-blue-600">
                        {program.contract} {program.currency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
            <p className="text-sm text-blue-800">
              <strong>{t('tuitionCitizens.note')}</strong> {' '}
              {t('tuitionCitizens.noteText')}
            </p>
          </div>
        </div>

        {/* Варианты оплаты и льготы */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('tuitionCitizens.paymentOptions.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {paymentOptions.map((option, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-center mb-4">
                  <span className="text-4xl mb-2 block">{option.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{option.type}</h3>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </div>

                <div className="space-y-2">
                  {option.conditions.map((condition, condIndex) => (
                    <div key={condIndex} className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">•</span>
                      <p className="text-gray-700 text-sm">{condition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Банковские реквизиты */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {t('tuitionCitizens.bankDetails.title')}
            </h2>
          
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <label className="text-sm font-medium text-gray-600">
                  {t('tuitionCitizens.bankDetails.bankName')}
                </label>
                <p className="text-gray-800 font-semibold">{bankDetails.bankName}</p>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <label className="text-sm font-medium text-gray-600">
                  {t('tuitionCitizens.bankDetails.account')}
                </label>
                <p className="text-gray-800 font-mono text-lg">{bankDetails.account}</p>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <label className="text-sm font-medium text-gray-600">
                  {t('tuitionCitizens.bankDetails.bik')}
                </label>
                <p className="text-gray-800 font-mono">{bankDetails.bik}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <label className="text-sm font-medium text-gray-600">
                  {t('tuitionCitizens.bankDetails.inn')}
                </label>
                <p className="text-gray-800 font-mono">{bankDetails.inn}</p>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <label className="text-sm font-medium text-gray-600">
                  {t('tuitionCitizens.bankDetails.recipient')}
                </label>
                <p className="text-gray-800 font-semibold">{bankDetails.recipient}</p>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <label className="text-sm font-medium text-gray-600">
                  {t('tuitionCitizens.bankDetails.purpose')}
                </label>
                <p className="text-gray-800">{bankDetails.purpose}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.768 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-sm text-yellow-800 mb-2">
                  <strong>{t('tuitionCitizens.bankDetails.important', 'Важно!')}</strong>
                </p>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• {t('tuitionCitizens.bankDetails.rule1')}</li>
                  <li>• {t('tuitionCitizens.bankDetails.rule2')}</li>
                  <li>• {t('tuitionCitizens.bankDetails.rule3')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Кнопка скачивания PDF */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                // Функция для скачивания PDF с реквизитами
                const generatePDF = () => {
                  const content = `
БАНКОВСКИЕ РЕКВИЗИТЫ
для оплаты обучения

Наименование банка: ${bankDetails.bankName}
Расчетный счет: ${bankDetails.account}
БИК: ${bankDetails.bik}
ИНН: ${bankDetails.inn}
Получатель: ${bankDetails.recipient}
Назначение платежа: ${bankDetails.purpose}

ВАЖНО:
• В назначении платежа обязательно укажите ФИО студента и курс
• Сохраняйте квитанцию об оплате до окончания обучения
• При оплате через банкомат проверьте правильность реквизитов

Контакты бухгалтерии:
Телефон: +996 312 545 002
Email: finance@su.edu.kg
                  `;

                  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'bank-details-payment.txt';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                };
                generatePDF();
              }}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('tuitionCitizens.bankDetails.downloadPDF')}
            </button>
            <p className="text-sm text-gray-600 mt-2">
              {t('tuitionCitizens.bankDetails.downloadNote')}
            </p>
          </div>
        </div>

        {/* Контактная информация */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('tuitionCitizens.contact.title')}
            </h2>
            <p className="text-gray-600">
              {t('tuitionCitizens.contact.subtitle')}
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
                {t('tuitionCitizens.contact.phone')}
              </h3>
              <p className="text-gray-600">+996 312 545 002</p>
            </div>

            <div className="p-4">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('tuitionCitizens.contact.email', 'Email')}
              </h3>
              <p className="text-gray-600">finance@su.edu.kg</p>
            </div>

            <div className="p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('tuitionCitizens.contact.hours')}
              </h3>
              <p className="text-gray-600">
                {t('tuitionCitizens.contact.schedule')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionCitizensKG;
