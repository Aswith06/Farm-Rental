import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const updateBooking = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/bookings/${id}`, updatedData);
      console.log('Booking updated:', response.data);
      setBookings(bookings.map(booking => booking._id === id ? response.data : booking));
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      console.log('Booking deleted');
      setBookings(bookings.filter(booking => booking._id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            Equipment: {booking.equipment.name}, Start: {booking.startDate}, End: {booking.endDate}
            <button onClick={() => updateBooking(booking._id, { startDate: '2023-10-05', endDate: '2023-10-15' })}>Update</button>
            <button onClick={() => deleteBooking(booking._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewBookings;
