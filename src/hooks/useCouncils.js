import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { councilsAPI } from "../services/aboutSectionAPI";

/**
 * Custom hook for managing councils data
 */
export const useCouncils = () => {
  const { i18n } = useTranslation();
  const [sectionsData, setSectionsData] = useState({});
  const [sectionsList, setSectionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("");

  // Fetch councils data
  const fetchCouncils = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await councilsAPI.getCouncils();
      setSectionsData(data.sectionsData);
      setSectionsList(data.sectionsList);

      // Set first section as active if none selected
      if (!activeSection && data.sectionsList.length > 0) {
        setActiveSection(data.sectionsList[0].id);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch councils");
      console.error("Error in useCouncils:", err);
    } finally {
      setLoading(false);
    }
  }, [activeSection]);

  // Initial data fetch and refetch when language changes
  useEffect(() => {
    fetchCouncils();
  }, [fetchCouncils, i18n.language]);

  // Get current section data
  const getCurrentSectionData = () => {
    return sectionsData[activeSection] || null;
  };

  // Check if section has members
  const sectionHasMembers = (sectionId = activeSection) => {
    const section = sectionsData[sectionId];
    return section && section.members && section.members.length > 0;
  };

  // Check if section has documents
  const sectionHasDocuments = (sectionId = activeSection) => {
    const section = sectionsData[sectionId];
    return section && section.documents && section.documents.length > 0;
  };

  // Get section by ID
  const getSectionById = (sectionId) => {
    return sectionsData[sectionId] || null;
  };

  // Search sections by name
  const searchSections = (query) => {
    if (!query) return sectionsList;

    const lowercaseQuery = query.toLowerCase();
    return sectionsList.filter((section) =>
      section.name.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Methods to control the hook
  const changeActiveSection = (sectionId) => {
    if (sectionsData[sectionId]) {
      setActiveSection(sectionId);
    }
  };

  const refresh = () => {
    fetchCouncils();
  };

  return {
    // Data
    sectionsData,
    sectionsList,
    activeSection,

    // Status
    loading,
    error,

    // Methods
    changeActiveSection,
    refresh,
    getCurrentSectionData,
    sectionHasMembers,
    sectionHasDocuments,
    getSectionById,
    searchSections,
  };
};

/**
 * Custom hook for managing single council detail
 */
export const useCouncilDetail = (slug) => {
  const [councilData, setCouncilData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCouncilDetail = useCallback(async (councilSlug) => {
    if (!councilSlug) return;

    try {
      setLoading(true);
      setError(null);

      const data = await councilsAPI.getCouncilDetail(councilSlug);
      setCouncilData(data);
    } catch (err) {
      setError(err.message || "Failed to fetch council details");
      console.error("Error in useCouncilDetail:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCouncilDetail(slug);
  }, [slug, fetchCouncilDetail]);

  const refresh = () => {
    fetchCouncilDetail(slug);
  };

  // Check if council has members
  const hasMembers = () => {
    return councilData && councilData.members && councilData.members.length > 0;
  };

  // Check if council has documents
  const hasDocuments = () => {
    return (
      councilData && councilData.documents && councilData.documents.length > 0
    );
  };

  // Get members count
  const getMembersCount = () => {
    return councilData?.members?.length || 0;
  };

  // Get documents count
  const getDocumentsCount = () => {
    return councilData?.documents?.length || 0;
  };

  return {
    // Data
    councilData,

    // Status
    loading,
    error,

    // Methods
    refresh,
    hasMembers,
    hasDocuments,
    getMembersCount,
    getDocumentsCount,
  };
};
