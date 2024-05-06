import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import AddExpenditure from './AddExpenditure';
import BudgetList from './BudgetList';
import BudgetVisuzalization from './BudgetVisuzalization';
import AddExpenditureCapacity from './AddExpenditureCapacity';
import { useAuth } from '../Auth/AuthCxt';
import '../../styles/Dashboard.css'; 
import config from '../../config';

const Dashboard = ({ token, username }) => {
  const { logout, refreshAccessToken, checkTokenExpiration } = useAuth();
  const BASE_URL = config.apiUrl; // Define BASE_URL here

  const [showAddExpenditure, setShowAddExpenditure] = useState(false);
  const [showBudgetList, setShowBudgetList] = useState(false);
  const [showBudgetVisuzalization, setShowBudgetVisuzalization] = useState(false);
  const [showAddExpenditureCapacity, setShowAddExpenditureCapacity] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleTokenRefreshConfirmation = () => {
    setShowConfirmationModal(true);

    setTimeout(() => {
      setShowConfirmationModal(false);
    }, 5000);
  };

  const handleConfirmationYes = async () => {

    setIsTokenRefreshed(true);
    setShowConfirmationModal(false);
    try {
      console.log('Refreshing token...');

      console.log('Token refreshed successfully. Continuing with the action...');
      
    } catch (error) {
      console.error('Error refreshing token:', error);

      logout();
    }
  };

  const handleConfirmationNo = () => {
    
    setShowConfirmationModal(false);
    window.location.reload();
  };

  const handleAddExpenditureClick = () => {
    setShowAddExpenditure(true);
    setShowBudgetList(false);
    setShowBudgetVisuzalization(false);
    setShowAddExpenditureCapacity(false);
  };

  const handleBudgetListClick = () => {
    setShowAddExpenditure(false);
    setShowBudgetList(true);
    setShowBudgetVisuzalization(false);
    setShowAddExpenditureCapacity(false);
  };

  const handleBudgetVisuzalizationClick = () => {
    setShowAddExpenditure(false);
    setShowBudgetList(false);
    setShowBudgetVisuzalization(true);
    setShowAddExpenditureCapacity(false);
  };

  const handleAddExpenditureCapacityClick = () => {
    setShowAddExpenditure(false);
    setShowBudgetList(false);
    setShowBudgetVisuzalization(false);
    setShowAddExpenditureCapacity(true);
  };

  const handleLogout = () => {
    window.location.reload();
    logout();
  };

  const handleAddExpenditureCapacity = async (data) => {
    
    try {
      const apiUrl = BASE_URL+'/api/budgets/capacity';
      console.log('dashboard apiUrl', apiUrl);

      data.username = username;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      console.log('apiUrl', apiUrl);
      console.log('response from dashboard', response);

      console.log('Request Headers:', response.headers);
      console.log('Request Payload:', JSON.stringify(data));

      let responseData;

      if (response.ok) {
        responseData = await response.json();
        console.log('Budget capacity added successfully:', responseData);
        return { success: true, message: 'Budget capacity added successfully', responseData };
        
      } else {
        console.error('Failed to add budget capacity:', response.statusText);

        const errorData = await response.json();
        console.error('Error Data:', errorData);

        throw new Error('Failed to add budget capacity');
      }
    } catch (error) {
      console.error('Error adding budget capacity:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true; 
    console.log('Setting up token refresh interval...');
    const tokenRefreshInterval = setInterval(async () => {
      if (!isTokenRefreshed && isMounted) {
        console.log('Token about to expire. Displaying confirmation modal...');
        setShowConfirmationModal(true);
  
       
        setTimeout(async () => {
          if (!isTokenRefreshed && isMounted) {
            setShowConfirmationModal(false);
            try {
              console.log('Refreshing token...');
              if (isMounted) {
                setIsTokenRefreshed(true);
                console.log('Token refreshed successfully.');
                window.location.reload();
              }
            } catch (error) {
              console.error('Error refreshing token:', error);
              logout();
              window.location.reload();
            }
          } else {
            setShowConfirmationModal(false);
          }
        }, 20000);
      }
    }, 40000);

    return () => {
      console.log('Clearing token refresh interval...');
      clearInterval(tokenRefreshInterval);
      isMounted = false; 
    };
  }, [isTokenRefreshed, logout]);
  

  return (
    <div>
      <h1 className="personalbudget">Personal Budget Dashboard</h1>
      <p className="personalbudget">Manage and View your budgets easily.</p>


      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>


      <nav className="dashboard">
        <ul>
          <li>
            <button onClick={handleBudgetListClick}>View Budget in List</button>
          </li>
          <li>
            <button onClick={handleBudgetVisuzalizationClick}>View Budget in Chart</button>
          </li>
          <li>
            <button onClick={handleAddExpenditureClick}>Add Expenditure</button>
          </li>
          <li>
            <button onClick={handleAddExpenditureCapacityClick}>Configure Budget</button>
          </li>
        </ul>
      </nav>

      {showAddExpenditure && (
          <div className="centered-component add-budget-component">
            <AddExpenditure token={token} />
          </div>
        )}
        {showBudgetList && (
          <div className="centered-component budget-list-component">
            <BudgetList token={token} />
          </div>
        )}
        {showBudgetVisuzalization && (
          <div className="centered-component budget-chart-component">
            <BudgetVisuzalization token={token} />
          </div>
        )}
        {showAddExpenditureCapacity && (
          <div className="centered-component add-budget-capacity-component">
            <AddExpenditureCapacity token={token} onAddExpenditureCapacity={handleAddExpenditureCapacity} username={username} />
          </div>
        )}

      <Modal
        isOpen={showConfirmationModal}
        onRequestClose={handleCloseConfirmationModal}
        contentLabel="Token Refresh Confirmation Modal"
        className="dashboard-modal" 
      >
        <h2>Your session is about to expire</h2>
        <p>Do you want to refresh your session?</p>
        <button onClick={handleConfirmationYes}>Yes</button>
        <button onClick={handleConfirmationNo}>No</button>
      </Modal>
    </div>
  );
};

export default Dashboard;
