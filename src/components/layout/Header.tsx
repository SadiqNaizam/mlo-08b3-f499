import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { HeartPulse, Menu, User, Settings, LogOut } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Appointments', href: '/appointments' },
  { label: 'Prescriptions', href: '/prescriptions' },
  { label: 'Medical Records', href: '/medical-records' },
];

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-lg">HealthPal</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink key={item.href} to={item.href} className={navLinkClasses}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium mt-6">
                    {navItems.map((item) => (
                        <SheetClose asChild key={item.href}>
                            <NavLink to={item.href} className={({ isActive }) => `flex items-center gap-4 px-2.5 ${isActive ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground`}>
                                {item.label}
                            </NavLink>
                        </SheetClose>
                    ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;