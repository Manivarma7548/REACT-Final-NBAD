import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/AddExpenditure.css';
import config from '../../config';

const BASE_URL = config.apiUrl;

const AddExpenditure = ({ token }) => {
  const [budgetCategory, setBudgetCategory] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddExpenditure = async () => {
    try {
      const response = await axios.post(
        BASE_URL+'/api/budgets',
        { budgetName: budgetCategory, budgetNumber: budgetAmount, selectedDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data);

      toast.success('Expenditure added successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setBudgetCategory('');
      setBudgetAmount('');
      setSelectedDate(new Date());
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';

      console.error('Error adding budget:', errorMessage);

      toast.error(`Error: ${errorMessage}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="add-budget-form">
      <label>
        Budget Date:
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
      </label>
      <h2>Add Budget</h2>
      <label>
        Category:
        <input
          type="text"
          value={budgetCategory}
          onChange={(e) => setBudgetCategory(e.target.value)}
        />
      </label>
      <label>
        Number:
        <input
          type="number"
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
        />
      </label>
      <button onClick={handleAddExpenditure}>Add Budget</button>

      <ToastContainer />
    </div>
  );
};

export default AddExpenditure;
