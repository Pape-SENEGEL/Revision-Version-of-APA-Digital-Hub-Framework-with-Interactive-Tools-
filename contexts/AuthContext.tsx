import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, UserProfile, UserCredentials, SignUpData } from '../types';
import { ROUTES, MOCK_USERS_DB } from '../constants';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading true
  const navigate = useNavigate();

  useEffect(() => {
    // Check for persisted login state (e.g., from localStorage)
    const storedUser = localStorage.getItem('apaUser');
    if (storedUser) {
      try {
        const parsedUser: UserProfile = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem('apaUser');
      }
    }
    setIsLoading(false); // Finished initial loading
  }, []);

  const signIn = async (credentials: UserCredentials): Promise<void> => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS_DB.find(u => u.email === credentials.email);
        // In a real app, you'd also check the password here against a hashed version.
        // For this mock, we'll just find by email.
        if (foundUser) {
          setUser(foundUser);
          setIsAuthenticated(true);
          localStorage.setItem('apaUser', JSON.stringify(foundUser));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate API delay
    });
  };

  const signUp = async (data: SignUpData): Promise<void> => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (MOCK_USERS_DB.find(u => u.email === data.email)) {
          setIsLoading(false);
          reject(new Error('User already exists with this email.'));
          return;
        }
        const newUser: UserProfile = {
          id: `user-${Date.now()}`,
          name: data.name,
          email: data.email,
          userType: data.userType,
          history: [],
          applications: [],
          bookmarkedResourceIds: [],
        };
        MOCK_USERS_DB.push(newUser); // Add to our mock DB
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('apaUser', JSON.stringify(newUser));
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('apaUser');
    navigate(ROUTES.HOME); // Or ROUTES.SIGN_IN
  };
  
  const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<void> => {
    // This is a mock function, no real API call
    if (user) {
        const updatedUser = { ...user, ...profileData };
        setUser(updatedUser);
        localStorage.setItem('apaUser', JSON.stringify(updatedUser));
        
        // Update in mock DB as well
        const userIndex = MOCK_USERS_DB.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            MOCK_USERS_DB[userIndex] = updatedUser;
        }
    } else {
        throw new Error("No user to update.");
    }
  };

  const toggleBookmark = (resourceId: string) => {
    if (!user) return;

    const currentBookmarks = user.bookmarkedResourceIds || [];
    const isBookmarked = currentBookmarks.includes(resourceId);
    const newBookmarks = isBookmarked
      ? currentBookmarks.filter(id => id !== resourceId)
      : [...currentBookmarks, resourceId];

    const updatedUser: UserProfile = {
        ...user,
        bookmarkedResourceIds: newBookmarks
    };

    setUser(updatedUser);
    localStorage.setItem('apaUser', JSON.stringify(updatedUser));

    // Also update the mock database for persistence across sessions
    const userIndex = MOCK_USERS_DB.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        MOCK_USERS_DB[userIndex].bookmarkedResourceIds = newBookmarks;
    }
  };


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, signIn, signUp, signOut, updateUserProfile, toggleBookmark }}>
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
