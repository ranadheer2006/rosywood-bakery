import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-32 flex flex-col items-center gap-12 text-center min-h-[70vh]">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-12 bg-primary-color rounded-full shadow-2xl relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-color opacity-10 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <ShoppingBag className="w-32 h-32 text-accent-color opacity-30" />
        </motion.div>
        <div className="flex flex-col gap-4 max-w-lg">
          <h2 className="text-5xl font-extrabold text-gray-900">Your Cart is Empty</h2>
          <p className="text-gray-500 text-xl font-medium">Looks like you haven't added any delicious treats to your cart yet.</p>
        </div>
        <Link to="/menu" className="btn btn-primary px-12 py-5 text-xl font-bold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all">
          <ArrowLeft className="w-6 h-6" /> Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-20">
      <h1 className="text-5xl font-extrabold mb-16 text-center">Your <span className="text-accent-color">Sweet Basket</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <AnimatePresence mode='popLayout'>
            {cartItems.map((item) => (
              <motion.div 
                layout
                key={item.product}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-8 border border-primary-dark border-opacity-10 shadow-lg group"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="flex-grow flex flex-col gap-2 text-center sm:text-left">
                  <span className="text-accent-color font-bold text-sm tracking-widest uppercase">{item.category}</span>
                  <Link to={`/product/${item.product}`} className="text-2xl font-bold hover:text-accent-color transition-colors">{item.name}</Link>
                  <p className="text-2xl font-bold text-accent-color">₹{item.price.toLocaleString('en-IN')}</p>
                </div>

                <div className="flex items-center gap-6 bg-white rounded-2xl p-2 border border-gray-100 shadow-sm">
                  <button 
                    onClick={() => updateQty(item.product, Math.max(1, item.qty - 1))}
                    className="p-3 hover:bg-primary-color rounded-xl transition-colors text-accent-color"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-extrabold w-8 text-center">{item.qty}</span>
                  <button 
                    onClick={() => updateQty(item.product, item.qty + 1)}
                    className="p-3 hover:bg-primary-color rounded-xl transition-colors text-accent-color"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button 
                  onClick={() => {
                    removeFromCart(item.product);
                    toast.success(`${item.name} removed from cart`);
                  }}
                  className="p-4 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex justify-between items-center mt-4">
            <Link to="/menu" className="text-accent-color font-bold flex items-center gap-2 hover:gap-4 transition-all">
              <ArrowLeft className="w-5 h-5" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-10 rounded-[40px] border border-primary-dark border-opacity-20 shadow-2xl flex flex-col gap-10"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-primary-color pb-4">Order Summary</h2>
            
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center text-lg font-medium text-gray-600">
                <span>Items ({cartItems.reduce((a, c) => a + c.qty, 0)})</span>
                <span className="font-bold text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-medium text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between items-center text-lg font-medium text-gray-600">
                <span>Tax (10%)</span>
                <span className="font-bold text-gray-900">₹{(cartTotal * 0.1).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="border-t-2 border-primary-color pt-8 flex justify-between items-center">
              <span className="text-2xl font-extrabold text-gray-900">Total</span>
              <span className="text-4xl font-extrabold text-accent-color">₹{(cartTotal * 1.1).toLocaleString('en-IN')}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="btn btn-primary w-full py-6 text-xl font-bold flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transition-all group"
            >
              Checkout Now <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>

            <div className="flex flex-col items-center gap-4 text-gray-400 font-medium">
              <p className="text-sm">Guaranteed Safe Checkout</p>
              <div className="flex gap-4 grayscale opacity-50">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
