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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
  {
    title: 'Dashboard',
    href: '/business/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Customers',
    href: '/business/customers',
    icon: Users,
  },
  {
    title: 'Cashiers',
    href: '/business/cashiers',
    icon: User,
  },
  {
    title: 'Rewards',
    href: '/business/rewards',
    icon: Award,
  },
  {
    title: 'QR Code',
    href: '/business/qr-code',
    icon: QrCode,
  },
  {
    title: 'Settings',
    href: '/business/settings',
    icon: Settings,
  },
];

export function BusinessSidebar({ collapsed, setCollapsed }: SidebarProps) {
  const location = useLocation();

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

      {!collapsed && (
        <div className="p-4 border-t">
          <div className="text-sm text-muted-foreground">
            <p>Business Account</p>
            <p className="font-medium text-foreground">My Coffee Shop</p>
          </div>
        </div>
      )}
    </div>
  );
}
