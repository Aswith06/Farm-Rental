import React from 'react';
import './EquipmentCard.css';

const EquipmentCard = ({ image, name, description, price, availability, reviews }) => {
  const handleRentNow = () => {
    fetch('http://localhost:3001/rent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ equipmentId: name, userId: 'exampleUserId' }), // Replace with actual user ID
    })
      .then(response => response.ok ? alert('Equipment rented successfully!') : alert('Failed to rent equipment'))
      .catch(error => console.error('Error renting equipment:', error));
  };

  return (
    <div className="equipment-card">
      <img src={image} alt={name} className="equipment-image" />
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="equipment-details">
        <span className="price">${price}/day</span>
        <span className={`availability ${availability ? 'available' : 'unavailable'}`}>{availability ? 'Available' : 'Unavailable'}</span>
      </div>
      <div className="reviews">
        <span>{'⭐'.repeat(reviews)}</span>
        <span>({reviews} reviews)</span>
      </div>
      <button className="rent-button" onClick={handleRentNow}>RENT NOW</button>
    </div>
  );
};

export default EquipmentCard;
