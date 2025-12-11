import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import EventPage from './pages/EventPage';

type AppPage = 'login' | 'event';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('login');

  const handleLoginSuccess = () => {
    setCurrentPage('event');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  return (
    <div className="w-full h-full">
      {currentPage === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'event' && <EventPage onLogout={handleLogout} />}
    </div>
  );
}
