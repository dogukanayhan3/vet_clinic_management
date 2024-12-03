import React, { useState } from 'react';
import Register from './components/Register';
import PetProfile from './components/PetProfile';
import Appointments from './components/Appointments';
import AdminDashboard from './components/AdminDashboard';
import Login from "./components/Login"
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login'); // 'login' or 'register'
  const [activeTab, setActiveTab] = useState('login'); // Tracks Login/Register tab

  const handleLogin = (username, password) => {
    // Simple login check (Replace with your API or validation logic)
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Try "admin" and "password".');
    }
  };

  const handleRegister = (userData) => {
    // Placeholder logic for registration
    console.log('User registered:', userData);
    setActiveTab('login');
    alert('Registration successful! Please login.');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'pets':
        return <PetProfile />;
      case 'appointments':
        return <Appointments />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <PetProfile />;
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <header>
            <h1>Pet Clinic Management System</h1>
            <nav>
              <button onClick={() => setCurrentPage('pets')}>My Pets</button>
              <button onClick={() => setCurrentPage('appointments')}>Appointments</button>
              <button onClick={() => setCurrentPage('admin')}>Admin Panel</button>
              <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            </nav>
          </header>
          <main>{renderPage()}</main>
        </div>
      ) : (
        <div className="auth-container">
          <div className="auth-tabs">
            <button
              className={activeTab === 'login' ? 'active' : ''}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={activeTab === 'register' ? 'active' : ''}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>
          {activeTab === 'login' ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Register onRegister={handleRegister} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;