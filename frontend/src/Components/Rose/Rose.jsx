import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Rose.css';

const Rose = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice: decorationTotalPrice, formData, bookingId } = location.state || {};
  const [selectedRose, setSelectedRose] = useState(null);
  const [roseTotalPrice, setRoseTotalPrice] = useState(0);
  const [roses, setRoses] = useState([]);

  useEffect(() => {
    const fetchRoses = async () => {
      const response = await axios.get('http://localhost:5000/api/roses');
      setRoses(response.data);
      setSelectedRose(null); // Ensure no rose is selected by default
      setRoseTotalPrice(0);  // Reset price
    };

    fetchRoses();
  }, []);

  useEffect(() => {
    console.log('Selected Rose:', selectedRose);
  }, [selectedRose]);

  const handleRoseSelect = (rose) => {
    setSelectedRose(rose);
    setRoseTotalPrice(rose.price);
  };

  const handleNext = async () => {
    if (!selectedRose) {
      alert('Please select a rose before proceeding.');
      return;
    }

    const roseData = {
      roseName: selectedRose.name,
      rosePrice: selectedRose.price,
    };

    const totalPriceWithRose = decorationTotalPrice + selectedRose.price;

    try {
      // Update the booking with rose details
      const response = await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
        rose: [roseData],
        totalPrice: totalPriceWithRose,
      });

      if (response.status === 200) {
        navigate('/addextra', {
          state: {
            totalPrice: totalPriceWithRose,
            formData: { ...formData, ...roseData },
            bookingId,
          },
        });
      } else {
        alert('Failed to update booking with rose details.');
      }
    } catch (error) {
      console.error('Error updating booking with rose details:', error);
    }
  };

  return (
    <div className="container">
      <div className="rose-page">
        <h1>Select Rose/Bouquet</h1>
        <div className="rose-list">
          {roses.map((rose) => (
            <div
              className={`rose-list-box ${selectedRose?._id === rose._id ? 'selected' : ''}`}
              key={rose._id}
              onClick={() => handleRoseSelect(rose)}
            >
              <img src={`http://localhost:5000${rose.image}`} alt={rose.name} />
              <p><strong>{rose.name}</strong></p>
              <p>Price: ₹{rose.price}</p>
            </div>
          ))}
        </div>
        <div className="rose-price">
          <p>Selected Rose/Bouquet Price : <strong>₹{selectedRose?.price || 0}</strong></p>
          <p>Total Price: <strong>₹{decorationTotalPrice + roseTotalPrice}</strong></p>
        </div>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Rose;