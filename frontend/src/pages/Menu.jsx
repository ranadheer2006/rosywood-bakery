import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Cakes', 'Pastries', 'Breads', 'Cookies', 'Cupcakes'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [category, searchTerm, sortBy, products]);

  return (
    <div className="container py-20 min-h-screen">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold">Our <span className="text-accent-color">Signature</span> Menu</h1>
          <p className="text-gray-500 max-w-2xl text-lg">Browse our collection of over 20 artisan creations, handcrafted daily with the finest ingredients.</p>
        </div>

        {/* Filters and Search */}
        <div className="glass p-8 rounded-[30px] flex flex-col lg:flex-row gap-8 items-center justify-between border border-primary-dark border-opacity-10 shadow-xl">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-8 py-3 rounded-full font-bold transition-all ${
                  category === cat 
                    ? 'bg-accent-color text-white shadow-lg scale-105' 
                    : 'bg-primary-color bg-opacity-30 hover:bg-opacity-100 text-accent-color'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-max">
            <div className="relative group flex-grow sm:w-64">
              <input 
                type="text" 
                placeholder="Search treats..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-100 bg-white outline-none focus:border-accent-color transition-all shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-accent-color" />
            </div>

            <div className="relative group sm:w-48">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none pl-6 pr-12 py-4 rounded-full border border-gray-100 bg-white outline-none focus:border-accent-color transition-all shadow-sm font-semibold text-gray-700"
              >
                <option value="newest">Sort By: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-40">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-accent-color"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            <div className="flex justify-between items-center px-4">
              <p className="text-gray-500 font-medium">Showing <span className="text-accent-color font-bold">{filteredProducts.length}</span> delicious items</p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-40 flex flex-col items-center gap-6">
                <div className="p-8 bg-primary-color rounded-full"><ShoppingBag className="w-20 h-20 text-accent-color opacity-30" /></div>
                <h3 className="text-3xl font-bold">No treats found</h3>
                <p className="text-gray-500 text-lg">Try adjusting your filters or search term to find what you're looking for.</p>
                <button 
                  onClick={() => { setCategory('All'); setSearchTerm(''); }}
                  className="btn btn-primary mt-4 px-10 py-4"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                <AnimatePresence mode='popLayout'>
                  {filteredProducts.map(product => (
                    <motion.div
                      layout
                      key={product._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
