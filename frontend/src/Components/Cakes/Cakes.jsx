import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Cakes.css';
import axios from 'axios';

const Cakes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cakes, setCakes] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);
  const [cakeQuantity, setCakeQuantity] = useState('1/2 kg');
  const [cakeType, setCakeType] = useState('Egg');
  const { totalPrice = 0, formData = {}, bookingId } = location.state || {};

  const fetchCakes = async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cakes?type=${type}`);
      setCakes(response.data);
    } catch (error) {
      console.error('Error fetching cakes:', error);
    }
  };

  useEffect(() => {
    fetchCakes(cakeType);
  }, [cakeType]);

  const handleCakeTypeChange = (type) => {
    setCakeType(type);
  };

  const handleCakeSelect = (cake) => {
    setSelectedCake(cake);
    setCakeQuantity('1/2 kg');
  };

  const handleQuantityChange = (e) => {
    setCakeQuantity(e.target.value);
  };

  const handleNext = async () => {
    if (!selectedCake) {
      alert('Please select a cake before proceeding.');
      return;
    }

    if (!formData.name || !formData.phone || !formData.date || !formData.timeSlot || !formData.event) {
      alert('Missing required form data.');
      return;
    }

    const cakeQuantityValue = cakeQuantity === '1/2 kg' ? 0.5 : 1;

    const cakeDetails = {
      cakeName: selectedCake.name,
      cakePrice: cakeQuantity === '1/2 kg' ? selectedCake.halfKgPrice : selectedCake.fullKgPrice,
      cakeQuantity: cakeQuantityValue,
      cakeType: cakeType,
    };

    const updatedFormData = {
      ...formData,
      cake: [cakeDetails],
      totalPrice: totalPrice + (cakeQuantity === '1/2 kg' ? selectedCake.halfKgPrice : selectedCake.fullKgPrice),
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, updatedFormData);
      if (response.status === 200) {
        navigate('/decoration', {
          state: {
            totalPrice: updatedFormData.totalPrice,
            formData: updatedFormData,
            bookingId,
          },
        });
      } else {
        alert('Failed to update booking with cake details.');
      }
    } catch (error) {
      alert('Error submitting cake details.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="cake-page">
        <h1>Select Cake</h1>

        <div className="cake-type">
          <button onClick={() => handleCakeTypeChange('Egg')} className={cakeType === 'Egg' ? 'selected' : ''}>Egg Cakes</button>
          <button onClick={() => handleCakeTypeChange('Eggless')} className={cakeType === 'Eggless' ? 'selected' : ''}>Eggless Cakes</button>
        </div>

        <div className="cake-list">
          {cakes.map((cake) => (
            <div
              key={cake._id}
              className={`cake-list-box ${selectedCake?._id === cake._id ? 'selected' : ''}`}
              onClick={() => handleCakeSelect(cake)}
            >
              <img src={`http://localhost:5000${cake.image}`} alt={cake.name} />
              <p><strong>{cake.name}</strong></p>
              <p>Price: ₹{cake.halfKgPrice} (1/2 kg) / ₹{cake.fullKgPrice} (1 kg)</p>
            </div>
          ))}
        </div>

        {selectedCake && (
          <div className="cake-quantity">
            <h3>Select Quantity</h3>
            <select value={cakeQuantity} onChange={handleQuantityChange}>
              <option value="1/2 kg">1/2 kg</option>
              <option value="1 kg">1 kg</option>
            </select>
          </div>
        )}

        <div className="cake-price">
          <p>Selected Cake Price: <strong>₹{selectedCake ? (cakeQuantity === '1/2 kg' ? selectedCake.halfKgPrice : selectedCake.fullKgPrice) : 0}</strong></p>
        </div>

        <div>
          <p>Total Price: <strong>₹{totalPrice}</strong></p>
          <button className="next-btn" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Cakes;
