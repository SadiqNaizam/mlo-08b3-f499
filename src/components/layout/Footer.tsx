import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-blue-500" />
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} HealthPal. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4 sm:gap-6 text-sm text-muted-foreground">
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;