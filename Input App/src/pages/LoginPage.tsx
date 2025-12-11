import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Microsoft Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-1 text-3xl font-light">
              <span className="text-blue-500">■</span>
              <span className="text-green-500">■</span>
              <span className="text-yellow-500">■</span>
              <span className="text-red-500">■</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-light text-gray-900 mb-2">Sign in</h1>
          <p className="text-sm text-gray-500 font-light">to your Microsoft account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-base font-light"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-base font-light"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-light text-base hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-gray-600 font-light">
            <button type="button" className="text-blue-600 hover:underline">
              Can't access your account?
            </button>
          </p>
          <p className="text-sm text-gray-600 font-light">
            <button type="button" className="text-blue-600 hover:underline">
              Create one!
            </button>
          </p>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center font-light">
            © 2025 Microsoft Corporation
          </p>
        </div>
      </div>
    </div>
  );
}
