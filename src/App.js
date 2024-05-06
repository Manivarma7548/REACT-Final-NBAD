import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './components/Auth/AuthCxt';
import Login from './components/Auth/Login';
import Registeration from './components/Auth/Registeration';
import Dashboard from './components/Dashboard/Dashboard';
import BudgetList from './components/Dashboard/BudgetList';
import BudgetVisuzalization from './components/Dashboard/BudgetVisuzalization';
import AddExpenditure from './components/Dashboard/AddExpenditure';
import authService from './components/services/authService';
import './styles/style.css';
import Footer from './components/Footer/Footer'; // Added import for Footer component

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="welcome-message">Enjoy your personalized Budget</h1>
      <h2>Empower your financial journey with our tailored budget management solution.</h2>
      <div className="home-button-container">
        <Link to="/logingin" className="home-button">
          Login
        </Link>
        <Link to="/Registeration" className="home-button">
          Registeration
        </Link>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isTokenRefreshModalOpen, setTokenRefreshModalOpen] = useState(false);

  const handleLogin = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (authService.checkTokenExpiration()) {
        setTokenRefreshModalOpen(true);
      }
    };

    checkTokenExpiration();
  }, []);

  const handleRefreshToken = async () => {
    try {

      await authService.refreshAccessToken();

      setTokenRefreshModalOpen(false);
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logingin" element={<Login onLogin={handleLogin} />} />
          <Route path="/Registeration" element={<Registeration />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard token={token} /> : <Navigate to="/logingin" />}
          />
          {isLoggedIn && (
            <>
              <Route path="/dashboard/budget-list" element={<BudgetList />} />
              <Route path="/dashboard/budget-chart" element={<BudgetVisuzalization />} />
              <Route path="/dashboard/add-budget" element={<AddExpenditure token={token} />} />
            </>
          )}
        </Routes>
        <Footer /> {/* Added Footer component */}
      </AuthProvider>
    </Router>
  );
};

export default App;
