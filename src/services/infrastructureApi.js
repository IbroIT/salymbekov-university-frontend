import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const infrastructureApi = {
  // Get all hospitals
  getHospitals: (params) => api.get('/infrastructure/hospitals/', { params }),
  
  // Get single hospital with details
  getHospital: (id) => api.get(`/infrastructure/hospitals/${id}/`),
  
  // Get all laboratories
  getLaboratories: (params) => api.get('/infrastructure/laboratories/', { params }),
  
  // Get single laboratory
  getLaboratory: (id) => api.get(`/infrastructure/laboratories/${id}/`),
  
  // Get all academic buildings
  getAcademicBuildings: (params) => api.get('/infrastructure/academic-buildings/', { params }),
  
  // Get single academic building
  getAcademicBuilding: (id) => api.get(`/infrastructure/academic-buildings/${id}/`),
  
  // Get all dormitories
  getDormitories: (params) => api.get('/infrastructure/dormitories/', { params }),
  
  // Get single dormitory
  getDormitory: (id) => api.get(`/infrastructure/dormitories/${id}/`),
  
  // Get infrastructure overview statistics
  getOverview: () => api.get('/infrastructure/overview/'),
  
  // Search across all infrastructure
  search: (query) => api.get('/infrastructure/search/', { params: { q: query } }),
};

export default infrastructureApi;
