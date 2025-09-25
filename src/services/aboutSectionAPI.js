import axios from "axios";

const API_BASE_URL = "https://su-med-backend-35d3d951c74b.herokuapp.com/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to add language parameter and headers
api.interceptors.request.use(
  (config) => {
    // Get current language from localStorage or i18next instance
    let currentLanguage = "ru";

    // Try to get from i18next first
    if (typeof window !== "undefined" && window.i18n) {
      currentLanguage = window.i18n.language || "ru";
    } else if (typeof localStorage !== "undefined") {
      currentLanguage =
        localStorage.getItem("i18nextLng") ||
        localStorage.getItem("language") ||
        "ru";
    }

    // Map language codes
    const languageMapping = {
      kg: "ky", // Map Kyrgyz from frontend to backend format
      en: "en",
      ru: "ru",
    };

    const backendLanguage = languageMapping[currentLanguage] || "ru";

    // Add lang parameter to all requests
    config.params = {
      ...config.params,
      lang: backendLanguage,
    };

    // Add Accept-Language header
    config.headers["Accept-Language"] = backendLanguage;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Internal server error");
          break;
        default:
          console.error("API Error:", data?.error || error.message);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network error - no response received");
    } else {
      // Something else happened
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Accreditations API
 */
export const accreditationsAPI = {
  /**
   * Get all accreditations for frontend Status component
   * @param {string} type - Filter by accreditation type ('all', 'government', 'international', etc.)
   * @returns {Promise<Array>} Array of accreditation objects
   */
  getAccreditations: async (type = "all") => {
    try {
      const response = await api.get(
        "/about-section/accreditations/frontend/",
        {
          params: { type },
        }
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.error || "Failed to fetch accreditations"
        );
      }
    } catch (error) {
      console.error("Error fetching accreditations:", error);
      throw error;
    }
  },

  /**
   * Get detailed information about specific accreditation
   * @param {number} id - Accreditation ID
   * @returns {Promise<Object>} Accreditation object
   */
  getAccreditationDetail: async (id) => {
    try {
      const response = await api.get(`/about-section/accreditations/${id}/`);

      if (response.data) {
        return response.data;
      } else {
        throw new Error("Failed to fetch accreditation details");
      }
    } catch (error) {
      console.error("Error fetching accreditation details:", error);
      throw error;
    }
  },

  /**
   * Get accreditation types for filtering
   * @returns {Promise<Array>} Array of accreditation types
   */
  getAccreditationTypes: async () => {
    try {
      const response = await api.get("/about-section/accreditations/");

      if (response.data && response.data.results) {
        // Extract unique types
        const types = [
          ...new Set(
            response.data.results.map((acc) => acc.accreditation_type)
          ),
        ];
        return types;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching accreditation types:", error);
      return [];
    }
  },
};

/**
 * Councils API
 */
export const councilsAPI = {
  /**
   * Get all councils data for frontend Advices component
   * @returns {Promise<Object>} Object with sections_data and sections_list
   */
  getCouncils: async () => {
    try {
      const response = await api.get("/about-section/councils/frontend/");

      if (response.data.success) {
        return {
          sectionsData: response.data.sections_data,
          sectionsList: response.data.sections_list,
          count: response.data.count,
        };
      } else {
        throw new Error(response.data.error || "Failed to fetch councils");
      }
    } catch (error) {
      console.error("Error fetching councils:", error);
      throw error;
    }
  },

  /**
   * Get detailed information about specific council
   * @param {string} slug - Council type slug
   * @returns {Promise<Object>} Council data object
   */
  getCouncilDetail: async (slug) => {
    try {
      const response = await api.get(
        `/about-section/councils/frontend/${slug}/`
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.error || "Failed to fetch council details"
        );
      }
    } catch (error) {
      console.error("Error fetching council details:", error);
      throw error;
    }
  },

  /**
   * Get council types list for navigation
   * @returns {Promise<Array>} Array of council types
   */
  getCouncilTypes: async () => {
    try {
      const response = await api.get("/about-section/councils/");

      if (response.data && response.data.results) {
        return response.data.results;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching council types:", error);
      return [];
    }
  },
};

/**
 * About Section API (for other components if needed)
 */
export const aboutSectionAPI = {
  /**
   * Get about section with partners
   * @returns {Promise<Object>} About section with partners data
   */
  getAboutWithPartners: async () => {
    try {
      const response = await api.get("/about-section/about-with-partners/");

      if (response.data.success) {
        return {
          aboutSection: response.data.about_section,
          partners: response.data.partners,
          partnersCount: response.data.partners_count,
        };
      } else {
        throw new Error(response.data.error || "Failed to fetch about section");
      }
    } catch (error) {
      console.error("Error fetching about section with partners:", error);
      throw error;
    }
  },

  /**
   * Get about sections list
   * @returns {Promise<Array>} Array of about sections
   */
  getAboutSections: async () => {
    try {
      const response = await api.get("/about-section/about-sections/");

      if (response.data && response.data.results) {
        return response.data.results;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching about sections:", error);
      return [];
    }
  },
};

/**
 * Utility functions
 */
export const aboutUtils = {
  /**
   * Format date for display
   * @param {string} dateString - Date string from API
   * @returns {string} Formatted date
   */
  formatDate: (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return dateString;
    }
  },

  /**
   * Get file extension from filename
   * @param {string} filename - Filename
   * @returns {string} File extension
   */
  getFileExtension: (filename) => {
    if (!filename) return "";
    return filename.split(".").pop().toUpperCase();
  },

  /**
   * Handle download of documents
   * @param {string} fileUrl - File URL
   * @param {string} filename - Filename for download
   */
  downloadFile: (fileUrl, filename) => {
    try {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = filename || "document";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      // Fallback: open in new tab
      window.open(fileUrl, "_blank");
    }
  },
};

// Export default api instance for custom requests
export default api;
