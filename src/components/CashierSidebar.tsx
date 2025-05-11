
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Award,
  Search,
  ChevronRight,
  ChevronLeft,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
  {
    title: 'Dashboard',
    href: '/cashier/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Find Customer',
    href: '/cashier/find-customer',
    icon: Search,
  },
  {
    title: 'Recent Customers',
    href: '/cashier/recent-customers',
    icon: Users,
  },
  {
    title: 'Rewards Catalog',
    href: '/cashier/rewards',
    icon: Award,
  },
];

export function CashierSidebar({ collapsed, setCollapsed }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
        {!collapsed && <span className="text-xl font-bold text-brand-purple">RewardCard</span>}
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
          {navItems.map((item) => (
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
