// Конфигурация Email адресов университета
// 🔧 ЗДЕСЬ МОЖНО ИЗМЕНИТЬ GMAIL АДРЕСА:
export const emailConfig = {
  // Gmail адреса университета - ИЗМЕНИТЕ НА НУЖНЫЕ ВАМ:
  admissions: 'adilhansatymkulov40@gmail.com',      // 📧 Сюда приходят заявки абитуриентов
  info: 'adilhansatymkulov40@gmail.com',            // ❓ Сюда приходят общие вопросы  
  support: 'adilhansatymkulov40@gmail.com',         // 🔧 Сюда приходят техвопросы

  // Основной адрес для заявок (используется в форме поступления)
  mainAdmissions: 'adilhansatymkulov40@gmail.com'
};

// Функция для открытия Gmail напрямую в браузере
export const openGmailCompose = (to, subject, body) => {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Открываем Gmail в новом окне
  window.open(gmailUrl, '_blank', 'width=800,height=600');
};

// Функция для создания mailto ссылки (резервный вариант)
export const createMailtoLink = (to, subject, body) => {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
