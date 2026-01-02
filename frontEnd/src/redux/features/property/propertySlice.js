import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  currentProperty: null,
  featuredProperties: [],
  loading: false,
  error: null,
  filters: {
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    page: 1,
    limit: 12,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalProperties: 0,
  },
  searchResults: [],
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setProperties: (state, action) => {
      state.properties = action.payload.properties;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    setCurrentProperty: (state, action) => {
      state.currentProperty = action.payload;
    },
    setFeaturedProperties: (state, action) => {
      state.featuredProperties = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        location: '',
        type: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: '',
        page: 1,
        limit: 12,
      };
    },
    addProperty: (state, action) => {
      state.properties.unshift(action.payload);
      state.pagination.totalProperties += 1;
    },
    updateProperty: (state, action) => {
      const index = state.properties.findIndex(property => property._id === action.payload._id);
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
      if (state.currentProperty?._id === action.payload._id) {
        state.currentProperty = action.payload;
      }
    },
    removeProperty: (state, action) => {
      state.properties = state.properties.filter(property => property._id !== action.payload);
      state.pagination.totalProperties -= 1;
      if (state.currentProperty?._id === action.payload) {
        state.currentProperty = null;
      }
    },
    clearProperties: (state) => {
      state.properties = [];
      state.currentProperty = null;
      state.searchResults = [];
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalProperties: 0,
      };
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setProperties,
  setCurrentProperty,
  setFeaturedProperties,
  setSearchResults,
  setFilters,
  clearFilters,
  addProperty,
  updateProperty,
  removeProperty,
  clearProperties,
} = propertySlice.actions;

export default propertySlice.reducer;
