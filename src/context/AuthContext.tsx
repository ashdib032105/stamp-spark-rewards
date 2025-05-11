
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'customer' | 'business' | 'cashier';

interface User {
  id: string;
  name: string;
  role: UserRole;
  phone?: string;
  email?: string;
  businessId?: string; // To identify which business a cashier belongs to
}

interface Permission {
  customers: boolean;
  rewards: boolean;
  settings: boolean;
  qrCode: boolean;
  cashiers: boolean;
  dashboard: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  permissions: Permission;
  login: (userData: User) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const defaultPermissions: Permission = {
  customers: false,
  rewards: false,
  settings: false,
  qrCode: false,
  cashiers: false,
  dashboard: false
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  // Check if user is authenticated
  const isAuthenticated = user !== null;

  // Calculate permissions based on role
  const getPermissions = (userRole: UserRole | null): Permission => {
    if (!userRole) return defaultPermissions;
    
    switch (userRole) {
      case 'business':
        return {
          customers: true,
          rewards: true,
          settings: true,
          qrCode: true,
          cashiers: true,
          dashboard: true
        };
      case 'cashier':
        return {
          customers: true, // Cashiers need access to find/manage customers
          rewards: true,   // Cashiers need access to assign rewards
          settings: false,
          qrCode: false,
          cashiers: false,
          dashboard: true  // Limited dashboard view
        };
      default:
        return defaultPermissions;
    }
  };

  const permissions = getPermissions(role);

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
        permissions,
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
