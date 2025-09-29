import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 10000,
});

// Leadership API
export const leadershipAPI = {
    // Получить всех руководителей
    getAll: () => api.get('/hsm/leadership/'),

    // Получить конкретного руководителя
    getById: (id) => api.get(`/hsm/leadership/${id}/`),

    // Получить только директоров
    getDirectors: () => api.get('/hsm/leadership/directors/'),

    // Получить заведующих кафедрами
    getDepartmentHeads: () => api.get('/hsm/leadership/department_heads/'),

    // Получить руководство по департаменту
    getByDepartment: (department) => api.get(`/hsm/leadership/by_department/?department=${department}`),
};

export default api;