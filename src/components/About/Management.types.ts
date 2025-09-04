// Management.types.ts
// TypeScript типы для Management компонента

export interface PersonData {
  name: string;
  position: string;
  department: string;
  email?: string;
  phone?: string;
  experience?: string;
  education?: string;
  bio?: string;
  avatar?: string;
  type: 'administration' | 'faculty' | 'department' | 'staff';
  achievements?: string[];
  specialization?: string;
  studentCount?: number;
  teacherCount?: number;
}

export interface StaffMember {
  name: string;
  position: string;
  experience?: string;
  education?: string;
  email?: string;
  phone?: string;
  specialization?: string;
}

export interface OrganizationNode {
  id: string;
  name: string;
  type: 'administration' | 'faculty' | 'department';
  head: string;
  position: string;
  email?: string;
  phone?: string;
  experience?: string;
  education?: string;
  bio?: string;
  avatar?: string;
  achievements?: string[];
  studentCount?: number;
  teacherCount?: number;
  children?: OrganizationNode[];
  staff?: StaffMember[];
}

export interface DepartmentFilter {
  value: string;
  label: string;
  icon: string;
}

export interface ManagementProps {
  data?: OrganizationNode;
  searchTerm?: string;
  selectedDepartment?: string;
  expandedNodes?: Set<string>;
  viewMode?: 'tree' | 'list';
  loading?: boolean;
  error?: string | null;
  darkMode?: boolean;
  mobileMode?: boolean;
  showExportButton?: boolean;
  showSearchStats?: boolean;
  enableAnimations?: boolean;
  compactMode?: boolean;
  showHierarchyLevel?: boolean;
  enableSwipeGestures?: boolean;
  compactCards?: boolean;
  favorites?: string[];
  viewPreferences?: ViewPreferences;
  theme?: CustomTheme;
  translations?: CustomTranslations;
  onSearch?: (query: string) => void;
  onDepartmentFilter?: (department: string) => void;
  onNodeToggle?: (nodeId: string) => void;
  onFavoriteToggle?: (personId: string) => void;
  onProfileView?: (personId: string) => void;
  onExport?: () => void;
}

export interface ViewPreferences {
  showPhotos: boolean;
  showContacts: boolean;
  showExperience: boolean;
  compactView: boolean;
}

export interface CustomTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor?: string;
  borderColor?: string;
  shadowColor?: string;
}

export interface CustomTranslations {
  title?: string;
  searchPlaceholder?: string;
  exportButton?: string;
  treeView?: string;
  listView?: string;
  expandAll?: string;
  collapseAll?: string;
  detailedInfo?: string;
  aboutSpecialist?: string;
  basicInfo?: string;
  contactInfo?: string;
  educationLabel?: string;
  experienceLabel?: string;
  specializationLabel?: string;
  achievementsLabel?: string;
  statistics?: string;
  studentsCount?: string;
  teachersCount?: string;
  departmentStaff?: string;
  foundStaff?: string;
  noStaffFound?: string;
  tryDifferentCriteria?: string;
  legend?: string;
  administration?: string;
  faculties?: string;
  departments?: string;
  staff?: string;
}

export interface SearchResult {
  person: PersonData;
  relevance: number;
  matchType: 'name' | 'position' | 'department' | 'bio';
}

export interface ExportOptions {
  format: 'pdf' | 'excel' | 'json' | 'csv';
  includePhotos: boolean;
  includeContacts: boolean;
  includeHierarchy: boolean;
  includeStaff: boolean;
}

export interface AnalyticsData {
  searchQueries: SearchQuery[];
  viewedProfiles: ProfileView[];
  exportCount: number;
  sessionTime: number;
  popularDepartments: string[];
  userAgent: string;
}

export interface SearchQuery {
  query: string;
  timestamp: number;
  resultsCount: number;
}

export interface ProfileView {
  personId: string;
  timestamp: number;
  duration: number;
}

// Redux state types
export interface ManagementState {
  organizationData: OrganizationNode | null;
  searchTerm: string;
  selectedDepartment: string;
  expandedNodes: Set<string>;
  viewMode: 'tree' | 'list';
  loading: boolean;
  error: string | null;
  favorites: string[];
  searchHistory: string[];
  analytics: AnalyticsData;
}

// Action types
export type ManagementAction = 
  | { type: 'SET_ORGANIZATION_DATA'; payload: OrganizationNode }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_DEPARTMENT_FILTER'; payload: string }
  | { type: 'TOGGLE_NODE'; payload: string }
  | { type: 'SET_VIEW_MODE'; payload: 'tree' | 'list' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'ADD_SEARCH_HISTORY'; payload: string }
  | { type: 'UPDATE_ANALYTICS'; payload: Partial<AnalyticsData> };

// Hook types
export interface UseManagementReturn {
  state: ManagementState;
  actions: {
    search: (query: string) => void;
    filterByDepartment: (dept: string) => void;
    toggleNode: (nodeId: string) => void;
    setViewMode: (mode: 'tree' | 'list') => void;
    toggleFavorite: (personId: string) => void;
    exportData: (options: ExportOptions) => void;
    loadData: () => Promise<void>;
  };
}

// Utility types
export type NodeType = 'administration' | 'faculty' | 'department';
export type ViewMode = 'tree' | 'list';
export type ExportFormat = 'pdf' | 'excel' | 'json' | 'csv';

// Component ref types
export interface ManagementRef {
  search: (query: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  exportToPDF: () => void;
  getSelectedData: () => OrganizationNode | null;
  scrollToNode: (nodeId: string) => void;
}

// Event handler types
export type SearchHandler = (query: string) => void;
export type NodeToggleHandler = (nodeId: string) => void;
export type PersonSelectHandler = (person: PersonData) => void;
export type ExportHandler = (format: ExportFormat) => void;
export type FilterChangeHandler = (filterValue: string) => void;

// API response types
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface OrganizationAPIResponse extends APIResponse<OrganizationNode> {
  metadata: {
    totalStaff: number;
    totalDepartments: number;
    lastUpdated: string;
    version: string;
  };
}

// Error types
export interface ManagementError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Configuration types
export interface ManagementConfig {
  apiEndpoint: string;
  enableAnalytics: boolean;
  autoSavePreferences: boolean;
  defaultViewMode: ViewMode;
  animationDuration: number;
  searchDebounceMs: number;
  maxSearchHistory: number;
  enableOfflineMode: boolean;
}

export default ManagementProps;
