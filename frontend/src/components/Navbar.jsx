import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu as MenuIcon, Search } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-50 py-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="text-accent-color">Rosy</span>wood
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-accent-color transition-colors">Home</Link>
          <Link to="/menu" className="hover:text-accent-color transition-colors">Menu</Link>
          <Link to="/about" className="hover:text-accent-color transition-colors">About</Link>
          <Link to="/contact" className="hover:text-accent-color transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative group hidden sm:block">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-primary-color bg-opacity-30 rounded-full py-1 px-4 outline-none w-40 focus:w-60 transition-all duration-300 border border-transparent focus:border-accent-color"
            />
            <Search className="absolute right-3 top-1.5 w-4 h-4 text-gray-500" />
          </div>

          <Link to="/cart" className="relative p-2 hover:bg-primary-color rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-color text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link to={user.role === 'admin' ? '/admin' : '/profile'} className="flex items-center gap-2 hover:text-accent-color transition-colors">
                <User className="w-6 h-6" />
                <span className="hidden sm:inline font-medium">{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={handleLogout} className="p-2 hover:bg-primary-color rounded-full transition-colors">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary text-sm py-2">
              Login
            </Link>
          )}

          <button className="md:hidden p-2">
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
