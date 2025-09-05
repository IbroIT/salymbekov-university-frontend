import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Tuition = () => {
  const { t } = useTranslation();
  const [selectedProgram, setSelectedProgram] = useState('medicine');
  const [selectedDiscount, setSelectedDiscount] = useState('none');

  const programs = [
    {
      id: 'medicine',
      name: 'Лечебное дело',
      semesterCost: 85000,
      yearCost: 170000,
      duration: 6,
      discounts: [
        { id: 'excellent', name: '10% отличникам', percent: 10 },
        { id: 'early', name: '5% при ранней оплате', percent: 5 }
      ]
    },
    {
      id: 'dentistry',
      name: 'Стоматология',
      semesterCost: 95000,
      yearCost: 190000,
      duration: 5,
      discounts: [
        { id: 'excellent', name: '8% отличникам', percent: 8 },
        { id: 'early', name: '5% при ранней оплате', percent: 5 }
      ]
    },
    {
      id: 'pharmacy',
      name: 'Фармация',
      semesterCost: 75000,
      yearCost: 150000,
      duration: 5,
      discounts: [
        { id: 'excellent', name: '10% отличникам', percent: 10 },
        { id: 'early', name: '5% при ранней оплате', percent: 5 }
      ]
    },
    {
      id: 'nursing',
      name: 'Сестринское дело',
      semesterCost: 65000,
      yearCost: 130000,
      duration: 4,
      discounts: [
        { id: 'excellent', name: '10% отличникам', percent: 10 },
        { id: 'early', name: '3% при ранней оплате', percent: 3 }
      ]
    }
  ];

  const currentProgram = programs.find(p => p.id === selectedProgram);
  const currentDiscount = selectedDiscount === 'none' 
    ? { percent: 0 } 
    : currentProgram.discounts.find(d => d.id === selectedDiscount);

  const calculateCost = (baseCost, discount) => {
    return baseCost - (baseCost * discount / 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + ' сом';
  };

  const paymentMethods = [
    {
      title: 'Банковский перевод',
      description: 'Переводы через банковские отделения',
      details: [
        'Получатель: ОсОО "Салымбеков Университет"',
        'ИНН: 12345678901234',
        'Расчетный счет: 1234567890123456789',
        'Банк: КИКБ'
      ]
    },
    {
      title: 'Онлайн оплата',
      description: 'Оплата через интернет-банкинг',
      details: [
        'Элсом',
        'Balance.kg',
        'О! Деньги',
        'МегаПэй'
      ]
    },
    {
      title: 'Наличный расчет',
      description: 'Оплата в кассе университета',
      details: [
        'Адрес: г. Бишкек, ул. Ахунбаева 92',
        'Время работы: 09:00 - 18:00',
        'Выходные: суббота, воскресенье'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Стоимость обучения
            </h1>
            <p className="text-xl opacity-90">
              Узнайте стоимость обучения и доступные скидки
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Сравнительная таблица стоимости
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Программа</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Семестр</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Учебный год</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Общая стоимость</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Доступные скидки</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program, index) => (
                  <tr key={program.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{program.name}</td>
                    <td className="px-6 py-4 text-gray-700">{formatCurrency(program.semesterCost)}</td>
                    <td className="px-6 py-4 text-gray-700">{formatCurrency(program.yearCost)}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-purple-600">
                        {formatCurrency(program.yearCost * program.duration)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {program.discounts.map((discount, discIndex) => (
                          <span key={discIndex} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {discount.name}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cost Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Калькулятор стоимости
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Выберите программу
                </label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {programs.map(program => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Выберите скидку
                </label>
                <select
                  value={selectedDiscount}
                  onChange={(e) => setSelectedDiscount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="none">Без скидки</option>
                  {currentProgram.discounts.map(discount => (
                    <option key={discount.id} value={discount.id}>
                      {discount.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-purple-800">
                Расчет стоимости
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Программа:</span>
                  <span className="font-medium">{currentProgram.name}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Стоимость за семестр:</span>
                  <span className={selectedDiscount !== 'none' ? 'line-through text-gray-500' : 'font-medium'}>
                    {formatCurrency(currentProgram.semesterCost)}
                  </span>
                </div>
                
                {selectedDiscount !== 'none' && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Со скидкой за семестр:</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(calculateCost(currentProgram.semesterCost, currentDiscount.percent))}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Стоимость за год:</span>
                  <span className={selectedDiscount !== 'none' ? 'line-through text-gray-500' : 'font-medium'}>
                    {formatCurrency(currentProgram.yearCost)}
                  </span>
                </div>
                
                {selectedDiscount !== 'none' && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Со скидкой за год:</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(calculateCost(currentProgram.yearCost, currentDiscount.percent))}
                    </span>
                  </div>
                )}
                
                <hr className="my-4" />
                
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-700">Общая стоимость ({currentProgram.duration} лет):</span>
                  <span className="font-bold text-purple-600">
                    {formatCurrency(calculateCost(currentProgram.yearCost * currentProgram.duration, currentDiscount.percent))}
                  </span>
                </div>
                
                {selectedDiscount !== 'none' && (
                  <div className="text-center text-sm text-green-600 font-medium">
                    Экономия: {formatCurrency((currentProgram.yearCost * currentProgram.duration) - calculateCost(currentProgram.yearCost * currentProgram.duration, currentDiscount.percent))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Способы оплаты
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {paymentMethods.map((method, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {method.description}
                </p>
                <div className="space-y-2">
                  {method.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="text-sm text-gray-700">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-blue-800">
              💡 Полезные советы
            </h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Оплачивайте обучение заранее и получите скидку</li>
              <li>• Отличная успеваемость дает право на скидку</li>
              <li>• Возможна рассрочка платежа по семестрам</li>
              <li>• Скидки не суммируются между собой</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-green-800">
              📞 Вопросы по оплате?
            </h4>
            <p className="text-sm text-green-700 mb-3">
              Обратитесь в отдел по работе со студентами
            </p>
            <div className="space-y-1 text-sm text-green-700">
              <p>Телефон: +996 312 123 456</p>
              <p>Email: cashier@salymbekov.edu.kg</p>
              <p>Часы работы: 09:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tuition;
