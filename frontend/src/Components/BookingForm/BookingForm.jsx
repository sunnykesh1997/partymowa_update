import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingForm.css';
import luna from '../../assets/luna3.jpg';
import rosset from '../../assets/rosset2.jpg';
import celestial from '../../assets/Celestial.jpg';

const BookingForm = () => {
  const { themeName } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: '',
    event: '',
    persons: 4,
    addons: 'No',
  });

  const [bookedSlots, setBookedSlots] = useState([]);

  const themes = {
    LUNA: {
      base_price: 749,
      base_extra_person_price: 200,
      price: 1349,
      extra_person_price: 350,
      slots: ['10.00 am – 1.00 pm', '1.30pm – 4.30pm', '7.00pm – 10.00 pm', '10.30pm – 1.00 am', '5.00pm – 6.30pm (1.5 Hr slot)'],
      images: [luna],
    },
    ROSSET: {
      base_price: 899,
      base_extra_person_price: 200,
      price: 1499,
      extra_person_price: 350,
      slots: ['9.30 am – 12.30 pm', '1.00pm – 4.00pm', '6.30pm – 9.30 pm', '10.00pm – 1.00 am', '4.30pm – 6.00pm (1.5Hr Slot)'],
      images: [rosset],
    },
    CELESTIAL: {
      base_price: 1999,
      base_extra_person_price: 350,
      slots: ['9.00am – 10.30am', '11.00 am – 12.30pm', '1.00pm – 2.30pm', '3.00pm – 4.30pm', '5.30pm – 7.00pm', '7.30pm – 9.00pm', '9.30pm – 11.00pm', '11.30pm – 1.00am'],
      images: [celestial],
    },
  };

  const selectedTheme = themes[themeName.toUpperCase()] || {};

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!formData.date) return;
      try {
        const response = await fetch(`http://localhost:5000/api/booked-slots?theme=${themeName}&date=${formData.date}`);
        const data = await response.json();
        setBookedSlots(data.bookedSlots || []);
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    };

    fetchBookedSlots();
  }, [formData.date, themeName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSlotSelect = (slot) => {
    if (bookedSlots.includes(slot)) {
      alert('This slot is already booked.');
      return;
    }
    setFormData({ ...formData, timeSlot: slot });
  };

  const calculateTotal = () => {
    const extraPersons = Math.max(0, formData.persons - 4);
    const isShortSlot = formData.timeSlot.includes('1.5');
    const basePrice = selectedTheme.price
      ? (isShortSlot ? selectedTheme.base_price : selectedTheme.price)
      : selectedTheme.base_price;
    const extraPersonPrice = isShortSlot
      ? selectedTheme.base_extra_person_price
      : selectedTheme.extra_person_price || selectedTheme.base_extra_person_price;
    return basePrice + extraPersons * extraPersonPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.date || !formData.timeSlot || !formData.event) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    const totalPrice = calculateTotal();

    const bookingData = {
      ...formData,
      totalPrice,
      theme: themeName,
    };

    try {
      const response = await fetch('http://localhost:5000/api/bookings/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        const redirectPath = formData.addons === 'Yes' ? '/summary' : '/cake';
        navigate(redirectPath, {
          state: { totalPrice, formData, bookingId: result.booking._id },
        });
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="booking-page">
        <div className="theme-details">
          <div className="theme-info">
            <h2>{themeName}</h2>
          </div>
          <div className="booking-theme-image">
            {selectedTheme.images?.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`${themeName} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="booking-form">
          <h1>Booking Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Name:
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </label>
              <label>Phone:
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
              </label>
            </div>

            <label>Date:
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
            </label>

            <div>
              <p>Select Time Slot:</p>
              <div className="slot-buttons">
                {selectedTheme.slots?.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`slot-button ${formData.timeSlot === slot ? 'selected' : ''} ${bookedSlots.includes(slot) ? 'booked' : ''}`}
                    onClick={() => handleSlotSelect(slot)}
                    disabled={bookedSlots.includes(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <label>Number of Persons:
              <select
                name="persons"
                value={formData.persons}
                onChange={(e) => setFormData({ ...formData, persons: Number(e.target.value) })}
              >
                {[...Array(themeName.toUpperCase() === 'CELESTIAL' ? 3 : 16).keys()].slice(1).map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </label>

            <div className="form-select">
              <label>Event:
                <select name="event" value={formData.event} onChange={handleInputChange}>
                  <option value="">Select Event Type</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Groome To Be">Groome To Be</option>
                  <option value="Bride To Be">Bride To Be</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Farewell">Farewell</option>
                  <option value="Get Together">Get Together</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Marriage Proposal">Marriage Proposal</option>
                  <option value="Love Proposal">Love Proposal</option>
                  <option value="Mom To Be">Mom To Be</option>
                  <option value="Congratulation">Congratulation</option>
                </select>
              </label>

              <label>Add On's:
                <select name="addons" value={formData.addons} onChange={handleInputChange}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>
            </div>

            <p className="price">Total Price: <strong>₹{calculateTotal()}</strong></p>
            <button type="submit">Next</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
