export const selectProperties = (state) => state.property.properties;
export const selectCurrentProperty = (state) => state.property.currentProperty;
export const selectFeaturedProperties = (state) => state.property.featuredProperties;
export const selectPropertyLoading = (state) => state.property.loading;
export const selectPropertyError = (state) => state.property.error;
export const selectPropertyFilters = (state) => state.property.filters;
export const selectPropertyPagination = (state) => state.property.pagination;
export const selectSearchResults = (state) => state.property.searchResults;
export const selectTotalProperties = (state) => state.property.pagination.totalProperties;
export const selectCurrentPage = (state) => state.property.pagination.currentPage;
export const selectTotalPages = (state) => state.property.pagination.totalPages;

export const selectPropertyById = (state, propertyId) =>
  state.property.properties.find(property => property._id === propertyId);

export const selectPropertiesByType = (state, type) =>
  state.property.properties.filter(property => property.type === type);

export const selectPropertiesByLocation = (state, location) =>
  state.property.properties.filter(property => 
    property.location?.toLowerCase().includes(location.toLowerCase())
  );

export const selectPropertiesByPriceRange = (state, minPrice, maxPrice) =>
  state.property.properties.filter(property => {
    const price = property.price || 0;
    return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
  });

export const selectFeaturedPropertiesOnly = (state) =>
  state.property.properties.filter(property => property.featured);

export const selectRecentProperties = (state, days = 7) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  return state.property.properties.filter(property => 
    new Date(property.createdAt) >= cutoffDate
  );
};
