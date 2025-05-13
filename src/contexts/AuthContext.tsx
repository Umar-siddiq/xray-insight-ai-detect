
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
interface User {
  id: string;
  email: string;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string, companyName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for demo purposes
const mockUsers: User[] = [
  { id: '1', email: 'demo@example.com', fullName: 'Demo User' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage (simulating persistent auth)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in our mock database
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser) {
        // In a real app, you would verify the password here
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        navigate('/dashboard');
      } else {
        // Add the email to our mock database for demo purposes
        const newUser = { id: String(mockUsers.length + 1), email };
        mockUsers.push(newUser);
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (fullName: string, email: string, password: string, companyName: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email);
      
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser = {
        id: String(mockUsers.length + 1),
        email,
        fullName
      };
      
      mockUsers.push(newUser);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
