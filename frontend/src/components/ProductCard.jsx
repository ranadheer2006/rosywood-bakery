import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass rounded-2xl overflow-hidden group shadow-lg flex flex-col h-full border border-primary-dark border-opacity-20"
    >
      <Link to={`/product/${product._id}`} className="relative overflow-hidden block h-64">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-accent-color transition-colors"><Heart className="w-5 h-5" /></button>
        </div>
        {product.isFeatured && (
          <div className="absolute top-4 left-4 bg-accent-color text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Best Seller
          </div>
        )}
      </Link>

      <div className="p-6 flex flex-col flex-grow gap-3">
        <div className="flex justify-between items-center text-sm font-semibold text-accent-color tracking-wide">
          {product.category}
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product._id}`} className="text-xl font-bold hover:text-accent-color transition-colors line-clamp-1">
          {product.name}
        </Link>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-accent-color">₹{product.price.toLocaleString('en-IN')}</span>
          <button 
            onClick={handleAddToCart}
            className="p-3 bg-primary-color hover:bg-accent-color hover:text-white rounded-xl transition-all shadow-md group-hover:shadow-lg"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
