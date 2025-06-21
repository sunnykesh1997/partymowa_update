import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Decoration.css';

const Decoration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice: cakesTotalPrice = 0, formData, bookingId } = location.state || {};

  const [decorations, setDecorations] = useState([]);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eventInputs, setEventInputs] = useState({});

  // Fetch decorations from backend
  const getDecoration = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/decorations');
      const data = await response.json();

      if (Array.isArray(data)) {
        setDecorations(data);
      } else {
        console.error("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error('Error fetching decorations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDecoration();
  }, []);

  const handleDecorationSelect = (decoration) => {
    setSelectedDecoration(decoration);
  };

  const handleNext = async () => {
    if (!selectedDecoration) {
      alert('Please select a decoration before proceeding.');
      return;
    }

    const decorationData = {
      decorationName: selectedDecoration.name,
      decorationPrice: selectedDecoration.price,
      ...eventInputs
    };

    const totalPriceWithDecoration = cakesTotalPrice + selectedDecoration.price;

    try {
      const response = await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
        decoration: [decorationData],
        totalPrice: totalPriceWithDecoration,
      });

      if (response.status === 200) {
        navigate('/rose', {
          state: {
            totalPrice: totalPriceWithDecoration,
            formData: { ...formData, ...decorationData },
            bookingId,
          },
        });
      } else {
        alert('Failed to update booking with decoration details.');
      }
    } catch (error) {
      console.error('Error updating booking with decoration details:', error);
    }
  };

  return (
    <div className="container">
      <h1>Select Decoration</h1>

      {loading ? (
        <p>Loading decorations...</p>
      ) : decorations.length > 0 ? (
        <div className="decoration-list">
          {decorations.map((decoration) => (
            <div
              key={decoration._id}
              className={`decoration-list-box ${selectedDecoration?._id === decoration._id ? 'selected' : ''}`}
              onClick={() => handleDecorationSelect(decoration)}
            >
              <img
                src={decoration.image ? `http://localhost:5000/${decoration.image}` : "/fallback.jpg"}
                alt={decoration.name}
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
              <p><strong>{decoration.name}</strong></p>
              <p>Price: ₹{decoration.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No decorations found.</p>
      )}

      {/* Conditional Inputs Based on Event Type */}
      {selectedDecoration && (
        <div className="event-details">
          {formData.event === 'Anniversary' && (
            <>
              <label>Husband Name:
                <input
                  type="text"
                  value={eventInputs.husbandName || ''}
                  onChange={(e) => setEventInputs({ ...eventInputs, husbandName: e.target.value })}
                />
              </label>
              <label>Wife Name:
                <input
                  type="text"
                  value={eventInputs.wifeName || ''}
                  onChange={(e) => setEventInputs({ ...eventInputs, wifeName: e.target.value })}
                />
              </label>
            </>
          )}

          {formData.event === 'Baby Shower' && (
            <label>Mom-to-be Name:
              <input
                type="text"
                value={eventInputs.momName || ''}
                onChange={(e) => setEventInputs({ ...eventInputs, momName: e.target.value })}
              />
            </label>
          )}

          {['Birthday', 'Bride To Be', 'Corporate', 'Groome To Be'].includes(formData.event) && (
            <label>{formData.event} Person Name:
              <input
                type="text"
                value={eventInputs.personName || ''}
                onChange={(e) => setEventInputs({ ...eventInputs, personName: e.target.value })}
              />
            </label>
          )}
        </div>
      )}

      <div className="total-price">
        <p>Total Price: ₹{selectedDecoration ? cakesTotalPrice + selectedDecoration.price : cakesTotalPrice}</p>
      </div>

      <button className="next-btn" onClick={handleNext}>Next</button>
    </div>
  );
};

export default Decoration;
