import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './PhotoSelection.css';
import cameraImage from '../../assets/themes.png'; // Replace with your static image

const PhotoSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, bookingId, totalPrice: decorationTotalPrice } = location.state || {};
  const [photoSelections, setPhotoSelections] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [totalPrice, setTotalPrice] = useState(decorationTotalPrice || 0);

  // Fetch photo selections
  useEffect(() => {
    const fetchPhotoSelections = async () => {
      const response = await axios.get('http://localhost:5000/api/photo-selections');
      setPhotoSelections(response.data);
    };

    fetchPhotoSelections();
  }, []);

  const handleTimeSelect = (selection) => {
    setSelectedTime(selection);
    setTotalPrice(decorationTotalPrice + selection.price);
  };

  const handleNext = async () => {
    if (!selectedTime) {
      alert('Please select a time for your photo session.');
      return;
    }

    const photoSelectionData = {
      time: selectedTime.time,
      price: selectedTime.price,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
        photoSelections: [photoSelectionData],
        totalPrice,
      });

      if (response.status === 200) {
        navigate('/summary', {
          state: {
            totalPrice,
            formData: { ...formData, ...photoSelectionData },
            bookingId,
          },
        });
      }
    } catch (error) {
      console.error('Error updating booking with photo selection:', error);
    }
  };

  return (
    <div className="photo-selection-container">
      <h1>Select Your Photo Session Time</h1>
      <div className="camera-image-container">
        <img src={cameraImage} alt="Camera" className="camera-image" />
      </div>
      <p>you need photos, select the option for the camera</p>
      <div className="photo-selection-list">
        {photoSelections.map((selection) => (
          <div
            key={selection._id}
            className={`photo-selection-box ${selectedTime?._id === selection._id ? 'selected' : ''}`}
            onClick={() => handleTimeSelect(selection)}
          >
            <p><strong>{selection.time}-min</strong></p>
            <p>Price: ₹{selection.price}</p>
          </div>
        ))}
      </div>
      <div className="photo-selection-price">
        <p>Selected Time: <strong>{selectedTime?.time || 'None'}</strong></p>
        <p>totalPrice Price: <strong>₹{totalPrice}</strong></p>
      </div>
      <button className="next-btn" onClick={handleNext}>Next</button>
    </div>
  );
};

export default PhotoSelection;
