import React, { useState } from 'react';
import { useMyContext } from '../context/FormContext';
import './style.css';

export const SearchForm = () => {
  const [formData, setFormData] = useState({ email: '', number: '' });
  const { setData, setStatus, setLoading } = useMyContext();

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const formatPhoneNumber = (input) => {
    const numbersOnly = input.replace(/\D/g, '').slice(0, 6);
    return numbersOnly.replace(/^(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3');
  };

  const handleChangeInput = (e) => {
    if (e.target.name === 'number') {
      console.log(e.target.value);
      e.target.value = formatPhoneNumber(e.target.value);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    const queryString = new URLSearchParams(formData).toString();
    if (!isValidEmail(formData.email)) {
      setLoading(false);
      setStatus('Invalid email');
      return;
    }

    fetch(`http://localhost:3000/api/get?${queryString}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        setStatus('User not found');
        setData(res);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    formData.email = '';
    formData.number = '';
  };

  return (
    <form className="search-form" onSubmit={handleChanges}>
      <div className="search-field">
      <label htmlFor="email">Email</label>
        <input onChange={handleChangeInput} type="email" name="email" id="email" required value={formData.email} placeholder='nile@rb.com'/>
      </div>
      <div className="search-field">
        <label htmlFor="number">Number</label>
        <input type="text" onChange={handleChangeInput} name="number" id="number" value={formData.number} placeholder='23-45-56'></input>
      </div>

      <button className="submit-button" type="submit">
        Send
      </button>
    </form>
  );
};
