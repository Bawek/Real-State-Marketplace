import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Policy from './pages/Policy';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PropertyDetails from './pages/properties/PropertyDetails';
import CreateProperty from './pages/properties/CreateProperty';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserDashboard from './pages/dashboard/UserDashboard';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Navbar Section */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/properties/create" element={<CreateProperty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
