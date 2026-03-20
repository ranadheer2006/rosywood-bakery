import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, MapPin, CheckCircle, ArrowRight, ArrowLeft, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState({
    address: '', city: '', postalCode: '', country: 'USA'
  });
  const [paymentData, setPaymentData] = useState({
    cardName: '', cardNumber: '', expiry: '', cvc: ''
  });

  const total = cartTotal * 1.1; // Total with 10% tax

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const orderData = {
        orderItems: cartItems,
        shippingAddress: shippingData,
        paymentMethod: 'Stripe',
        totalPrice: total,
      };
      
      await axios.post('http://localhost:5000/api/orders', orderData, config);
      
      // WhatsApp Redirection
      const phoneNumber = "919000191009"; // Added 91 for India prefix
      const orderItemsText = cartItems.map(item => `• ${item.name} (${item.qty}x)`).join('%0A');
      const addressText = `${shippingData.address}, ${shippingData.city}, ${shippingData.postalCode}`;
      const message = `*New Order from Rosywood Bakery*%0A%0A*Customer:* ${user.name}%0A*Items:*%0A${orderItemsText}%0A%0A*Total:* ₹${total.toLocaleString('en-IN')}%0A*Address:* ${addressText}%0A%0APlease confirm my order.`;
      
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      
      toast.success('Order placed successfully!');
      clearCart();
      setStep(3); // Success step
      
      // Delay redirection slightly to let the success state show
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 2000);
    } catch (error) {
      toast.error('Error placing order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-20 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">Secure <span className="text-accent-color">Checkout</span></h1>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-8 md:gap-16 mt-8">
            {[
              { id: 1, label: 'Shipping', icon: <Truck /> },
              { id: 2, label: 'Payment', icon: <CreditCard /> },
              { id: 3, label: 'Success', icon: <CheckCircle /> }
            ].map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-4 relative">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all shadow-lg ${
                  step === s.id 
                    ? 'bg-accent-color text-white scale-110 shadow-pink-200' 
                    : step > s.id 
                      ? 'bg-green-500 text-white' 
                      : 'bg-primary-color bg-opacity-30 text-accent-color'
                }`}>
                  {React.cloneElement(s.icon, { className: "w-7 h-7" })}
                </div>
                <span className={`font-bold uppercase tracking-widest text-xs ${
                  step === s.id ? 'text-accent-color' : 'text-gray-400'
                }`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode='wait'>
              {step === 1 && (
                <motion.div 
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass p-12 rounded-[50px] border border-primary-dark border-opacity-20 shadow-2xl flex flex-col gap-10"
                >
                  <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-4">
                    <MapPin className="w-8 h-8 text-accent-color" /> Shipping Details
                  </h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                    <div className="flex flex-col gap-3 md:col-span-2">
                      <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest ml-4">Full Address</label>
                      <input 
                        type="text" required
                        value={shippingData.address}
                        onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                        className="px-8 py-5 rounded-3xl bg-white border border-gray-100 outline-none focus:border-accent-color shadow-sm font-bold text-lg"
                        placeholder="123 Baker Street"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest ml-4">City</label>
                      <input 
                        type="text" required
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        className="px-8 py-5 rounded-3xl bg-white border border-gray-100 outline-none focus:border-accent-color shadow-sm font-bold text-lg"
                        placeholder="Roseville"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest ml-4">Postal Code</label>
                      <input 
                        type="text" required
                        value={shippingData.postalCode}
                        onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                        className="px-8 py-5 rounded-3xl bg-white border border-gray-100 outline-none focus:border-accent-color shadow-sm font-bold text-lg"
                        placeholder="95678"
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end pt-4">
                      <button type="submit" className="btn btn-primary px-16 py-6 text-xl font-extrabold flex items-center gap-4 shadow-xl hover:shadow-2xl transition-all group">
                        Next: Payment <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass p-12 rounded-[50px] border border-primary-dark border-opacity-20 shadow-2xl flex flex-col gap-10"
                >
                  <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-4">
                    <CreditCard className="w-8 h-8 text-accent-color" /> Payment Information
                  </h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handlePlaceOrder}>
                    <div className="flex flex-col gap-3 md:col-span-2">
                      <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest ml-4">Cardholder Name</label>
                      <input 
                        type="text" required
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                        className="px-8 py-5 rounded-3xl bg-white border border-gray-100 outline-none focus:border-accent-color shadow-sm font-bold text-lg"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-3 md:col-span-2">
                      <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest ml-4">Card Number</label>
                      <div className="relative group">
                        <input 
                          type="text" required
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                          className="w-full pl-8 pr-16 py-5 rounded-3xl bg-white border border-gray-100 outline-none focus:border-accent-color shadow-sm font-bold text-lg"
                          placeholder="0000 0000 0000 0000"
                        />
                        <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest ml-4">Expiry Date</label>
                      <input 
                        type="text" required
                        value={paymentData.expiry}
                        onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                        className="px-8 py-5 rounded-3xl bg-white border border-gray-100 outline-none focus:border-accent-color shadow-sm font-bold text-lg"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest ml-4">CVC</label>
                      <input 
                        type="text" required
                        value={paymentData.cvc}
                        onChange={(e) => setPaymentData({ ...paymentData, cvc: e.target.value })}
                        className="px-8 py-5 rounded-3xl bg-white border border-gray-100 outline-none focus:border-accent-color shadow-sm font-bold text-lg"
                        placeholder="000"
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-between items-center pt-8 border-t border-gray-100 mt-4">
                      <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 text-accent-color font-bold hover:gap-4 transition-all">
                        <ArrowLeft className="w-5 h-5" /> Back to Shipping
                      </button>
                      <button type="submit" disabled={loading} className="btn btn-primary px-16 py-6 text-xl font-extrabold flex items-center gap-4 shadow-xl hover:shadow-2xl transition-all disabled:opacity-70">
                        {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : <>Place Order <CheckCircle className="w-6 h-6" /></>}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass p-20 rounded-[60px] border border-primary-dark border-opacity-20 shadow-2xl flex flex-col items-center gap-8 text-center"
                >
                  <div className="w-32 h-32 bg-green-500 rounded-[40px] flex items-center justify-center text-white shadow-xl shadow-green-100 mb-4 animate-bounce">
                    <CheckCircle className="w-16 h-16" />
                  </div>
                  <h2 className="text-5xl font-extrabold text-gray-900">Order Placed!</h2>
                  <p className="text-xl text-gray-500 font-medium max-w-lg">Thank you for your purchase. We've sent a confirmation email to <span className="text-accent-color font-bold">{user.email}</span>.</p>
                  <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <button onClick={() => navigate('/menu')} className="btn btn-primary px-12 py-5 text-xl font-extrabold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all">
                      Continue Shopping <ArrowRight className="w-6 h-6" />
                    </button>
                    <button onClick={() => navigate('/')} className="btn btn-outline px-12 py-5 text-xl font-extrabold transition-all">
                      Go to Home
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          {step < 3 && (
            <div className="lg:sticky lg:top-32">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-10 rounded-[40px] border border-primary-dark border-opacity-20 shadow-2xl flex flex-col gap-10"
              >
                <h3 className="text-2xl font-extrabold text-gray-900 border-b-2 border-primary-color pb-4">Cart Summary</h3>
                <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                  {cartItems.map((item) => (
                    <div key={item.product} className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col">
                        <span className="font-bold text-gray-900 line-clamp-1">{item.name}</span>
                        <span className="text-sm text-gray-400 font-bold">{item.qty} x ₹{item.price.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="font-extrabold text-accent-color">₹{(item.qty * item.price).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t-2 border-primary-color pt-8 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-lg font-bold text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-gray-500">
                    <span>Tax (10%)</span>
                    <span>₹{(cartTotal * 0.1).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-3xl font-extrabold text-gray-900 mt-4">
                    <span>Total</span>
                    <span className="text-accent-color">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-6 bg-primary-color bg-opacity-30 rounded-3xl border border-primary-dark border-opacity-20 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-accent-color font-extrabold text-sm">
                    <ShieldCheck className="w-6 h-6" /> SSL Encrypted Checkout
                  </div>
                  <p className="text-xs text-gray-500 font-medium">Your payment information is encrypted and never stored on our servers.</p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
