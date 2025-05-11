
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Navbar() {
  const { user, isAuthenticated, logout, role, switchRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You've been logged out of your account.",
    });
    navigate('/');
  };

  const handleSwitchRole = (newRole: 'customer' | 'business' | 'cashier') => {
    switchRole(newRole);
    toast({
      title: `Switched to ${newRole} view`,
      description: `You're now using the app as a ${newRole}.`,
    });
    
    // Redirect based on role
    if (newRole === 'business' || newRole === 'cashier') {
      navigate('/business/dashboard');
    } else {
      navigate('/customer/loyalty-card');
    }
  };

  // Determine available role options based on current user role
  const getRoleOptions = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'business':
        return ['business', 'customer'];
      case 'customer':
        return ['customer'];
      case 'cashier':
        return ['cashier', 'customer'];
      default:
        return [];
    }
  };

  const roleOptions = getRoleOptions();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-brand-purple">RewardCard</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {isAuthenticated && roleOptions.length > 1 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    Role: {role === 'business' ? 'Business' : role === 'cashier' ? 'Cashier' : 'Customer'}
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {roleOptions.includes('customer') && (
                    <DropdownMenuItem onClick={() => handleSwitchRole('customer')}>
                      Customer View
                    </DropdownMenuItem>
                  )}
                  {roleOptions.includes('business') && (
                    <DropdownMenuItem onClick={() => handleSwitchRole('business')}>
                      Business View
                    </DropdownMenuItem>
                  )}
                  {roleOptions.includes('cashier') && (
                    <DropdownMenuItem onClick={() => handleSwitchRole('cashier')}>
                      Cashier View
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {!isAuthenticated && (
              <>
                <Button asChild variant="ghost">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-3 px-2 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">Role: {role === 'business' ? 'Business' : role === 'cashier' ? 'Cashier' : 'Customer'}</p>
                </div>
              </div>
              
              {roleOptions.length > 1 && (
                <div className="space-y-1">
                  {roleOptions.includes('customer') && (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      onClick={() => handleSwitchRole('customer')}
                    >
                      Switch to Customer View
                    </Button>
                  )}
                  {roleOptions.includes('business') && (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      onClick={() => handleSwitchRole('business')}
                    >
                      Switch to Business View
                    </Button>
                  )}
                  {roleOptions.includes('cashier') && (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      onClick={() => handleSwitchRole('cashier')}
                    >
                      Switch to Cashier View
                    </Button>
                  )}
                </div>
              )}
              
              <Link to="/profile" className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-50">
                Profile
              </Link>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-800 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild className="w-full">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
