import axios from 'axios';
import React, { useState } from 'react';

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    userId: '',
    equipmentId: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const createBooking = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
      console.log('Booking created:', response.data);
      alert('Booking created successfully!');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking');
    }
  };

  return (
    <div>
      <h2>Booking Page</h2>
      <p>Book your equipment rental here.</p>
      <input type="text" name="userId" placeholder="User ID" onChange={handleChange} />
      <input type="text" name="equipmentId" placeholder="Equipment ID" onChange={handleChange} />
      <input type="date" name="startDate" onChange={handleChange} />
      <input type="date" name="endDate" onChange={handleChange} />
      <button onClick={createBooking}>Create Booking</button>
    </div>
  );
};

export default Booking;
