import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EquipmentListings.css';

const EquipmentListings = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [filters, setFilters] = useState({ type: '', minPrice: '', maxPrice: '', availability: '' });

  const demoEquipmentData = [
    {
      id: 1,
      type: 'Tractor',
      name: 'Tractor Model X1',
      description: 'A powerful tractor suitable for all farming needs.',
      price: '₹1500/day',
      availability: 'Available',
      reviews: '(0 reviews)',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjD-CPpFtsmRLEzLbdghcwCBkKsbkKb5_rbw&s'
    },
    {
      id: 2,
      type: 'Harvester',
      name: 'Harvester Pro 3000',
      description: 'High efficiency harvester for large scale farming.',
      price: '₹2000/day',
      availability: 'Available',
      reviews: '(0 reviews)',
      image: 'https://www.deere.com/assets/images/region-4/products/harvesting/r4k010997-rrd-1365x768.jpg'
    },
    {
      id: 3,
      type: 'Excavator',
      name: 'Excavator ZX200',
      description: 'Efficient excavator for construction and mining.',
      price: '₹2200/day',
      availability: 'Rented',
      reviews: '(0 reviews)',
      image: 'https://cdn.sanity.io/images/agnoplrn/production/f7854fedd1a40f3f9b94c45621ebaa5acb53e537-6720x4480.jpg?rect=0,485,6720,3511&w=1200&h=627&fit=crop&auto=format'
    }
  ];

  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredEquipment = equipmentData.filter((equipment) => {
    const equipmentPrice = parseInt(equipment.price.replace('₹', '').replace('/day', ''));
    return (
      (filters.type ? equipment.type === filters.type : true) &&
      (filters.minPrice ? equipmentPrice >= parseInt(filters.minPrice) : true) &&
      (filters.maxPrice ? equipmentPrice <= parseInt(filters.maxPrice) : true) &&
      (filters.availability ? equipment.availability === filters.availability : true)
    );
  });

  useEffect(() => {
    setEquipmentData(demoEquipmentData);
  }, []);

  return (
    <div className="equipment-list">
      <div className="filters">
        <select name="type" onChange={handleFilterChange} value={filters.type}>
          <option value="">All Types</option>
          <option value="Tractor">Tractor</option>
          <option value="Harvester">Harvester</option>
          <option value="Excavator">Excavator</option>
        </select>
        <input type="number" name="minPrice" placeholder="Min Price" onChange={handleFilterChange} value={filters.minPrice} />
        <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleFilterChange} value={filters.maxPrice} />
        <select name="availability" onChange={handleFilterChange} value={filters.availability}>
          <option value="">All</option>
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
        </select>
      </div>
      {filteredEquipment.map(equipment => (
        <div key={equipment.id} className="equipment-card">
          <img src={equipment.image} alt={equipment.name} className="equipment-image" />
          <h3>{equipment.name}</h3>
          <p>{equipment.description}</p>
          <p>{equipment.price}</p>
          <span className={equipment.availability === 'Available' ? 'available' : 'rented'}>{equipment.availability}</span>
          <p>{equipment.reviews}</p>
          <button className="rent-now-button" onClick={() => navigate('/cart', { state: equipment })}>RENT NOW</button>
        </div>
      ))}
    </div>
  );
};

export default EquipmentListings;
