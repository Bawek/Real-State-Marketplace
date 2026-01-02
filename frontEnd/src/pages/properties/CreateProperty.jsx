import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreatePropertyMutation } from '../../api/propertyApi';
import { addProperty, setLoading, setError } from '../../redux/features/property/propertySlice';
import { addNotification } from '../../redux/features/ui/uiSlice';
import { Container, PageHeader } from '../../components/common/Layout/Layout';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';

const CreateProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createProperty, { isLoading }] = useCreatePropertyMutation();
  const { loading, error } = useSelector((state) => state.property);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'house',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    featured: false,
    images: [],
    features: [],
  });

  const [formErrors, setFormErrors] = useState({});

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'villa', label: 'Villa' },
    { value: 'land', label: 'Land' },
  ];

  const commonFeatures = [
    'Parking', 'Swimming Pool', 'Garden', 'Garage', 'Balcony',
    'Air Conditioning', 'Heating', 'Security System', 'Gym', 'Storage',
    'Fireplace', 'Dishwasher', 'Washer/Dryer', 'Internet', 'Pet Friendly'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.location) errors.location = 'Location is required';
    if (!formData.price || formData.price <= 0) errors.price = 'Valid price is required';
    if (!formData.bedrooms || formData.bedrooms < 0) errors.bedrooms = 'Valid bedroom count is required';
    if (!formData.bathrooms || formData.bathrooms < 0) errors.bathrooms = 'Valid bathroom count is required';
    if (!formData.area || formData.area <= 0) errors.area = 'Valid area is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      // Create FormData for file upload
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          formData.images.forEach((image, index) => {
            submitData.append(`images[${index}]`, image);
          });
        } else if (key === 'features') {
          submitData.append('features', JSON.stringify(formData.features));
        } else {
          submitData.append(key, formData[key]);
        }
      });
      
      const result = await createProperty(submitData).unwrap();
      
      // Add to Redux state
      dispatch(addProperty(result));
      
      // Show success notification
      dispatch(addNotification({
        type: 'success',
        title: 'Property Created',
        message: 'Your property has been successfully listed!',
      }));
      
      // Navigate to property details
      navigate(`/property/${result._id}`);
      
    } catch (err) {
      dispatch(setError(err.data?.message || 'Failed to create property'));
      dispatch(addNotification({
        type: 'error',
        title: 'Creation Failed',
        message: err.data?.message || 'Failed to create property',
      }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Create New Property"
        subtitle="List your property on our marketplace"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Properties', href: '/properties' },
          { label: 'Create Property' }
        ]}
      />
      
      <Container>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Property Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={formErrors.title}
                  placeholder="e.g., Modern 3-Bedroom House"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  error={formErrors.location}
                  placeholder="e.g., New York, NY"
                  required
                />

                <Input
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  error={formErrors.price}
                  placeholder="e.g., 250000"
                  required
                  icon="$"
                />

                <Input
                  label="Bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  error={formErrors.bedrooms}
                  placeholder="e.g., 3"
                  required
                  min="0"
                />

                <Input
                  label="Bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  error={formErrors.bathrooms}
                  placeholder="e.g., 2"
                  required
                  min="0"
                />

                <Input
                  label="Area (sq ft)"
                  name="area"
                  type="number"
                  value={formData.area}
                  onChange={handleChange}
                  error={formErrors.area}
                  placeholder="e.g., 1500"
                  required
                  min="0"
                />

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Featured Property
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Describe your property..."
                  required
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                )}
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Features & Amenities</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {commonFeatures.map(feature => (
                  <label key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Images Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Property Images</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/properties')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading || isLoading}
                className="px-8"
              >
                Create Property
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default CreateProperty;
