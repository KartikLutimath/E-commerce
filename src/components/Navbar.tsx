
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, login, logout } = useAuth();
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "blur-backdrop py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-medium tracking-tight"
          onClick={closeMobileMenu}
        >
          Ganesh
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Products
          </Link>
          <Link to="/collections" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Collections
          </Link>
          <Link to="/about" className="text-sm font-medium hover:opacity-70 transition-opacity">
            About
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <div className="relative group">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Account
                </Link>
                <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Orders
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="secondary" size="sm" className="rounded-full px-4">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 z-50 bg-white transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <Link 
                to="/" 
                className="text-2xl font-medium tracking-tight"
                onClick={closeMobileMenu}
              >
                Ganesh
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex flex-col space-y-6 text-lg">
              <Link 
                to="/" 
                className="hover:opacity-70 transition-opacity"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="hover:opacity-70 transition-opacity"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
              <Link 
                to="/collections" 
                className="hover:opacity-70 transition-opacity"
                onClick={closeMobileMenu}
              >
                Collections
              </Link>
              <Link 
                to="/about" 
                className="hover:opacity-70 transition-opacity"
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </nav>

            <div className="mt-auto flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <Link 
                  to="/cart" 
                  className="flex items-center space-x-2"
                  onClick={closeMobileMenu}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart ({items.length})</span>
                </Link>
                {isAuthenticated ? (
                  <Button variant="ghost" onClick={logout}>
                    Sign out
                  </Button>
                ) : (
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-2"
                    onClick={closeMobileMenu}
                  >
                    <User className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
