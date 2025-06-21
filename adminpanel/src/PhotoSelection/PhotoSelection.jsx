import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PhotoSelection.css';

const PhotoSelection = () => {
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [selections, setSelections] = useState([]);
  const [editSelection, setEditSelection] = useState(null); // For editing a selection

  // Fetch all selections from the backend
  useEffect(() => {
    const fetchSelections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/photo-selections');
        setSelections(response.data);
      } catch (error) {
        console.error('Error fetching selections:', error);
      }
    };
    fetchSelections();
  }, []);

  // Handle input changes
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // Handle form submission to add or update photo selection
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!time || !price) {
      alert('Please fill both time and price fields');
      return;
    }

    const newSelection = { time, price: parseFloat(price) };

    try {
      if (editSelection) {
        // Update the selection if editing
        await axios.put(`http://localhost:5000/api/photo-selections/${editSelection._id}`, newSelection);
        setEditSelection(null); // Reset the edit selection after updating
      } else {
        // Add new selection if not editing
        await axios.post('http://localhost:5000/api/photo-selections', newSelection);
      }

      // Reset form fields
      setTime('');
      setPrice('');

      // Fetch updated selections
      const response = await axios.get('http://localhost:5000/api/photo-selections');
      setSelections(response.data);
    } catch (error) {
      console.error('Error adding/updating selection:', error);
    }
  };

  // Set the current selection for editing
  const handleEdit = (selection) => {
    setEditSelection(selection);
    setTime(selection.time);
    setPrice(selection.price.toString());
  };

  // Delete a photo selection
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/photo-selections/${id}`);

      // Fetch updated selections after deletion
      const response = await axios.get('http://localhost:5000/api/photo-selections');
      setSelections(response.data);
    } catch (error) {
      console.error('Error deleting selection:', error);
    }
  };

  return (
    <div className="photoSelection">
      <div className="container">
        <h1>Photo Selection</h1>

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="time" 
            value={time} 
            onChange={handleTimeChange} 
            placeholder="e.g., 30 minutes" 
            required 
          />
          <input 
            type="number" 
            name="price" 
            value={price} 
            onChange={handlePriceChange} 
            placeholder="e.g., 1000" 
            required 
          />
          <button type="submit">{editSelection ? 'Update Selection' : 'Add Selection'}</button>
        </form>

        <h2>Existing Selections</h2>
        <ul>
          {selections.map((selection) => (
            <li key={selection._id}>
              <p>{selection.time}-min - ₹{selection.price}-price</p>
              <button onClick={() => handleEdit(selection)}>Edit</button>
              <button onClick={() => handleDelete(selection._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PhotoSelection;
