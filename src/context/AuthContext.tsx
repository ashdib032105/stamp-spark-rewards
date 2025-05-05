
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'customer' | 'business';

interface User {
  id: string;
  name: string;
  role: UserRole;
  phone?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (userData: User) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  // Check if user is authenticated
  const isAuthenticated = user !== null;

  // Login function
  const login = (userData: User) => {
    setUser(userData);
    setRole(userData.role);
    console.log(`Logged in as ${userData.name} with role ${userData.role}`);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setRole(null);
    console.log('Logged out');
  };

  // Switch role function
  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      role: newRole
    };
    
    setUser(updatedUser);
    setRole(newRole);
    console.log(`Switched role to ${newRole}`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        role,
        login,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
