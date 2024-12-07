import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EquipmentListings from './components/EquipmentListings';
import EquipmentDetails from './components/EquipmentDetails';
import Booking from './components/Booking';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Register from './components/Register';
import EquipmentCard from './components/EquipmentCard';
import Cart from './components/Cart';
import './styles.css';

function App() {
  const [equipmentData, setEquipmentData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/equipment')
      .then(response => response.json())
      .then(data => setEquipmentData(data))
      .catch(error => console.error('Error fetching equipment data:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <a href="/">Home</a>
          <a href="/listings">Equipment</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
        {window.location.pathname === '/' && (
          <header className="home-header">
            <h1>Farm Equipment Rental</h1>
            <p>Rent the equipment you need for your farm at competitive prices</p>
            <a href="/listings" className="call-to-action">Browse Equipment</a>
          </header>
        )}
        <main>
          <Routes>
            <Route path="/listings" element={<EquipmentListings />} />
            <Route path="/details" element={<EquipmentDetails />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Routes>
            <Route path="/" element={
              <div>
                <section className="features">
                  <div className="feature-card">
                    <h3>Wide Equipment Selection</h3>
                    <p>Access to a variety of farming equipment including tractors, plows, and harvesters.</p>
                  </div>
                  <div className="feature-card">
                    <h3>Secure Booking</h3>
                    <p>Safe and secure booking process with verified equipment providers.</p>
                  </div>
                  <div className="feature-card">
                    <h3>Flexible Payment</h3>
                    <p>Multiple payment options and competitive daily rates.</p>
                  </div>
                </section>
                <section className="how-it-works">
                  <h2>How It Works</h2>
                  <div className="steps">
                    <div className="step">
                      <h3>1</h3>
                      <p>Browse our selection of farming equipment</p>
                    </div>
                    <div className="step">
                      <h3>2</h3>
                      <p>Choose your rental dates and book</p>
                    </div>
                    <div className="step">
                      <h3>3</h3>
                      <p>Make secure payment</p>
                    </div>
                    <div className="step">
                      <h3>4</h3>
                      <p>Pick up equipment and start farming</p>
                    </div>
                  </div>
                </section>
                <div className="equipment-list">
                  {equipmentData.map((item, index) => (
                    <EquipmentCard key={index} {...item} />
                  ))}
                </div>
              </div>
            } />
          </Routes>
        </main>
        <footer>
          <div className="footer-section">
            <h4>Rent Equipment</h4>
            <ul>
              <li>Tractors</li>
              <li>Harvesters</li>
              <li>Plows</li>
              <li>All Equipment</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Learn</h4>
            <ul>
              <li>About Us</li>
              <li>How It Works</li>
              <li>Blog</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>More</h4>
            <ul>
              <li>Sign In</li>
              <li>Contact Us</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 Farm Equipment Rental Platform</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
