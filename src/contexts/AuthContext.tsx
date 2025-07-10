import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserProfile } from '../services/api';
import { ProjectIdea } from '../types';
// import { getUserProfile } from '../services/api';

interface User {
  id: string;
  username: string;
  email: string;
  photo?: string;
  bio?: string;
  dateJoined?: Date;
  followers?: unknown[];
  following?: unknown[];
  links?: string[];
  ideasPosted?: ProjectIdea[];
  saveIdeas?: ProjectIdea[];
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchUserProfile() {
      const user = await getUserProfile();
      setUser(user);
      setIsLoading(false);
    }
    fetchUserProfile();
  }, [isLoading]);


  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};