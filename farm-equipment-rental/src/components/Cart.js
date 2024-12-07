import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const location = useLocation();
  const equipment = location.state;

  const pricing = {
    'Tractor Model X1': { daily: 1500, weekly: 9000, monthly: 36000 },
    'Harvester Pro 3000': { daily: 2000, weekly: 12000, monthly: 48000 },
    'Excavator ZX200': { daily: 2200, weekly: 13200, monthly: 52800 }
  };

  const { daily, weekly, monthly } = pricing[equipment.name] || {};

  const [rateType, setRateType] = useState('daily');
  const [quantity, setQuantity] = useState(1);

  const handleRateChange = (event) => {
    setRateType(event.target.value);
    setQuantity(1); // Reset quantity when rate type changes
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const calculateTotal = () => {
    if (rateType === 'daily') return daily * quantity;
    if (rateType === 'weekly') return daily * 7 * quantity;
    if (rateType === 'monthly') return daily * 30 * quantity;
    return 0;
  };

  const calculateDiscount = () => {
    if (rateType === 'daily') return 0; // 0% discount
    if (rateType === 'weekly') return calculateTotal() * 0.1; // 10% discount
    if (rateType === 'monthly') return calculateTotal() * 0.2; // 20% discount
    return 0;
  };

  const calculateTotalWithDiscount = () => {
    const total = calculateTotal();
    const discount = calculateDiscount();
    return total - discount;
  };

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>{equipment.name}</h2>
        <img src={equipment.image} alt={equipment.name} />
        <div className="cart-details">
          <h3>Specifications</h3>
          <ul>
            <li>Type: {equipment.type || 'Tractor'}</li>
            <li>Daily Rate: ₹{daily}</li>
            <li>Availability: {equipment.availability}</li>
          </ul>
          <h3>Features</h3>
          <p>{equipment.description}</p>
          <h3>Location</h3>
          <div className="location">
            Located at: 72.8777, 19.076
          </div>
        </div>
      </div>
      <div className="cart-pricing">
        <p>₹{daily} per day</p>
        <p>Weekly Rate: ₹{daily * 7}</p>
        <p>Monthly Rate: ₹{daily * 30}</p>
        <div>
          <input type="radio" name="rate" value="daily" checked={rateType === 'daily'} onChange={handleRateChange} /> Daily
          <input type="radio" name="rate" value="weekly" checked={rateType === 'weekly'} onChange={handleRateChange} /> Weekly
          <input type="radio" name="rate" value="monthly" checked={rateType === 'monthly'} onChange={handleRateChange} /> Monthly
        </div>
        {rateType === 'daily' && <input type="number" placeholder="Number of Days" min="1" value={quantity} onChange={handleQuantityChange} />}
        {rateType === 'weekly' && <input type="number" placeholder="Number of Weeks" min="1" value={quantity} onChange={handleQuantityChange} />}
        {rateType === 'monthly' && <input type="number" placeholder="Number of Months" min="1" value={quantity} onChange={handleQuantityChange} />}
        <p>Price: ₹{calculateTotal()}</p>
        <p>Discount: -₹{calculateDiscount()}</p>
        <p>Total: ₹{calculateTotalWithDiscount()}</p>
        <button disabled={equipment.availability !== 'Available'}>RENT NOW</button>
        <p className={`availability ${equipment.availability === 'Available' ? 'available' : ''}`}>
          {equipment.availability === 'Available' ? '✓ Available' : '× Currently Unavailable'}
        </p>
      </div>
    </div>
  );
};

export default Cart;
