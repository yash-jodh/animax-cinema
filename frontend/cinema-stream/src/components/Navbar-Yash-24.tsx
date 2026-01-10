import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'TV Shows', path: '/tv-shows' },
  { label: 'Movies', path: '/movies' },
  { label: 'My List', path: '/my-list' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if user is logged in
  const token = localStorage.getItem('token');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the session
    navigate('/'); 
    window.location.reload(); // Refresh to update UI states
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-background/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-primary tracking-tight">ANIMAX</h1>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${location.pathname === item.path ? 'nav-link-active' : 'nav-link'} text-sm lg:text-base`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {token ? (
              // UI for Logged In User
              <div className="flex items-center space-x-4">
                {/* <button className="hidden sm:block p-2 text-muted-foreground hover:text-foreground">
                  <Bell className="w-5 h-5" />
                </button> */}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              // UI for Guest
              <Link to="/auth" className="btn-primary py-1.5 px-5 text-sm">
                Sign In
              </Link>
            )}
            
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-muted-foreground">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};