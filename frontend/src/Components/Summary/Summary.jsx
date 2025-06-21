import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed
import './Summary.css';

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the data passed through the navigation state
  const { totalPrice, formData } = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // Check if formData is available, otherwise show an error message
  if (!formData) {
    return <p>Booking details are missing. Please complete the booking form first.</p>;
  }

  // Function to handle submission to the backend
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
  
    // Construct the payload to be sent to the backend
    const payload = {
      name: formData.name,
      phone: formData.phone,
      date: formData.date,
      timeSlot: formData.timeSlot,
      event: formData.event,
      persons: formData.persons,
      addons: formData.addons,
      cakeName: formData.cakeData?.cakeName || null,
      cakePrice: formData.cakeData?.cakePrice || null,
      cakeQuantity: formData.cakeData?.cakeQuantity || null,
      cakeType: formData.cakeData?.cakeType || null,
      decorationName: formData.decorationName || null,
      decorationPrice: formData.decorationPrice || null,
      roseName: formData.roseName || null,
      rosePrice: formData.rosePrice || null,
      totalPrice: totalPrice,
    };
  
    console.log(payload); // Log the payload to ensure everything is correct before submitting
    
    try {
      // Send the payload to the backend
      const response = await axios.post('/api/bookings/book', payload);
      
      if (response.status === 200 || response.status === 201) {
        alert('Booking successful!');
        navigate('/thank-you'); // Redirect to a thank-you page or confirmation screen
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      setSubmissionError('An error occurred while submitting the booking. Please try again.');
      console.error('Submission error:', error.response || error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
    
  // JSX for the summary page
  return (
    <div className="container">
      <div className="summary-page">
        <h1>Booking Summary</h1>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Date:</strong> {formData.date}</p>
        <p><strong>Time Slot:</strong> {formData.timeSlot}</p>
        <p><strong>Event:</strong> {formData.event}</p>
        <p><strong>Number of Persons:</strong> {formData.persons}</p>
        <p><strong>Addons:</strong> {formData.addons}</p>
        {formData.cakeName && formData.cakePrice && formData.cakeQuantity && (
          <>
            <p><strong>Cake:</strong> {formData.cakeName} ({formData.cakeQuantity})</p>
            <p><strong>Cake Price:</strong> ₹{formData.cakePrice}</p>
          </>
        )}
        {formData.decorationName && (
          <>
            <p><strong>Decoration:</strong> {formData.decorationName}</p>
            <p><strong>Decoration Price:</strong> ₹{formData.decorationPrice}</p>
          </>
        )}
        {formData.roseName && (
          <>
            <p><strong>Rose/Bouquet:</strong> {formData.roseName}</p>
            <p><strong>Rose/Bouquet Price:</strong> ₹{formData.rosePrice}</p>
          </>
        )}
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
        {submissionError && <p className="error">{submissionError}</p>}
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

export default Summary;
