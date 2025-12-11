import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Policy from './pages/Policy';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import SinglePage from './pages/SinglePage';
import Register from './pages/Register';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import { ManageItem } from './pages/Admin/ManageItem';
import User from './pages/Admin/User';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateBlog from './pages/UpdateBlog';

function App() {
  return (
    <div className=" min-h-screen w-full flex flex-col shadow-lg  bg-blue-500 ">
      {/* Navbar Section */}
      {/* Main Content */}
      <main className="flex-grow  min-h-screen w-full  ">
        <Routes>
         <Route path="/*"  element={<Navbar />} />
        </Routes>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
