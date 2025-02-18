import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { data } = await axios.get('http://localhost:4455/api/protected', { withCredentials: true });
        setUser(data.userId);
      } catch (error) {
        setUser(null);
      }
      setIsLoading(false);
    };
    checkLogin();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await axios.post('http://localhost:4455/api/login', { email, password }, { withCredentials: true });
      setUser(email);
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      await axios.post('http://localhost:4455/api/register', { email, password }, { withCredentials: true });
      setUser(email);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    await axios.post('http://localhost:4455/api/logout', {}, { withCredentials: true });
    setUser(null);
  };

  const value: AuthContextType = { user, login, logout, register, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};