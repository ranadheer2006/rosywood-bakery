import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowLeft, Plus, Minus, Heart, Share2, Clock, Truck, ShieldCheck } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
        toast.error('Product not found');
        navigate('/menu');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-accent-color"></div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <Link to="/menu" className="inline-flex items-center gap-2 text-accent-color font-bold hover:gap-4 transition-all mb-12">
        <ArrowLeft className="w-5 h-5" /> Back to Menu
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute top-8 right-8 flex flex-col gap-4">
            <button className="p-4 bg-white rounded-full shadow-lg text-gray-400 hover:text-accent-color transition-all hover:scale-110"><Heart className="w-6 h-6" /></button>
            <button className="p-4 bg-white rounded-full shadow-lg text-gray-400 hover:text-accent-color transition-all hover:scale-110"><Share2 className="w-6 h-6" /></button>
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <span className="text-accent-color font-bold tracking-widest uppercase text-sm px-4 py-1 bg-primary-color rounded-full w-max">
              {product.category}
            </span>
            <h1 className="text-5xl font-extrabold text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                ))}
                <span className="ml-2 font-bold text-yellow-700">{product.rating}</span>
              </div>
              <span className="text-gray-400 font-medium">|</span>
              <span className="text-gray-500 font-medium">120+ Reviews</span>
              <span className="text-gray-400 font-medium">|</span>
              <span className="text-green-600 font-bold">In Stock</span>
            </div>
          </div>

          <p className="text-2xl font-bold text-accent-color">₹{product.price.toLocaleString('en-IN')}</p>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="glass p-8 rounded-3xl flex flex-col gap-8 border border-primary-dark border-opacity-10 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-700 text-lg">Select Quantity</span>
              <div className="flex items-center gap-6 bg-white rounded-2xl p-2 border border-gray-100 shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-primary-color rounded-xl transition-colors text-accent-color"
                >
                  <Minus className="w-6 h-6" />
                </button>
                <span className="text-2xl font-extrabold w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-primary-color rounded-xl transition-colors text-accent-color"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary flex-grow py-5 text-xl font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all"
              >
                <ShoppingCart className="w-6 h-6" /> Add to Cart
              </button>
              <button className="btn btn-outline py-5 px-10 text-xl font-bold hover:shadow-xl transition-all">
                Buy Now
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3 text-gray-600 font-medium">
              <Clock className="w-6 h-6 text-accent-color" /> Fresh Daily
            </div>
            <div className="flex items-center gap-3 text-gray-600 font-medium">
              <Truck className="w-6 h-6 text-accent-color" /> Fast Delivery
            </div>
            <div className="flex items-center gap-3 text-gray-600 font-medium">
              <ShieldCheck className="w-6 h-6 text-accent-color" /> Secure Pay
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
