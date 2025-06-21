import React, { useEffect, useState } from 'react';
import './Themes.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Themes = () => {
    const navigate = useNavigate();
    const [themes, setThemes] = useState([]);
    const [bookedSlots, setBookedSlots] = useState({});
    const [selectedDates, setSelectedDates] = useState({});
    const [bookingsData, setBookingsData] = useState([]);

    const themeTimeSlots = {
        Luna: [
          "10.00 am – 1.00 pm",
          "1.30pm – 4.30pm",
          "7.00pm – 10.00 pm",
          "10.30pm – 1.00 am",
          "5.00pm – 6.30pm (1.5 Hr slot)",
        ],
        Rosset: [
          "9.30 am – 12.30 pm",
          "1.00pm – 4.00pm",
          "6.30pm – 9.30 pm",
          "10.00pm – 1.00 am",
          "4.30pm – 6.00pm (1.5Hr Slot)",
        ],
        Celestial: [
          "9.00am – 10.30am",
          "11.00 am – 12.30pm",
          "1.00pm – 2.30pm",
          "3.00pm – 4.30pm",
          "5.30pm – 7.00pm",
          "7.30pm – 9.00pm",
          "9.30pm – 11.00pm",
          "11.30pm – 1.00am",
        ],
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [themesResponse, bookingsResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/themes'),
                    axios.get('http://localhost:5000/api/bookings/admin/bookings')
                ]);
                setThemes(themesResponse.data);
                setBookingsData(bookingsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDateChange = async (themeName, date) => {
        try {
            setSelectedDates(prev => ({ ...prev, [themeName]: date }));
    
            if (date) {
                const formattedDate = new Date(date).toISOString().split('T')[0];
                const response = await axios.get('http://localhost:5000/api/bookings/booked-slots', {
                    params: { theme: themeName, date: formattedDate }
                });
    
                const booked = response.data.bookedSlots || [];
    
                // Store booked slots
                setBookedSlots(prev => ({ ...prev, [themeName]: booked }));
            }
        } catch (error) {
            console.error('Error fetching booked slots:', error);
        }
    };
    
    

    const getAvailableSlots = (themeName) => {
        const allSlots = themeTimeSlots[themeName] || [];
        const booked = bookedSlots[themeName] || [];
    
        return allSlots.filter(slot => {
            const normalizedSlot = slot.trim().replace(/\s+/g, ' ').toLowerCase();
            return !booked.some(bookedSlot =>
                bookedSlot.trim().replace(/\s+/g, ' ').toLowerCase() === normalizedSlot
            );
        });
    };
    
    

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className='themes' style={{ color: "black" }}>
            <div className="container">
                <div className="theme-header">
                    <div className="theme-pricing-section" style={{ padding: '40px 0', background: '#f9f9f9' }}>
                        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '30px' }}>
                            Party Themes & Offers
                        </h2>
                        <div className="themes-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
                            {themes.map((theme) => (
                                <div key={theme._id} className="theme-card" style={{
                                    background: '#fff', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                                    padding: '20px', width: '300px', textAlign: 'center'
                                }}>
                                    <h3 style={{
                                        color: theme.theme_name === 'Luna' ? '#7409f6' :
                                            theme.theme_name === 'Rosset' ? '#e91e63' : '#3f51b5',
                                        fontSize: '24px', fontWeight: 'bold'
                                    }}>
                                        {theme.theme_name === 'Luna' ? '🌙 Luna' :
                                            theme.theme_name === 'Rosset' ? '🌹 Rosset' : '🌌 CELESTIAL'}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="theme-type-list">
                        {themes.map((theme, index) => {
                            const themeName = theme.theme_name;
                            const selectedDate = selectedDates[themeName];
                            const availableSlots = getAvailableSlots(themeName);
                            const bookedForSelectedDate = bookedSlots[themeName] || [];

                            return (
                                <div key={index} className="themes-bg">
                                    <h2 style={{
                                        color: '#e91e63',
                                        textAlign: 'center',
                                        marginBottom: '20px'
                                    }}>
                                        {themeName.toUpperCase()} THEME
                                    </h2>
                                    <div className="theme-image" style={{ marginBottom: '20px' }}>
                                        <img
                                            src={`http://localhost:5000/uploads/${theme.theme_img}`}
                                            alt={themeName}
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                            }} />
                                    </div>
                                    <div className="date-selection" style={{
                                        backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px'
                                    }}>
                                        <div className="date-picker" style={{ marginBottom: '15px' }}>
                                            <label htmlFor={`date-${index}`} style={{
                                                display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '16px', color: 'black'
                                            }}>
                                                Select Your Preferred Date
                                            </label>
                                            <input
                                                type="date"
                                                id={`date-${index}`}
                                                name={`date-${index}`}
                                                style={{
                                                    padding: '10px',
                                                    borderRadius: '5px',
                                                    border: '1px solid #ddd',
                                                    width: '100%',
                                                    fontSize: '16px'
                                                }}
                                                onChange={(e) => handleDateChange(themeName, e.target.value)}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>

                                        {selectedDate && (
                                            <div className="booking-info" style={{
                                                backgroundColor: '#fff',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #eee'
                                            }}>
                                                <h3 style={{
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                    marginBottom: '10px',
                                                    color: '#333'
                                                }}>
                                                    Availability for {formatDate(selectedDate)}
                                                </h3>

                                                <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                                    Available Time Slots:
                                                </p>
                                                {availableSlots.length > 0 ? (
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                        {availableSlots.map((slot, i) => (
                                                            <span key={i} style={{
                                                                backgroundColor: '#e8f5e9',
                                                                color: '#2e7d32',
                                                                padding: '5px 10px',
                                                                borderRadius: '4px',
                                                                fontSize: '14px',
                                                                border: '1px solid #a5d6a7'
                                                            }}>
                                                                {slot}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p style={{ color: '#c62828', fontWeight: 'bold' }}>
                                                        No available time slots for this date. Please select another date.
                                                    </p>
                                                )}

                                                {bookedForSelectedDate.length > 0 && (
                                                    <>
                                                        <p style={{ fontWeight: 'bold', margin: '10px 0' }}>
                                                            Booked Time Slots:
                                                        </p>
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                            {bookedForSelectedDate.map((slot, i) => (
                                                                <span key={`booked-${i}`} style={{
                                                                    backgroundColor: '#ffebee',
                                                                    color: '#c62828',
                                                                    padding: '5px 10px',
                                                                    borderRadius: '4px',
                                                                    fontSize: '14px',
                                                                    border: '1px solid #ef9a9a'
                                                                }}>
                                                                    {slot} (Booked)
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="theme-btn" style={{ textAlign: 'center' }}>
                                        <button
                                            onClick={() => {
                                                if (!selectedDate) {
                                                    alert('Please select a date first');
                                                    return;
                                                }
                                                if (availableSlots.length === 0) {
                                                    alert('No available slots for selected date');
                                                    return;
                                                }
                                                navigate(`/book/${themeName}`, {
                                                    state: {
                                                        themeData: theme,
                                                        selectedDate,
                                                        bookedSlots: bookedForSelectedDate,
                                                        availableSlots
                                                    }
                                                });
                                            }}
                                            style={{
                                                backgroundColor: '#e91e63',
                                                color: 'white',
                                                border: 'none',
                                                padding: '12px 25px',
                                                borderRadius: '5px',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                            }}
                                            onMouseOver={(e) => {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
                                            }}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Themes;
