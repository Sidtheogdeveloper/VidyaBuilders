import React, { useState } from 'react';
import { User, Mail, Lock, Calendar, Bell, Settings, Eye, EyeOff, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAppointments } from '../hooks/useAppointments';

interface UserPortalProps {
  onNavigate: (page: string) => void;
}

const UserPortal: React.FC<UserPortalProps> = ({ onNavigate }) => {
  const { user, loading, error, signUp, signIn, signOut, updatePreferences } = useAuth();
  const { appointments, createAppointment, cancelAppointment } = useAppointments(user?.id);
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [authLoading, setAuthLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    signIn(loginData.email, loginData.password)
      .then(() => {
        setLoginData({ email: '', password: '' });
      })
      .catch((err) => {
        console.error('Login failed:', err);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setAuthLoading(true);
    signUp(signupData.email, signupData.password, signupData.name, signupData.phone)
      .then(() => {
        setSignupData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
      })
      .catch((err) => {
        console.error('Signup failed:', err);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  const handlePreferenceChange = (key: keyof typeof user.preferences) => {
    if (!user) return;
    
    const newPreferences = {
      ...user.preferences,
      [key]: !user.preferences[key]
    };
    
    updatePreferences(newPreferences).catch((err) => {
      console.error('Failed to update preferences:', err);
    });
  };

  const handleCancelAppointment = (appointmentId: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointment(appointmentId).catch((err) => {
        console.error('Failed to cancel appointment:', err);
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded max-w-md mx-auto">
              {error}
              <button 
                onClick={() => window.location.reload()} 
                className="block mt-2 text-sm underline hover:no-underline"
              >
                Refresh Page
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Join Vidya Builders'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Create your account today'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3 px-6 rounded-lg font-semibold transition-all"
              >
                {authLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={signupData.name}
                    onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={signupData.phone}
                    onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupData.password}
                    onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3 px-6 rounded-lg font-semibold transition-all"
              >
                {authLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-amber-600 hover:text-amber-700 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <>
    <>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">Manage your account and track your journey with Vidya Builders</p>
            </div>
            <button
              onClick={signOut}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <User size={20} className="text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-600">Full Name</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail size={20} className="text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-600">Email Address</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone size={20} className="text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{user.phone}</div>
                    <div className="text-sm text-gray-600">Phone Number</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell size={20} className="text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Newsletter</div>
                      <div className="text-sm text-gray-600">Weekly updates and news</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('newsletter')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      user.preferences.newsletter ? 'bg-amber-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        user.preferences.newsletter ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Settings size={20} className="text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Promotions</div>
                      <div className="text-sm text-gray-600">Special offers and deals</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('promotions')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      user.preferences.promotions ? 'bg-amber-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        user.preferences.promotions ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin size={20} className="text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Project Updates</div>
                      <div className="text-sm text-gray-600">Construction progress</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('projectUpdates')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      user.preferences.projectUpdates ? 'bg-amber-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        user.preferences.projectUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments and Activity */}
          <div className="lg:col-span-2">
            {/* Appointments */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Appointments</h2>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Book New Appointment
                </button>
              </div>
              
              {appointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No appointments scheduled yet.</p>
                  <p className="text-sm text-gray-400 mt-2">Book your first appointment to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Calendar size={20} className="text-gray-400 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </div>
                            <div className="text-sm text-gray-600">
                              {appointment.type === 'video' ? 'Video Call' : 'Office Visit'}
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          appointment.status === 'scheduled' 
                            ? 'bg-blue-100 text-blue-800'
                            : appointment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      {appointment.status === 'scheduled' && (
                        <div className="flex space-x-2 mt-3">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Reschedule
                          </button>
                          <button 
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended Projects */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended for You</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <img
                    src="https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg"
                    alt="Vidya Elite Towers"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Vidya Elite Towers</h3>
                    <p className="text-sm text-gray-600 mb-2">OMR, Chennai</p>
                    <p className="text-lg font-bold text-amber-700">₹1.1 Crores onwards</p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <img
                    src="https://images.pexels.com/photos/1396123/pexels-photo-1396123.jpeg"
                    alt="Vidya Garden Homes"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Vidya Garden Homes</h3>
                    <p className="text-sm text-gray-600 mb-2">Tambaram, Chennai</p>
                    <p className="text-lg font-bold text-amber-700">₹1.8 Crores onwards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    </>
    </>
  );
};

export default UserPortal;