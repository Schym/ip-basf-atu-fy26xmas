import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, ChevronRight, LogOut } from 'lucide-react';

interface EventPageProps {
  onLogout: () => void;
}

export default function EventPage({ onLogout }: EventPageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const eventDate = new Date('2025-12-20T14:00:00');
  const daysUntil = Math.ceil((eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const speakers = [
    { name: 'Sarah Johnson', title: 'Chief Technology Officer', color: 'from-blue-400 to-blue-600' },
    { name: 'Michael Chen', title: 'VP of Innovation', color: 'from-purple-400 to-purple-600' },
    { name: 'Emma Rodriguez', title: 'Director of Strategy', color: 'from-pink-400 to-pink-600' },
    { name: 'James Wilson', title: 'Head of Operations', color: 'from-orange-400 to-orange-600' },
  ];

  const agenda = [
    { time: '2:00 PM', title: 'Welcome & Opening Remarks', duration: '15 min' },
    { time: '2:15 PM', title: 'Year in Review - Chemicals Division', duration: '20 min' },
    { time: '2:35 PM', title: 'Year in Review - Energy Division', duration: '20 min' },
    { time: '2:55 PM', title: 'Break', duration: '10 min' },
    { time: '3:05 PM', title: 'Team Highlights & Achievements', duration: '20 min' },
    { time: '3:25 PM', title: 'Q&A Session', duration: '20 min' },
    { time: '3:45 PM', title: 'Closing Remarks & Networking', duration: '15 min' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-light text-gray-900">
              Chemicals & Energy
              <span className="block text-xs text-gray-500 font-light">CY26 Year End Call</span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors font-light text-sm"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-start">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-block">
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-xs font-light">
                Team BASF Annual Celebration
              </span>
            </div>
            
            <h1 className="text-6xl font-light text-white leading-tight">
              Chemicals & Energy CY26
              <span className="block text-blue-300">Year End Call</span>
            </h1>
            
            <p className="text-xl text-gray-300 font-light max-w-lg">
              Join us for a celebration of our achievements and recognition of Team BASF's exceptional performance across Chemicals and Energy divisions.
            </p>

            {/* Event Info Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <Calendar size={20} className="text-blue-300" />
                <div>
                  <p className="text-xs text-gray-400 font-light">Date</p>
                  <p className="text-sm text-white font-light">December 20, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <Clock size={20} className="text-blue-300" />
                <div>
                  <p className="text-xs text-gray-400 font-light">Time</p>
                  <p className="text-sm text-white font-light">2:00 PM CET</p>
                </div>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-light transition-colors mt-4">
              Add to Calendar
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 bg-white border-b border-gray-200/50 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {['overview', 'speakers', 'agenda'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 font-light text-sm transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-blue-600 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200/50">
                <p className="text-4xl font-light text-blue-900">{daysUntil}</p>
                <p className="text-sm text-blue-600 font-light mt-2">Days Until Event</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl border border-green-200/50">
                <Users size={24} className="text-green-700 mb-2" />
                <p className="text-sm text-green-600 font-light">500+ Attendees Expected</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-200/50">
                <MapPin size={24} className="text-purple-700 mb-2" />
                <p className="text-sm text-purple-600 font-light">Virtual + In-Person</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-4">About This Event</h2>
                <p className="text-gray-600 font-light leading-relaxed text-lg">
                  This is our premier celebration of Team BASF's remarkable achievements in CY26. We've faced unprecedented challenges and emerged stronger than ever, with record-breaking performance across our Chemicals and Energy divisions. Join us as we celebrate our collective success and the exceptional individuals who made it possible.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-light text-gray-900 mb-3">What to Expect</h3>
                  <ul className="space-y-3">
                    {[
                      'Recognition of outstanding achievements',
                      'Insights on our strategic direction',
                      'Interactive Q&A sessions',
                      'Networking opportunities',
                      'Special entertainment',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-600 font-light">
                        <span className="text-blue-600 mt-1">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-light text-gray-900 mb-3">Access Requirements</h3>
                  <ul className="space-y-3">
                    {[
                      'Valid BASF employee credentials',
                      'Stable internet connection',
                      'Video camera recommended',
                      'Calendar reminder set',
                      'Time zone: CET / UTC+1',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-600 font-light">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Speakers Tab */}
        {activeTab === 'speakers' && (
          <div className="space-y-12 animate-fadeIn">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">Featured Speakers</h2>
              <p className="text-gray-600 font-light text-lg">
                Meet the leaders who will share insights and celebrate our achievements
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {speakers.map((speaker, idx) => (
                <div
                  key={idx}
                  className="group cursor-pointer"
                >
                  <div className={`h-64 bg-gradient-to-br ${speaker.color} rounded-2xl mb-4 flex items-center justify-center overflow-hidden relative`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                    <div className="text-center relative z-10">
                      <div className="text-6xl font-light text-white/80 mb-2">
                        {speaker.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="text-white/70 font-light text-sm">{speaker.name}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-light text-gray-900 group-hover:text-blue-600 transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-light">{speaker.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agenda Tab */}
        {activeTab === 'agenda' && (
          <div className="space-y-12 animate-fadeIn">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">Event Agenda</h2>
              <p className="text-gray-600 font-light text-lg">
                Saturday, December 20, 2025 - EST / 2:00 PM CET
              </p>
            </div>

            <div className="space-y-3">
              {agenda.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 p-6 bg-gray-50 hover:bg-blue-50/50 rounded-xl transition-colors group cursor-pointer border border-gray-200/50 hover:border-blue-200/50"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-sm font-light text-gray-600 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                      {item.time}
                    </div>
                    {idx < agenda.length - 1 && (
                      <div className="w-0.5 h-12 bg-gradient-to-b from-gray-300 to-transparent" />
                    )}
                  </div>
                  <div className="flex-1 py-2">
                    <h3 className="text-lg font-light text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-light mt-1">Duration: {item.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 bg-gray-50/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-light text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">BASF.com</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-light text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">Help Center</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-light text-gray-900 mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">Twitter</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200/50 pt-8 flex justify-between items-center">
            <p className="text-xs text-gray-500 font-light">
              © 2025 BASF. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 font-light">
              Made with Apple Design Principles
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
