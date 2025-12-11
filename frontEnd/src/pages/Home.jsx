import React from 'react';
import Blogs from '../components/Blogs';

const Home = () => {
  return (
    <div className="container mx-auto px-4 md:px-8">
      {/* Hero Section */}

      {/* Divider */}

      {/* Blogs Section */}
      <section className="blogs-section">

      <Blogs/>
      </section>

      {/* Additional Blog Section if needed */}
      <section className="more-blogs-section">
    
      </section>
    </div>
  );
};

export default Home;
