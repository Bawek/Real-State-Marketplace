// Mock data for development when backend is not available
export const mockProperties = [
  {
    _id: '1',
    title: 'Modern 3-Bedroom House in Suburbs',
    description: 'Beautiful modern house with spacious living areas, perfect for families. Located in a quiet neighborhood with excellent schools nearby.',
    type: 'house',
    location: 'New York, NY',
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
    ],
    views: 1250,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    _id: '2',
    title: 'Luxury Downtown Apartment',
    description: 'Stunning apartment with city views, modern amenities, and walking distance to restaurants and shopping.',
    type: 'apartment',
    location: 'Los Angeles, CA',
    price: 750000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1512917770080-f771ee6dfe28?w=800',
      'https://images.unsplash.com/photo-1445069942587-0bb0e9368214?w=800'
    ],
    views: 890,
    createdAt: '2024-01-14T14:30:00Z'
  },
  {
    _id: '3',
    title: 'Cozy Starter Home',
    description: 'Perfect first home with great potential for customization. Large backyard and recently renovated kitchen.',
    type: 'house',
    location: 'Chicago, IL',
    price: 285000,
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1571066811602-716837a68180?w=800'
    ],
    views: 650,
    createdAt: '2024-01-13T09:15:00Z'
  },
  {
    _id: '4',
    title: 'Beachfront Condo',
    description: 'Oceanfront property with breathtaking views, private beach access, and luxury amenities.',
    type: 'condo',
    location: 'Miami, FL',
    price: 1200000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800'
    ],
    views: 2100,
    createdAt: '2024-01-12T16:45:00Z'
  },
  {
    _id: '5',
    title: 'Historic Townhouse',
    description: 'Charming historic townhouse with original character, modern updates, and great location.',
    type: 'townhouse',
    location: 'Boston, MA',
    price: 580000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    ],
    views: 980,
    createdAt: '2024-01-11T11:20:00Z'
  },
  {
    _id: '6',
    title: 'Mountain View Villa',
    description: 'Luxury villa with stunning mountain views, infinity pool, and premium finishes throughout.',
    type: 'villa',
    location: 'Denver, CO',
    price: 2500000,
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    views: 3200,
    createdAt: '2024-01-10T13:30:00Z'
  }
];

export const mockUser = {
  _id: 'user123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'user',
  token: 'mock-jwt-token-12345'
};

export const mockAppointments = [
  {
    _id: 'apt1',
    propertyId: {
      _id: '1',
      title: 'Modern 3-Bedroom House in Suburbs'
    },
    agentId: {
      _id: 'agent1',
      name: 'Sarah Johnson'
    },
    date: '2024-02-01T14:00:00Z',
    time: '2:00 PM',
    status: 'confirmed',
    notes: 'Client interested in viewing the property'
  },
  {
    _id: 'apt2',
    propertyId: {
      _id: '2',
      title: 'Luxury Downtown Apartment'
    },
    agentId: {
      _id: 'agent2',
      name: 'Mike Wilson'
    },
    date: '2024-02-03T10:30:00Z',
    time: '10:30 AM',
    status: 'pending',
    notes: 'Schedule for weekend viewing'
  }
];

export const mockMessages = [
  {
    _id: 'msg1',
    sender: {
      _id: 'agent1',
      name: 'Sarah Johnson'
    },
    receiver: 'user123',
    content: 'Hi! I saw you\'re interested in the property. Would you like to schedule a viewing?',
    timestamp: '2024-01-20T10:15:00Z',
    read: false
  },
  {
    _id: 'msg2',
    sender: {
      _id: 'agent2',
      name: 'Mike Wilson'
    },
    receiver: 'user123',
    content: 'The apartment is still available. Let me know if you have any questions.',
    timestamp: '2024-01-19T15:30:00Z',
    read: true
  }
];

// Mock API response structure
export const createMockPropertyResponse = (properties, page = 1, limit = 12) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProperties = properties.slice(startIndex, endIndex);
  
  return {
    properties: paginatedProperties,
    currentPage: page,
    totalPages: Math.ceil(properties.length / limit),
    totalProperties: properties.length,
    hasNextPage: endIndex < properties.length,
    hasPrevPage: page > 1
  };
};
