import React from 'react';
import { Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
// import { googleSignIn } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleGoogleLogin = async () => {
    window.location.href = 'https://tagmyidea.el.r.appspot.com/auth/google';
    // console.log('Google Sign-In Response:', response);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log('URL Params:', urlParams.toString());
    const decodedToken = token ? decodeURIComponent(token) : null;
    console.log('Token:', decodedToken);
    if (decodedToken) {
      localStorage.setItem('authToken', decodedToken);
      navigate('/'); 
    } else {
      console.error('Token or user data missing');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo and Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4">
              <img
                src="/image/logo.png"
                alt="Logo"
                className="w-11 h-11 rounded-full object-cover shadow-md"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to TagMyIdea
            </h1>
            <p className="text-gray-600">
              Discover and share amazing project ideas with the community
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
              <p className="text-sm text-gray-600">Share your innovative project ideas</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
              <p className="text-sm text-gray-600">Discover projects for all skill levels</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
              <p className="text-sm text-gray-600">Connect with fellow developers</p>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-xs text-gray-500 text-center mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;