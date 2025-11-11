import React, { useState } from 'react';
import { emailConfig } from '../config/emailConfig';
import { CheckCircle, ClipboardList, Lightbulb, Mail, Settings, Wrench } from 'lucide-react';

const EmailSettings = () => {
  const [emails, setEmails] = useState({
    admissions: emailConfig.admissions,
    info: emailConfig.info,
    support: emailConfig.support
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Для демонстрации просто показываем сообщение
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // Можно сохранить в localStorage для демонстрации
    localStorage.setItem('emailSettings', JSON.stringify(emails));
  };

  const handleInputChange = (type, value) => {
    setEmails(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        <Settings className="w-5 h-5" /> Настройки Email адресов
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-5 h-5" /> Email для заявок на поступление
          </label>
          <input
            type="email"
            value={emails.admissions}
            onChange={(e) => handleInputChange('admissions', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="salymbekov.admissions@gmail.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            Сюда будут приходить все заявки абитуриентов
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ❓ Email для общих вопросов
          </label>
          <input
            type="email"
            value={emails.info}
            onChange={(e) => handleInputChange('info', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="salymbekov.info@gmail.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            Сюда будут приходить вопросы от посетителей сайта
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Wrench className="w-5 h-5" /> Email для технической поддержки
          </label>
          <input
            type="email"
            value={emails.support}
            onChange={(e) => handleInputChange('support', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="salymbekov.support@gmail.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            Сюда будут приходить технические вопросы
          </p>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            💾 Сохранить настройки
          </button>
        </div>

        {saved && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            <CheckCircle className="w-5 h-5" /> Настройки успешно сохранены!
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-gray-800 mb-2"><ClipboardList className="w-5 h-5" /> Текущие адреса:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li><strong>Заявки:</strong> {emails.admissions}</li>
          <li><strong>Вопросы:</strong> {emails.info}</li>
          <li><strong>Поддержка:</strong> {emails.support}</li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-bold text-blue-800 mb-2"><Lightbulb className="w-5 h-5" /> Рекомендации:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Используйте Gmail адреса для лучшей совместимости</li>
          <li>• Создайте отдельные адреса для разных типов писем</li>
          <li>• Настройте автоответы в Gmail для подтверждения получения</li>
          <li>• Регулярно проверяйте папку "Спам" в Gmail</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailSettings;
