// Infrastructure API Service
import { apiRequest, buildApiUrl } from '../config/api';

// Infrastructure API endpoints
const INFRASTRUCTURE_ENDPOINTS = {
  CLASSROOMS: {
    FRONTEND: '/api/infrastructure/classrooms/frontend/',
    LIST: '/api/infrastructure/classrooms/',
    CATEGORIES: '/api/infrastructure/classrooms/categories/',
    DETAIL: (id) => `/api/infrastructure/classrooms/${id}/`,
  },
  STARTUPS: {
    FRONTEND: '/api/infrastructure/startups/frontend/',
    LIST: '/api/infrastructure/startups/',
    CATEGORIES: '/api/infrastructure/startups/categories/',
    DETAIL: (id) => `/api/infrastructure/startups/${id}/`,
  },
};

// Classrooms API
export const classroomsAPI = {
  // Get all data for frontend (optimized endpoint)
  getAllForFrontend: async (lang = 'ru') => {
    try {
      const response = await apiRequest(
        buildApiUrl(INFRASTRUCTURE_ENDPOINTS.CLASSROOMS.FRONTEND, { lang })
      );
      return response;
    } catch (error) {
      console.error('Error fetching classrooms for frontend:', error);
      throw error;
    }
  },

  // Get all classrooms
  getAll: async (params = {}) => {
    try {
      const response = await apiRequest(
        buildApiUrl(INFRASTRUCTURE_ENDPOINTS.CLASSROOMS.LIST, params)
      );
      return response;
    } catch (error) {
      console.error('Error fetching classrooms:', error);
      throw error;
    }
  },

  // Get classroom categories
  getCategories: async () => {
    try {
      const response = await apiRequest(INFRASTRUCTURE_ENDPOINTS.CLASSROOMS.CATEGORIES);
      return response;
    } catch (error) {
      console.error('Error fetching classroom categories:', error);
      throw error;
    }
  },

  // Get classroom by ID
  getById: async (id, lang = 'ru') => {
    try {
      const response = await apiRequest(
        buildApiUrl(INFRASTRUCTURE_ENDPOINTS.CLASSROOMS.DETAIL(id), { lang })
      );
      return response;
    } catch (error) {
      console.error(`Error fetching classroom ${id}:`, error);
      throw error;
    }
  },
};

// Startups API
export const startupsAPI = {
  // Get all data for frontend (optimized endpoint)
  getAllForFrontend: async (lang = 'ru') => {
    try {
      const response = await apiRequest(
        buildApiUrl(INFRASTRUCTURE_ENDPOINTS.STARTUPS.FRONTEND, { lang })
      );
      return response;
    } catch (error) {
      console.error('Error fetching startups for frontend:', error);
      throw error;
    }
  },

  // Get all startups
  getAll: async (params = {}) => {
    try {
      const response = await apiRequest(
        buildApiUrl(INFRASTRUCTURE_ENDPOINTS.STARTUPS.LIST, params)
      );
      return response;
    } catch (error) {
      console.error('Error fetching startups:', error);
      throw error;
    }
  },

  // Get startup categories
  getCategories: async () => {
    try {
      const response = await apiRequest(INFRASTRUCTURE_ENDPOINTS.STARTUPS.CATEGORIES);
      return response;
    } catch (error) {
      console.error('Error fetching startup categories:', error);
      throw error;
    }
  },

  // Get startup by ID
  getById: async (id, lang = 'ru') => {
    try {
      const response = await apiRequest(
        buildApiUrl(INFRASTRUCTURE_ENDPOINTS.STARTUPS.DETAIL(id), { lang })
      );
      return response;
    } catch (error) {
      console.error(`Error fetching startup ${id}:`, error);
      throw error;
    }
  },
};

// Helper functions
const infrastructureHelpers = {
  // Transform API data to match frontend format
  transformClassroomData: (apiData, currentLanguage = 'ru') => {
    if (!apiData || !apiData.data) return { categories: [], classrooms: [] };

    const { categories = [], classrooms = [] } = apiData.data;

    return {
      categories: categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        count: cat.count
      })),
      classrooms: classrooms.map(room => ({
        id: room.id,
        name: room.name,
        category: room.category_name,
        categoryId: room.category,
        description: room.description,
        capacity: room.capacity,
        floor: room.floor,
        size: room.size,
        image: room.image,
        equipment: room.equipment,
        features: room.features
      }))
    };
  },

  // Transform startup API data to match frontend format
  transformStartupData: (apiData, currentLanguage = 'ru') => {
    if (!apiData || !apiData.data) return { categories: [], startups: [], statistics: {} };

    const { categories = [], startups = [], statistics = {} } = apiData.data;

    return {
      categories: categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        count: cat.count
      })),
      startups: startups.map(startup => ({
        id: startup.id,
        name: startup.name,
        category: startup.category_name,
        categoryId: startup.category,
        stage: startup.stage_display,
        description: startup.description,
        fullDescription: startup.full_description,
        image: startup.image,
        team: startup.team,
        achievements: startup.achievements,
        funding: startup.funding,
        investors: startup.investors,
        status: startup.status_display,
        year: startup.year
      })),
      statistics
    };
  }
};

export { infrastructureHelpers };

export default {
  classroomsAPI,
  startupsAPI,
  infrastructureHelpers,
  INFRASTRUCTURE_ENDPOINTS
};