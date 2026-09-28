import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockProperties, createMockPropertyResponse } from '../utils/mockData';

// Check if backend is available
const isBackendAvailable = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/property');
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Mock base query for when backend is not available
const mockBaseQuery = async (args) => {
  await new Promise(resolve => setTimeout(resolve, 400)); // Simulate network delay

  if (args.url === '/' || args.url.startsWith('/?')) {
    const params = new URLSearchParams(args.url.split('?')[1] || '');
    const page = parseInt(params.get('page')) || 1;
    const limit = parseInt(params.get('limit')) || 12;
    const location = params.get('location') || '';
    const type = params.get('type') || '';
    const minPrice = params.get('minPrice') || '';
    const maxPrice = params.get('maxPrice') || '';
    const bedrooms = params.get('bedrooms') || '';
    const bathrooms = params.get('bathrooms') || '';
    const listingType = params.get('listingType') || '';
    const sortBy = params.get('sortBy') || 'createdAt';
    const sortOrder = params.get('sortOrder') || 'desc';

    let filteredProperties = [...mockProperties];

    // Apply filters
    if (location) {
      filteredProperties = filteredProperties.filter(p => {
        const loc = typeof p.location === 'string' ? p.location : `${p.location?.city} ${p.location?.zone} ${p.location?.address}`;
        return loc.toLowerCase().includes(location.toLowerCase()) ||
          p.title.toLowerCase().includes(location.toLowerCase());
      });
    }

    if (type) {
      filteredProperties = filteredProperties.filter(p => {
        const typeName = p.type?.name || p.type || '';
        return typeName.toLowerCase() === type.toLowerCase();
      });
    }

    if (listingType) {
      filteredProperties = filteredProperties.filter(p => p.listingType === listingType);
    }

    if (minPrice) {
      filteredProperties = filteredProperties.filter(p => p.price >= parseInt(minPrice));
    }

    if (maxPrice) {
      filteredProperties = filteredProperties.filter(p => p.price <= parseInt(maxPrice));
    }

    if (bedrooms) {
      filteredProperties = filteredProperties.filter(p => (p.bedrooms || 0) >= parseInt(bedrooms));
    }

    if (bathrooms) {
      filteredProperties = filteredProperties.filter(p => (p.bathrooms || 0) >= parseInt(bathrooms));
    }

    // Sorting
    filteredProperties.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (sortBy === 'createdAt') { aVal = new Date(aVal); bVal = new Date(bVal); }
      if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

    return { data: createMockPropertyResponse(filteredProperties, page, limit) };
  }

  // Featured
  if (args.url === '/featured') {
    const featured = mockProperties.filter(p => p.featured && p.status === 'available').slice(0, 6);
    return { data: { properties: featured } };
  }

  // Stats
  if (args.url === '/stats') {
    return { data: { total: mockProperties.length, available: mockProperties.filter(p => p.status === 'available').length, sold: 0, rented: 0, avgPrice: Math.round(mockProperties.reduce((a, p) => a + p.price, 0) / mockProperties.length) } };
  }

  if (args.url.startsWith('/')) {
    const id = args.url.split('/')[1].split('?')[0];
    const property = mockProperties.find(p => p._id === id);
    if (property) return { data: { ...property, views: (property.views || 0) + 1 } };
    return { error: { status: 404, data: { message: 'Property not found' } } };
  }

  return { error: { status: 404, data: { message: 'Endpoint not found' } } };
};

export const propertyApi = createApi({
  reducerPath: 'propertyApi',
  baseQuery: async (args, api, extraOptions) => {
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      return fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/property',
        prepareHeaders: (headers, { getState }) => {
          const token = getState().auth?.user?.token;
          if (token) {
            headers.set('authorization', `Bearer ${token}`);
          }
          return headers;
        },
      })(args, api, extraOptions);
    } else {
      return mockBaseQuery(args);
    }
  },
  tagTypes: ['Property'],
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.minPrice) queryParams.append('minPrice', params.minPrice);
        if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
        if (params.location) queryParams.append('location', params.location);
        if (params.type) queryParams.append('type', params.type);
        if (params.bedrooms) queryParams.append('bedrooms', params.bedrooms);
        if (params.bathrooms) queryParams.append('bathrooms', params.bathrooms);
        if (params.listingType) queryParams.append('listingType', params.listingType);
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
        if (params.userId) queryParams.append('userId', params.userId);
        if (params.featured) queryParams.append('featured', params.featured);
        return `/?${queryParams.toString()}`;
      },
      providesTags: ['Property'],
    }),
    getFeaturedProperties: builder.query({
      query: () => '/featured',
      providesTags: ['Property'],
    }),
    getPropertyStats: builder.query({
      query: () => '/stats',
    }),
    getPropertyById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Property', id }],
    }),
    createProperty: builder.mutation({
      query: (propertyData) => ({
        url: '/',
        method: 'POST',
        body: propertyData,
      }),
      invalidatesTags: ['Property'],
    }),
    updateProperty: builder.mutation({
      query: ({ id, ...propertyData }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: propertyData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Property', id }],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Property'],
    }),
    toggleFeatured: builder.mutation({
      query: (id) => ({
        url: `/${id}/featured`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Property', id }],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyByIdQuery,
  useGetFeaturedPropertiesQuery,
  useGetPropertyStatsQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useToggleFeaturedMutation,
} = propertyApi;