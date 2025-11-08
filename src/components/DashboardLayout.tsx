import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Users, CreditCard, FileText, ShieldCheck, 
  Menu, X, LogOut, Moon, Sun, Activity 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import logo from '@/assets/dental_logo.svg';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/com', icon: Home, roles: ['com'] },
  { name: 'Cashier Portal', href: '/cashier', icon: Users, roles: ['com'] },
  { name: 'Finance Portal', href: '/finance', icon: CreditCard, roles: ['com'] },
  { name: 'Accounts Portal', href: '/accounts', icon: FileText, roles: ['com'] },
  { name: 'Insurance Portal', href: '/insurance', icon: ShieldCheck, roles: ['com'] },
  { name: 'Dashboard', href: '/cashier', icon: Home, roles: ['cashier'] },
  { name: 'Patients', href: '/cashier/patients', icon: Users, roles: ['cashier'] },
  { name: 'Services', href: '/cashier/services', icon: Activity, roles: ['cashier'] },
  { name: 'Dashboard', href: '/finance', icon: Home, roles: ['finance'] },
  { name: 'Payments', href: '/finance/payments', icon: CreditCard, roles: ['finance'] },
  { name: 'Verification', href: '/finance/verification', icon: FileText, roles: ['finance'] },
  { name: 'Dashboard', href: '/accounts', icon: Home, roles: ['accounts'] },
  { name: 'Reports', href: '/accounts/reports', icon: FileText, roles: ['accounts'] },
  { name: 'Reconciliation', href: '/accounts/reconciliation', icon: CreditCard, roles: ['accounts'] },
  { name: 'Dashboard', href: '/insurance', icon: Home, roles: ['insurance'] },
  { name: 'Claims', href: '/insurance/claims', icon: ShieldCheck, roles: ['insurance'] },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const userNavigation = navigation.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 px-6 border-b border-border">
            <img src={logo} alt="Dental MIS" className="h-10 w-10" />
            <div>
              <h1 className="text-lg font-bold text-primary">Dental MIS</h1>
              <p className="text-xs text-muted-foreground capitalize">{user?.role} Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {userNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="flex-1"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex-1"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur px-4 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {userNavigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <span>Welcome,</span>
              <span className="font-medium text-foreground">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
