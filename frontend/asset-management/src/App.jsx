import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Maintainence from './components/Maintainence';
import Dashboard from './components/Dashboard';
import Assets from './components/Assets';
import Dealers from './components/Dealers';
import Transactions from './components/Transactions';
import Contact from './components/Contact'; 
import Aboutus from './components/AboutUs';
import LoginPage from './Login';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const expiresAt = localStorage.getItem("expiresAt");
    const isExpired = expiresAt && new Date().getTime() > parseInt(expiresAt);
    const isAuthenticated = localStorage.getItem("isAdminLoggedIn") === "true" && !isExpired;
    
    if (!isAuthenticated) {
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("expiresAt");
      return <Navigate to="/login" />;
    }
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected Routes */}
                <Route path='/' element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path='/assets' element={
                    <ProtectedRoute>
                        <Assets />
                    </ProtectedRoute>
                } />
                <Route path='/dealers' element={
                    <ProtectedRoute>
                        <Dealers />
                    </ProtectedRoute>
                } />
                <Route path='/maintainence' element={
                    <ProtectedRoute>
                        <Maintainence />
                    </ProtectedRoute>
                } />
                <Route path='/transactions' element={
                    <ProtectedRoute>
                        <Transactions />
                    </ProtectedRoute>
                } />
                <Route path='/contact' element={
                    <ProtectedRoute>
                        <Contact />
                    </ProtectedRoute>
                } />
                <Route path='/aboutus' element={
                    <ProtectedRoute>
                        <Aboutus/>
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;