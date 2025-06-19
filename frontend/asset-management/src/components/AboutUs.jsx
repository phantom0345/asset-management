import React from 'react';
import './AboutUs.css';
import SuhaibImage from '../assets/suhaib.webp';
import raviimage from '../assets/ravi1.jpg';
import pardhiv from '../assets/pardhiv.jpg'; 
import yash from '../assets/yash111.jpg';

const Aboutus = () => (
  <div className="aboutus-container">
   
    <div className="aboutus-info">
      <h1>About Us</h1>
      <p>
        Welcome to our company! We are a leading organization in the tech industry, specializing in innovative solutions
        that drive business success. Our mission is to empower our clients with cutting-edge technologies and services.
      </p>
      <h2>Company Highlights</h2>
      <ul>
        <li>Founded in 2010, with a global presence across 20+ countries.</li>
        <li>Innovative projects in AI, machine learning, and cloud computing.</li>
        <li>Recognized by industry leaders for excellence in technology and design.</li>
      </ul>
    </div>

    
    <div className="developer-section">
      <h2>Meet Our Developers</h2>
      <div className="developer-profiles">
        
        <div className="developer-card">
          <img
            src={raviimage}
            alt="Developer 1"
            className="developer-image"
          />
          <h3>Ravi Reddy</h3>
          <p>Frontend Developer</p>
        </div>
        {/* Developer 2 */}
        <div className="developer-card">
          <img
            src={yash}
            alt="Developer 2"
            className="developer-image"
          />
          <h3>yaswanth sai</h3>
          <p>Backend Developer</p>
        </div>
        {/* Developer 3 */}
        <div className="developer-card">
          <img
            src={SuhaibImage}
            alt="Developer 3"
            className="developer-image"
          />
          <h3>suhaib</h3>
          <p>DevOps Engineer</p>
        </div>
        {/* Developer 4 */}
        <div className="developer-card">
          <img
            src={pardhiv}
            alt="Developer 4"
            className="developer-image"
          />
          <h3>pardhiv</h3>
          <p>UI/UX Designer</p>
        </div>
      </div>
    </div>
  </div>
);

export default Aboutus;
