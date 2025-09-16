import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  PaperAirplaneIcon, 
  ChatBubbleLeftEllipsisIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const AppealForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    course: '',
    faculty: '',
    email: '',
    phone: '',
    appealType: '',
    subject: '',
    description: '',
    urgency: 'medium',
    attachments: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const appealTypes = [
    {
      value: 'complaint',
      label: 'Жалоба',
      icon: ExclamationTriangleIcon,
      description: 'Сообщить о нарушениях или неправомерных действиях',
      color: 'red'
    },
    {
      value: 'suggestion',
      label: 'Предложение',
      icon: LightBulbIcon,
      description: 'Предложить улучшения в образовательном процессе',
      color: 'yellow'
    },
    {
      value: 'question',
      label: 'Вопрос',
      icon: QuestionMarkCircleIcon,
      description: 'Получить разъяснения по учебным или административным вопросам',
      color: 'blue'
    },
    {
      value: 'request',
      label: 'Заявление',
      icon: ChatBubbleLeftEllipsisIcon,
      description: 'Подать официальное заявление или ходатайство',
      color: 'green'
    }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Низкая', description: 'Ответ в течение 10-14 дней' },
    { value: 'medium', label: 'Средняя', description: 'Ответ в течение 5-7 дней' },
    { value: 'high', label: 'Высокая', description: 'Ответ в течение 2-3 дней' },
    { value: 'urgent', label: 'Срочная', description: 'Ответ в течение 24 часов' }
  ];

  const faculties = [
    'Лечебный факультет',
    'Стоматологический факультет', 
    'Факультет общественного здравоохранения',
    'Факультет медико-профилактического дела',
    'Факультет сестринского дела'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      attachments: e.target.files[0]
    }));
  };

  const validateForm = () => {
    const required = ['fullName', 'studentId', 'course', 'faculty', 'email', 'appealType', 'subject', 'description'];
    return required.every(field => formData[field].trim() !== '');
  };

  const submitAppealToDjango = async (formData) => {
    try {
      // Создаем FormData для отправки файлов
      const formDataToSend = new FormData();
      
      // Добавляем все поля формы
      Object.keys(formData).forEach(key => {
        if (key === 'attachments' && formData[key]) {
          formDataToSend.append('attachments', formData[key]);
        } else if (key !== 'attachments') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Отправляем на Django backend
      const response = await fetch('http://localhost:8000/api/student-life/api/student-appeals/', {
        method: 'POST',
        body: formDataToSend,
        // Не устанавливаем Content-Type, позволяем браузеру установить правильный
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          ticketNumber: result.ticket_number,
          message: result.message || 'Обращение успешно отправлено!'
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Произошла ошибка при отправке обращения'
        };
      }
    } catch (error) {
      console.error('Error submitting appeal:', error);
      return {
        success: false,
        message: 'Произошла ошибка соединения. Попробуйте позже.'
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Отправляем обращение через Django API
      const result = await submitAppealToDjango(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setShowSuccess(true);
        
        // Сохраняем номер обращения для отображения
        setFormData(prev => ({
          ...prev,
          ticketNumber: result.ticketNumber
        }));
        
        // Очистка формы
        setTimeout(() => {
          setFormData({
            fullName: '',
            studentId: '',
            course: '',
            faculty: '',
            email: '',
            phone: '',
            appealType: '',
            subject: '',
            description: '',
            urgency: 'medium',
            attachments: null
          });
        }, 3000);
      } else {
        setSubmitStatus('error');
        console.error('Submission failed:', result.message);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4">
        <div className="text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Обращение отправлено!</h3>
          <p className="text-gray-600 mb-4">
            Ваше обращение успешно отправлено. 
            {formData.ticketNumber && (
              <>
                <br />
                Номер обращения: <strong>{formData.ticketNumber}</strong>
              </>
            )}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            На указанную вами почту отправлено подтверждение с деталями обращения. 
            Ответ будет направлен в соответствии с выбранным уровнем срочности.
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Форма обращений</h1>
          <p className="text-lg text-gray-600">
            Оставьте ваше обращение, жалобу, предложение или вопрос
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная форма */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
              {/* Личная информация */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Личная информация</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ФИО *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Студенческий билет *
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Факультет *
                    </label>
                    <select
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Выберите факультет</option>
                      {faculties.map(faculty => (
                        <option key={faculty} value={faculty}>{faculty}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Курс *
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Выберите курс</option>
                      {[1, 2, 3, 4, 5, 6].map(course => (
                        <option key={course} value={course}>{course} курс</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Тип обращения */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Тип обращения *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {appealTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <label key={type.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="appealType"
                          value={type.value}
                          checked={formData.appealType === type.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`border-2 rounded-lg p-4 transition-all ${
                          formData.appealType === type.value
                            ? `border-${type.color}-500 bg-${type.color}-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <IconComponent className={`w-6 h-6 ${
                              formData.appealType === type.value ? `text-${type.color}-600` : 'text-gray-400'
                            }`} />
                            <div>
                              <div className="font-medium text-gray-900">{type.label}</div>
                              <div className="text-sm text-gray-500">{type.description}</div>
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Детали обращения */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Детали обращения</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Тема обращения *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Кратко опишите суть обращения"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Подробно опишите ситуацию, укажите даты, имена, обстоятельства..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Срочность
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {urgencyLevels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label} - {level.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Приложения
                    </label>
                    <input
                      type="file"
                      name="attachments"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Поддерживаемые форматы: PDF, DOC, DOCX, JPG, PNG. Максимальный размер: 10 МБ
                    </p>
                  </div>
                </div>
              </div>

              {/* Статус отправки */}
              {submitStatus && (
                <div className={`p-4 rounded-md ${
                  submitStatus === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                  'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitStatus === 'success' && 'Обращение успешно отправлено! На вашу почту направлено уведомление.'}
                  {submitStatus === 'error' && 'Ошибка отправки. Проверьте заполнение всех обязательных полей и попробуйте снова.'}
                </div>
              )}

              {/* Кнопка отправки */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Отправка...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                    Отправить обращение
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Боковая панель с информацией */}
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Как работает система?</h3>
              <div className="space-y-3 text-blue-800 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                  <p>Заполните и отправьте форму обращения</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                  <p>Получите номер обращения и подтверждение на email</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                  <p>Ответственный сотрудник рассмотрит ваше обращение</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                  <p>Получите ответ на указанную почту в установленные сроки</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Контактная информация</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-medium">Отдел по работе со студентами</p>
                  <p>Главный корпус, 1 этаж, каб. 108</p>
                  <p>Тел: +996 312 123-459</p>
                  <p>Email: students@su.edu.kg</p>
                </div>
                <div>
                  <p className="font-medium">Часы работы:</p>
                  <p>Пн-Пт: 9:00-17:00</p>
                  <p>Обед: 12:00-13:00</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Важно знать</h3>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Анонимные обращения не рассматриваются</li>
                <li>• Укажите достоверную контактную информацию</li>
                <li>• Срок рассмотрения зависит от сложности вопроса</li>
                <li>• Все обращения конфиденциальны</li>
              </ul>
            </div>
          </div>
        </div>

        {showSuccess && <SuccessModal />}
      </div>
    </div>
  );
};

export default AppealForm;