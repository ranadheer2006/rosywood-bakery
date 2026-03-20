import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-color bg-opacity-30 pt-16 pb-8 border-t border-primary-dark mt-20">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6">
          <Link to="/" className="text-3xl font-bold">
            <span className="text-accent-color">Rosy</span>wood
          </Link>
          <p className="text-gray-600">
            Crafting artisan cakes and pastries with love since 2010. Experience the sweetness of life at Rosywood Bakery.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white rounded-full shadow-md hover:text-accent-color transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="p-2 bg-white rounded-full shadow-md hover:text-accent-color transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="p-2 bg-white rounded-full shadow-md hover:text-accent-color transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-xl font-bold border-b-2 border-accent-color inline-block pb-2 w-max">Quick Links</h4>
          <ul className="flex flex-col gap-3">
            <li><Link to="/" className="hover:text-accent-color transition-colors">Home</Link></li>
            <li><Link to="/menu" className="hover:text-accent-color transition-colors">Our Menu</Link></li>
            <li><Link to="/about" className="hover:text-accent-color transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-accent-color transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-xl font-bold border-b-2 border-accent-color inline-block pb-2 w-max">Categories</h4>
          <ul className="flex flex-col gap-3">
            <li><Link to="/menu?category=Cakes" className="hover:text-accent-color transition-colors">Premium Cakes</Link></li>
            <li><Link to="/menu?category=Pastries" className="hover:text-accent-color transition-colors">French Pastries</Link></li>
            <li><Link to="/menu?category=Breads" className="hover:text-accent-color transition-colors">Artisan Breads</Link></li>
            <li><Link to="/menu?category=Cookies" className="hover:text-accent-color transition-colors">Handmade Cookies</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-xl font-bold border-b-2 border-accent-color inline-block pb-2 w-max">Contact Info</h4>
          <ul className="flex flex-col gap-4 text-gray-600">
            <li className="flex gap-3"><MapPin className="w-5 h-5 text-accent-color" /> 123 Baker Street, Roseville</li>
            <li className="flex gap-3"><Phone className="w-5 h-5 text-accent-color" /> +1 (555) 123-4567</li>
            <li className="flex gap-3"><Mail className="w-5 h-5 text-accent-color" /> hello@rosywood.com</li>
          </ul>
        </div>
      </div>

      <div className="container mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Rosywood Bakery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
