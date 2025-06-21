import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddExtra.css';

const AddExtra = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice: roseTotalPrice, formData, bookingId } = location.state || {};
  const [selectedAddExtras, setSelectedAddExtras] = useState([]); // State to store multiple selected add-ons
  const [addExtraTotalPrice, setAddExtraTotalPrice] = useState(0);
  const [addExtras, setAddExtras] = useState([]);

  useEffect(() => {
    const fetchAddExtras = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/addExtras');
        setAddExtras(response.data);
        setSelectedAddExtras([]); // Reset selection
        setAddExtraTotalPrice(0);  // Reset total price
      } catch (error) {
        console.error('Error fetching add-ons:', error);
      }
    };

    fetchAddExtras();
  }, []);

  const handleAddExtraSelect = (addExtra) => {
    // Check if the add-on is already selected
    const isSelected = selectedAddExtras.some(item => item._id === addExtra._id);

    if (isSelected) {
      // Remove the add-on from the selected list if it's already selected
      setSelectedAddExtras(prevState => prevState.filter(item => item._id !== addExtra._id));
    } else {
      // Add the add-on to the selected list
      setSelectedAddExtras(prevState => [...prevState, addExtra]);
    }
  };

  useEffect(() => {
    // Calculate total price based on selected add-ons
    const total = selectedAddExtras.reduce((sum, addExtra) => sum + addExtra.price, 0);
    setAddExtraTotalPrice(total);
  }, [selectedAddExtras]);

  const handleNext = async () => {
    if (selectedAddExtras.length === 0) {
      alert('Please select at least one add-on before proceeding.');
      return;
    }
  
    // Prepare the addExtras data in the correct format
    const addExtraData = selectedAddExtras.map(addExtra => ({
      extraName: addExtra.name,      // The name of the extra
      extraPrice: addExtra.price,    // The price of the extra
    }));
  
    // Calculate the total price with add-ons
    const totalPriceWithAddExtra = roseTotalPrice + addExtraTotalPrice;
  
    try {
      // Update the booking with selected add-on details
      const response = await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
        addExtras: addExtraData,    // Send the addExtras data in the correct format
        totalPrice: totalPriceWithAddExtra,  // Send the updated total price
      });
  
      if (response.status === 200) {
        // Navigate to the summary page with updated booking details
        navigate('/photoselection', {
          state: {
            totalPrice: totalPriceWithAddExtra,
            formData: { ...formData, addExtras: addExtraData },  // Add addExtras to the form data
            bookingId,
          },
        });
      } else {
        alert('Failed to update booking with add-on details.');
      }
    } catch (error) {
      console.error('Error updating booking with add-on details:', error);
    }
  };
  

  return (
    <div className="container">
      <div className="add-extra-page">
        <h1>Select Add-Ons</h1>
        <div className="add-extra-list">
          {addExtras.map((addExtra) => (
            <div
              className={`add-extra-item ${selectedAddExtras.some(item => item._id === addExtra._id) ? 'selected' : ''}`}
              key={addExtra._id}
              onClick={() => handleAddExtraSelect(addExtra)}
            >
              {addExtra.image && (
                <img
                  src={`http://localhost:5000${addExtra.image}`}
                  alt={addExtra.name}
                  className="add-extra-image"
                />
              )}
              <p><strong>{addExtra.name}</strong></p>
              <p>Price: ₹{addExtra.price}</p>
            </div>
          ))}
        </div>
        <div className="add-extra-price">
          <p>Selected Add-On Price: <strong>₹{addExtraTotalPrice}</strong></p>
          <p>Total Price: <strong>₹{roseTotalPrice + addExtraTotalPrice}</strong></p>
        </div>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default AddExtra;
