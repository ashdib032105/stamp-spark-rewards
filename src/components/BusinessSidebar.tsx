
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Award,
  QrCode,
  Settings,
  ChevronRight,
  ChevronLeft,
  User,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BusinessSidebar({ collapsed, setCollapsed }: SidebarProps) {
  const location = useLocation();
  const { permissions, logout, user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    {
      title: 'Dashboard',
      href: '/business/dashboard',
      icon: LayoutDashboard,
      permitted: permissions.dashboard,
    },
    {
      title: 'Customers',
      href: '/business/customers',
      icon: Users,
      permitted: permissions.customers,
    },
    {
      title: 'Cashiers',
      href: '/business/cashiers',
      icon: User,
      permitted: permissions.cashiers,
    },
    {
      title: 'Rewards',
      href: '/business/rewards',
      icon: Award,
      permitted: permissions.rewards,
    },
    {
      title: 'QR Code',
      href: '/business/qr-code',
      icon: QrCode,
      permitted: permissions.qrCode,
    },
    {
      title: 'Settings',
      href: '/business/settings',
      icon: Settings,
      permitted: permissions.settings,
    },
  ];

  // Filter items based on permissions
  const permittedItems = navItems.filter(item => item.permitted);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-white border-r shadow-sm transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!collapsed && <span className="text-xl font-bold text-brand-purple">StampSpark</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {permittedItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center px-2 py-3 rounded-lg transition-colors',
                location.pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              )}
            >
              <item.icon className={cn('h-5 w-5', collapsed ? 'mx-auto' : 'mr-3')} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {!collapsed ? (
        <div className="p-4 border-t">
          <div className="text-sm text-muted-foreground mb-2">
            <p>Logged in as</p>
            <p className="font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground mt-1">Role: {user?.role}</p>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>
      ) : (
        <div className="p-2 border-t">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleLogout}
            className="w-full h-10 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
