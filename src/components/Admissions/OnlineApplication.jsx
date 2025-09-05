import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const OnlineApplication = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Program selection
    program: '',
    programDetails: null,
    
    // Step 2: Personal information
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    
    // Step 3: Education
    schoolName: '',
    graduationYear: '',
    certificateNumber: '',
    ortScore: '',
    subjects: {
      biology: '',
      chemistry: '',
      physics: '',
      mathematics: ''
    },
    
    // Step 4: Documents
    documents: {
      certificate: null,
      passport: null,
      medical: null,
      photos: null,
      ortCertificate: null
    },
    
    // Step 5: Confirmation
    agreeTerms: false,
    agreePrivacy: false
  });

  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const programs = [
    {
      id: 'medicine',
      name: 'Лечебное дело',
      duration: '6 лет',
      cost: '170,000 сом/год',
      requirements: 'ОРТ: 120+, Биология, Химия',
      description: 'Подготовка врачей общей практики'
    },
    {
      id: 'dentistry',
      name: 'Стоматология',
      duration: '5 лет',
      cost: '190,000 сом/год',
      requirements: 'ОРТ: 110+, Биология, Химия',
      description: 'Подготовка врачей-стоматологов'
    },
    {
      id: 'pharmacy',
      name: 'Фармация',
      duration: '5 лет',
      cost: '150,000 сом/год',
      requirements: 'ОРТ: 100+, Химия, Биология',
      description: 'Подготовка провизоров и фармацевтов'
    },
    {
      id: 'nursing',
      name: 'Сестринское дело',
      duration: '4 года',
      cost: '130,000 сом/год',
      requirements: 'ОРТ: 90+, Биология',
      description: 'Подготовка медицинских сестер'
    }
  ];

  const steps = [
    { id: 1, title: 'Выбор программы', icon: '📋' },
    { id: 2, title: 'Личные данные', icon: '👤' },
    { id: 3, title: 'Образование', icon: '🎓' },
    { id: 4, title: 'Документы', icon: '📄' },
    { id: 5, title: 'Подтверждение', icon: '✅' }
  ];

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('applicationDraft', JSON.stringify(formData));
      setIsDraftSaved(true);
      setTimeout(() => setIsDraftSaved(false), 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData]);

  // Load draft on component mount
  useEffect(() => {
    const draft = localStorage.getItem('applicationDraft');
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.program) newErrors.program = 'Выберите программу обучения';
        break;
      
      case 2:
        if (!formData.firstName) newErrors.firstName = 'Введите имя';
        else if (formData.firstName.length < 2) newErrors.firstName = 'Имя должно содержать минимум 2 символа';
        
        if (!formData.lastName) newErrors.lastName = 'Введите фамилию';
        else if (formData.lastName.length < 2) newErrors.lastName = 'Фамилия должна содержать минимум 2 символа';
        
        if (!formData.birthDate) newErrors.birthDate = 'Введите дату рождения';
        else {
          const birthYear = new Date(formData.birthDate).getFullYear();
          const currentYear = new Date().getFullYear();
          const age = currentYear - birthYear;
          if (age < 16 || age > 35) newErrors.birthDate = 'Возраст должен быть от 16 до 35 лет';
        }
        
        if (!formData.phone) newErrors.phone = 'Введите номер телефона';
        else if (!/^\+996\s?\d{3}\s?\d{3}\s?\d{3}$/.test(formData.phone)) {
          newErrors.phone = 'Введите телефон в формате +996 XXX XXX XXX';
        }
        
        if (!formData.email) newErrors.email = 'Введите email';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный email';
        break;
      
      case 3:
        if (!formData.schoolName) newErrors.schoolName = 'Введите название школы';
        if (!formData.graduationYear) newErrors.graduationYear = 'Введите год окончания';
        if (!formData.ortScore) newErrors.ortScore = 'Введите балл ОРТ';
        else if (formData.ortScore < 0 || formData.ortScore > 240) {
          newErrors.ortScore = 'Балл ОРТ должен быть от 0 до 240';
        }
        break;
      
      case 4:
        if (!formData.documents.certificate) newErrors.certificate = 'Загрузите аттестат';
        else if (!validateFile(formData.documents.certificate, ['pdf', 'jpg', 'jpeg', 'png'], 5)) {
          newErrors.certificate = 'Файл должен быть PDF, JPG или PNG размером до 5 МБ';
        }
        
        if (!formData.documents.passport) newErrors.passport = 'Загрузите паспорт';
        else if (!validateFile(formData.documents.passport, ['pdf', 'jpg', 'jpeg', 'png'], 5)) {
          newErrors.passport = 'Файл должен быть PDF, JPG или PNG размером до 5 МБ';
        }
        
        if (!formData.documents.medical) newErrors.medical = 'Загрузите медсправку';
        else if (!validateFile(formData.documents.medical, ['pdf', 'jpg', 'jpeg', 'png'], 5)) {
          newErrors.medical = 'Файл должен быть PDF, JPG или PNG размером до 5 МБ';
        }
        break;
      
      case 5:
        if (!formData.agreeTerms) newErrors.agreeTerms = 'Согласитесь с условиями';
        if (!formData.agreePrivacy) newErrors.agreePrivacy = 'Согласитесь с обработкой данных';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFile = (file, allowedTypes, maxSizeMB) => {
    if (!file) return false;
    
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const fileSizeMB = file.size / (1024 * 1024);
    
    return allowedTypes.includes(fileExtension) && fileSizeMB <= maxSizeMB;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFileUpload = (fieldName, file) => {
    updateFormData({
      documents: {
        ...formData.documents,
        [fieldName]: file
      }
    });
  };

  const submitApplication = () => {
    if (validateStep(5)) {
      // Here you would send the application to your backend
      console.log('Application submitted:', formData);
      alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
      localStorage.removeItem('applicationDraft');
    }
  };

  const saveDraft = () => {
    localStorage.setItem('applicationDraft', JSON.stringify(formData));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  const clearDraft = () => {
    localStorage.removeItem('applicationDraft');
    setFormData({
      program: '',
      programDetails: null,
      firstName: '',
      lastName: '',
      middleName: '',
      birthDate: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      schoolName: '',
      graduationYear: '',
      certificateNumber: '',
      ortScore: '',
      subjects: {
        biology: '',
        chemistry: '',
        physics: '',
        mathematics: ''
      },
      documents: {
        certificate: null,
        passport: null,
        medical: null,
        photos: null,
        ortCertificate: null
      },
      agreeTerms: false,
      agreePrivacy: false
    });
    setCurrentStep(1);
    setErrors({});
  };

  const renderStep1 = () => {
    const filteredPrograms = programs.filter(program =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Выберите программу обучения</h3>
          <p className="text-gray-600">Выберите специальность, на которую хотите поступить</p>
        </div>
        
        {/* Search input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Поиск программы
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Введите название программы..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="grid gap-4">
          {filteredPrograms.length > 0 ? filteredPrograms.map(program => (
            <div
              key={program.id}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                formData.program === program.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                updateFormData({ program: program.id, programDetails: program });
                setErrors({ ...errors, program: null });
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-semibold text-gray-800">{program.name}</h4>
                <span className="text-sm text-blue-600 font-medium">{program.duration}</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{program.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>💰 {program.cost}</span>
                <span>📋 {program.requirements}</span>
              </div>
            </div>
          )) : (
            <div className="text-center py-8 text-gray-500">
              <p>Программы не найдены по запросу "{searchTerm}"</p>
            </div>
          )}
        </div>
        
        {errors.program && (
          <div className="text-red-600 text-sm">{errors.program}</div>
        )}
      </div>
    );
  };

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Личные данные</h3>
        <p className="text-gray-600">Заполните информацию о себе</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Фамилия *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.lastName && <div className="text-red-600 text-sm mt-1">{errors.lastName}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Имя *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.firstName && <div className="text-red-600 text-sm mt-1">{errors.firstName}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Отчество
          </label>
          <input
            type="text"
            value={formData.middleName}
            onChange={(e) => updateFormData({ middleName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Дата рождения *
          </label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => updateFormData({ birthDate: e.target.value })}
            max={new Date(new Date().getFullYear() - 16, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
            min={new Date(new Date().getFullYear() - 35, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.birthDate && <div className="text-red-600 text-sm mt-1">{errors.birthDate}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Пол
          </label>
          <select
            value={formData.gender}
            onChange={(e) => updateFormData({ gender: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Телефон *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              let value = e.target.value;
              // Auto-format phone number
              if (!value.startsWith('+996')) {
                value = '+996 ' + value.replace(/^\+996\s?/, '');
              }
              updateFormData({ phone: value });
            }}
            placeholder="+996 XXX XXX XXX"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Адрес
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Образование</h3>
        <p className="text-gray-600">Информация о вашем образовании</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Название школы/лицея *
          </label>
          <input
            type="text"
            value={formData.schoolName}
            onChange={(e) => updateFormData({ schoolName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.schoolName && <div className="text-red-600 text-sm mt-1">{errors.schoolName}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Год окончания *
          </label>
          <select
            value={formData.graduationYear}
            onChange={(e) => updateFormData({ graduationYear: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Выберите год</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.graduationYear && <div className="text-red-600 text-sm mt-1">{errors.graduationYear}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Номер аттестата
          </label>
          <input
            type="text"
            value={formData.certificateNumber}
            onChange={(e) => updateFormData({ certificateNumber: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Балл ОРТ *
          </label>
          <input
            type="number"
            value={formData.ortScore}
            onChange={(e) => updateFormData({ ortScore: e.target.value })}
            min="0"
            max="240"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.ortScore && <div className="text-red-600 text-sm mt-1">{errors.ortScore}</div>}
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-4">Оценки по предметам (необязательно)</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Биология
            </label>
            <input
              type="number"
              value={formData.subjects.biology}
              onChange={(e) => updateFormData({
                subjects: { ...formData.subjects, biology: e.target.value }
              })}
              min="1"
              max="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Химия
            </label>
            <input
              type="number"
              value={formData.subjects.chemistry}
              onChange={(e) => updateFormData({
                subjects: { ...formData.subjects, chemistry: e.target.value }
              })}
              min="1"
              max="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Физика
            </label>
            <input
              type="number"
              value={formData.subjects.physics}
              onChange={(e) => updateFormData({
                subjects: { ...formData.subjects, physics: e.target.value }
              })}
              min="1"
              max="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Математика
            </label>
            <input
              type="number"
              value={formData.subjects.mathematics}
              onChange={(e) => updateFormData({
                subjects: { ...formData.subjects, mathematics: e.target.value }
              })}
              min="1"
              max="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Загрузка документов</h3>
        <p className="text-gray-600">Прикрепите необходимые документы</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Аттестат о среднем образовании *
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('certificate', e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {formData.documents.certificate && (
            <div className="text-green-600 text-sm mt-1 flex items-center">
              ✓ Файл загружен: {formData.documents.certificate.name}
            </div>
          )}
          {errors.certificate && <div className="text-red-600 text-sm mt-1">{errors.certificate}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Паспорт (все страницы) *
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('passport', e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {formData.documents.passport && (
            <div className="text-green-600 text-sm mt-1 flex items-center">
              ✓ Файл загружен: {formData.documents.passport.name}
            </div>
          )}
          {errors.passport && <div className="text-red-600 text-sm mt-1">{errors.passport}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Медицинская справка 086У *
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('medical', e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {formData.documents.medical && (
            <div className="text-green-600 text-sm mt-1 flex items-center">
              ✓ Файл загружен: {formData.documents.medical.name}
            </div>
          )}
          {errors.medical && <div className="text-red-600 text-sm mt-1">{errors.medical}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Фотографии 3x4 см
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
            onChange={(e) => handleFileUpload('photos', e.target.files)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {formData.documents.photos && formData.documents.photos.length > 0 && (
            <div className="text-green-600 text-sm mt-1 flex items-center">
              ✓ Загружено фото: {formData.documents.photos.length} шт.
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Сертификат ОРТ
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('ortCertificate', e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {formData.documents.ortCertificate && (
            <div className="text-green-600 text-sm mt-1 flex items-center">
              ✓ Файл загружен: {formData.documents.ortCertificate.name}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">📋 Требования к документам</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Документы должны быть в формате PDF, JPG или PNG</li>
          <li>• Максимальный размер файла - 5 МБ</li>
          <li>• Документы должны быть четкими и читаемыми</li>
          <li>• Все страницы паспорта должны быть в одном файле</li>
          <li>• Фотографии должны быть размером 3x4 см</li>
        </ul>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Подтверждение заявки</h3>
        <p className="text-gray-600">Проверьте данные перед отправкой</p>
      </div>
      
      <div className="space-y-6">
        {/* Program Details */}
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-3">📋</span>
            <h4 className="font-semibold text-gray-800 text-lg">Выбранная программа</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-800">{formData.programDetails?.name}</p>
              <p className="text-gray-600 text-sm">{formData.programDetails?.description}</p>
            </div>
            <div className="text-sm text-gray-600">
              <p>Срок обучения: {formData.programDetails?.duration}</p>
              <p>Стоимость: {formData.programDetails?.cost}</p>
              <p>Требования: {formData.programDetails?.requirements}</p>
            </div>
          </div>
        </div>
        
        {/* Personal Information */}
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-3">👤</span>
            <h4 className="font-semibold text-gray-800 text-lg">Личные данные</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-800">
                {formData.lastName} {formData.firstName} {formData.middleName}
              </p>
              <p className="text-gray-600 text-sm">Дата рождения: {formData.birthDate}</p>
              {formData.gender && <p className="text-gray-600 text-sm">Пол: {formData.gender === 'male' ? 'Мужской' : 'Женский'}</p>}
            </div>
            <div className="text-sm text-gray-600">
              <p>📞 {formData.phone}</p>
              <p>✉️ {formData.email}</p>
              {formData.address && <p>🏠 {formData.address}</p>}
            </div>
          </div>
        </div>
        
        {/* Education */}
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-3">🎓</span>
            <h4 className="font-semibold text-gray-800 text-lg">Образование</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-800">{formData.schoolName}</p>
              <p className="text-gray-600 text-sm">Год окончания: {formData.graduationYear}</p>
              {formData.certificateNumber && <p className="text-gray-600 text-sm">Аттестат №: {formData.certificateNumber}</p>}
            </div>
            <div className="text-sm text-gray-600">
              <p>ОРТ: {formData.ortScore} баллов</p>
              {Object.entries(formData.subjects).some(([, value]) => value) && (
                <div className="mt-2">
                  <p className="font-medium">Оценки по предметам:</p>
                  {Object.entries(formData.subjects).map(([subject, grade]) => 
                    grade && (
                      <span key={subject} className="inline-block mr-3">
                        {subject === 'biology' && 'Биология'} 
                        {subject === 'chemistry' && 'Химия'} 
                        {subject === 'physics' && 'Физика'} 
                        {subject === 'mathematics' && 'Математика'}: {grade}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Documents */}
        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-3">📄</span>
            <h4 className="font-semibold text-gray-800 text-lg">Загруженные документы</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="flex items-center">
                {formData.documents.certificate ? '✅' : '❌'} 
                <span className="ml-2">Аттестат</span>
              </p>
              <p className="flex items-center">
                {formData.documents.passport ? '✅' : '❌'} 
                <span className="ml-2">Паспорт</span>
              </p>
              <p className="flex items-center">
                {formData.documents.medical ? '✅' : '❌'} 
                <span className="ml-2">Медицинская справка</span>
              </p>
            </div>
            <div>
              <p className="flex items-center">
                {formData.documents.photos?.length > 0 ? '✅' : '⚪'} 
                <span className="ml-2">Фотографии (необязательно)</span>
              </p>
              <p className="flex items-center">
                {formData.documents.ortCertificate ? '✅' : '⚪'} 
                <span className="ml-2">Сертификат ОРТ (необязательно)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit buttons */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">Нужно что-то изменить?</h4>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setCurrentStep(1)}
            className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
          >
            ✏️ Программа
          </button>
          <button 
            onClick={() => setCurrentStep(2)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
          >
            ✏️ Личные данные
          </button>
          <button 
            onClick={() => setCurrentStep(3)}
            className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200"
          >
            ✏️ Образование
          </button>
          <button 
            onClick={() => setCurrentStep(4)}
            className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200"
          >
            ✏️ Документы
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => updateFormData({ agreeTerms: e.target.checked })}
            className="mt-1 mr-3"
          />
          <span className="text-sm text-gray-700">
            Я согласен(а) с{' '}
            <a href="#" className="text-blue-600 underline">правилами поступления</a>
            {' '}и{' '}
            <a href="#" className="text-blue-600 underline">условиями обучения</a>
          </span>
        </label>
        {errors.agreeTerms && <div className="text-red-600 text-sm">{errors.agreeTerms}</div>}
        
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.agreePrivacy}
            onChange={(e) => updateFormData({ agreePrivacy: e.target.checked })}
            className="mt-1 mr-3"
          />
          <span className="text-sm text-gray-700">
            Я даю согласие на{' '}
            <a href="#" className="text-blue-600 underline">обработку персональных данных</a>
          </span>
        </label>
        {errors.agreePrivacy && <div className="text-red-600 text-sm">{errors.agreePrivacy}</div>}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Онлайн заявка
            </h1>
            <p className="text-xl opacity-90">
              Подайте заявку на поступление в Салымбеков Университет
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full text-sm font-medium transition-all ${
                  currentStep >= step.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : currentStep === step.id - 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? '✓' : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-2 mx-4 rounded-full transition-all ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Шаг {currentStep} из {steps.length}: {steps[currentStep - 1].title}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Прогресс: {Math.round((currentStep / steps.length) * 100)}%
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700 shadow-md'
              }`}
            >
              ← Назад
            </button>
            
            <button
              onClick={saveDraft}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 text-sm shadow-md"
            >
              💾 Сохранить черновик
            </button>
            
            <button
              onClick={clearDraft}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 text-sm shadow-md"
            >
              🗑️ Очистить форму
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {isDraftSaved && (
              <span className="text-sm text-green-600 font-medium animate-pulse">
                ✓ Черновик сохранен
              </span>
            )}
            
            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-md transition-all"
              >
                Далее →
              </button>
            ) : (
              <button
                onClick={submitApplication}
                className="px-10 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg transition-all"
              >
                📤 Отправить заявку
              </button>
            )}
          </div>
        </div>

        {/* Help Information */}
        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-3">
            🆘 Нужна помощь при заполнении?
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <p>📞 Телефон: +996 312 123 456</p>
              <p>✉️ Email: admission@salymbekov.edu.kg</p>
            </div>
            <div>
              <p>🕐 Часы работы: Пн-Пт 09:00-18:00</p>
              <p>💾 Ваши данные автоматически сохраняются</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineApplication;
