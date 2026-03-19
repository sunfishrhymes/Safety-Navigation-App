import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddressPage from './pages/AddressPage';
import NavigationPage from './pages/NavigationPage';
import './App.css';

function App() {
  return (
    <NavigationProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/navigation" element={<NavigationPage />} />
        </Routes>
      </Router>
    </NavigationProvider>
  );
}

export default App;
