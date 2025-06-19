import React, { useState } from "react";
import "./Contact.css";

const ContactUs = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [helpChatVisible, setHelpChatVisible] = useState(false);  // For the chatbox
  const [showAboutUs, setShowAboutUs] = useState(false);  // For the About Us section
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    address: "",
    helpRequest: "",
  });
  const [chatMessages, setChatMessages] = useState([
    { user: false, text: "How can I help you today?" },  // initial message
  ]);
  const [userInput, setUserInput] = useState("");

  // Toggle visibility of the form
  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  // Toggle visibility of the help chatbox
  const toggleHelpChat = () => {
    setHelpChatVisible(!helpChatVisible);
  };

  // Toggle visibility of the About Us section
  const toggleAboutUs = () => {
    setShowAboutUs(!showAboutUs);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  // Handle user message input in chat
  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check if the server is running
      const response = await fetch("http://localhost:5000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });
  
      if (response.ok) {
        alert("Contact information submitted successfully!");
        setContactForm({
          name: "",
          email: "",
          address: "",
          helpRequest: "",
        });
        setFormVisible(false); // Hide the form after successful submission
      } else {
        const errorData = await response.json();
        alert(`Error submitting form: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server. Please ensure the backend server is running on port 5000.");
    }
  }

  // Handle the sending of a message in the help chat
  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      // Add the user's message to chat history
      setChatMessages([
        ...chatMessages,
        { user: true, text: userInput },
      ]);

      // Simulate a response (could be expanded to include a real bot or recommendations)
      setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { user: false, text: botResponse },
        ]);
      }, 1000); // Simulate a delay for bot response
      setUserInput(""); // Reset input field
    }
  };

  // Simple function to simulate bot responses
  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Example responses
    if (lowerMessage.includes("price")) {
      return "Our pricing details can be found on the Pricing page.";
    } else if (lowerMessage.includes("hours")) {
      return "We are available Monday to Friday, 9 AM to 6 PM.";
    } else if (lowerMessage.includes("support")) {
      return "Our support team will get back to you shortly!";
    } else {
      return "I'm not sure, but I'm here to help! Can you elaborate?";
    }
  };

  return (
    <div className="contact-us-container">
      <header className="hero-section">
        <h1>Contact Us</h1>
        <p>Get in touch and let us know how we can help</p>
      </header>

      <div className="card-container">
        {/* Sales Card */}
        <div className="card">
          <div className="icon">
            <i className="fas fa-building"></i>
          </div>
          <h3>Sales</h3>
          <p>We'd love to talk about how we can work together.</p>
          <button className="card-button" onClick={toggleFormVisibility}>
            Contact Sales
          </button>
        </div>

        {/* Help & Support Card */}
        <div className="card">
          <div className="icon">
            <i className="fas fa-headset"></i>
          </div>
          <h3>Help & Support</h3>
          <p>We're here to help with any questions or code.</p>
          <button className="card-button" onClick={toggleHelpChat}>
            Get Support
          </button>
        </div>

        {/* Media & Press Card */}
        <div className="card">
          <div className="icon">
            <i className="fas fa-newspaper"></i>
          </div>
          <h3>Media & Press</h3>
          <p>Get company info, media resources, and more.</p>
          <button className="card-button" onClick={toggleAboutUs}>
            Visit Newsroom
          </button>
        </div>
      </div>

      {/* Contact Form */}
      {formVisible && (
        <div className="contact-form">
          <h3>Contact Sales</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactForm.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactForm.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={contactForm.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="helpRequest">How can we help?</label>
              <textarea
                id="helpRequest"
                name="helpRequest"
                value={contactForm.helpRequest}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Help & Support Chat */}
      {helpChatVisible && (
        <div className="help-chatbox">
          <div className="chat-header">
            <h3>Help & Support Chat</h3>
            <button onClick={toggleHelpChat} className="close-chat">X</button>
          </div>
          <div className="chat-box">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.user ? "user" : "bot"}`}
              >
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={handleUserInputChange}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}

      {/* About Us Section */}
      {showAboutUs && (
        <div className="about-us">
          <h2>About Us</h2>
          <p>
            We are a leading company in the tech industry, providing innovative solutions to help businesses succeed.
            Founded in 2010, we have been serving clients worldwide with a commitment to excellence. Our team of experts
            is dedicated to creating high-quality products and services.
          </p>
          <h3>Company History</h3>
          <p>
            Our journey began in 2010 when we started with a small team of passionate individuals. Over the years, we
            have grown exponentially and established a global presence. Today, we continue to push the boundaries of
            technology to deliver cutting-edge solutions.
          </p>
          <h3>Our Assets</h3>
          <p>
            Our company prides itself on a wide range of technological assets, including state-of-the-art development
            platforms, highly skilled personnel, and partnerships with industry leaders.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
