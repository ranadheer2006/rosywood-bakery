import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, ShoppingBag, MapPin, Settings, LogOut, ChevronRight, Clock, CheckCircle, Package } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchMyOrders();
  }, [user, navigate]);

  const fetchMyOrders = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
      setOrders(data);
    } catch (error) {
      toast.error('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  if (loading) return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-accent-color"></div>
    </div>
  );

  return (
    <div className="container py-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-10 rounded-[40px] border border-primary-dark border-opacity-20 shadow-xl flex flex-col items-center gap-6"
          >
            <div className="w-32 h-32 rounded-[40px] bg-primary-color flex items-center justify-center font-extrabold text-5xl text-accent-color shadow-lg shadow-pink-100 border-4 border-white">
              {user.name.charAt(0)}
            </div>
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-2xl font-extrabold text-gray-900">{user.name}</h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{user.email}</p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            {[
              { label: 'My Orders', icon: <ShoppingBag />, active: true },
              { label: 'Shipping Address', icon: <MapPin />, active: false },
              { label: 'Account Settings', icon: <Settings />, active: false },
            ].map((item, idx) => (
              <button 
                key={idx}
                className={`flex items-center justify-between p-6 rounded-3xl font-bold transition-all ${
                  item.active 
                    ? 'bg-accent-color text-white shadow-xl shadow-pink-100' 
                    : 'bg-white text-gray-400 hover:bg-primary-color hover:text-accent-color border border-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                  {item.label}
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            ))}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 p-6 rounded-3xl font-bold text-red-400 hover:bg-red-50 transition-all mt-4"
            >
              <LogOut className="w-6 h-6" /> Logout Account
            </button>
          </div>
        </div>

        {/* Orders Content */}
        <div className="lg:col-span-3 flex flex-col gap-10">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold text-gray-900">Order <span className="text-accent-color">History</span></h1>
              <p className="text-gray-400 text-lg font-medium">Track and manage your delicious purchases.</p>
            </div>
            <span className="px-6 py-2 bg-primary-color text-accent-color rounded-full font-bold text-sm">
              Total Orders: {orders.length}
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="glass p-20 rounded-[50px] border border-primary-dark border-opacity-10 shadow-lg text-center flex flex-col items-center gap-6">
              <div className="p-8 bg-primary-color rounded-full"><Package className="w-20 h-20 text-accent-color opacity-30" /></div>
              <h3 className="text-3xl font-bold text-gray-900">No orders yet</h3>
              <p className="text-gray-500 text-lg font-medium max-w-sm">Start your sweet journey by exploring our artisan menu.</p>
              <button onClick={() => navigate('/menu')} className="btn btn-primary px-10 py-4 text-lg font-bold mt-4 shadow-xl">
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {orders.map((order, idx) => (
                <motion.div 
                  key={order._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass rounded-[40px] border border-primary-dark border-opacity-10 shadow-lg overflow-hidden group"
                >
                  <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gray-50 bg-opacity-30">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-white rounded-2xl shadow-sm text-accent-color"><ShoppingBag className="w-8 h-8" /></div>
                      <div className="flex flex-col">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Order ID</span>
                        <span className="text-xl font-extrabold text-gray-900">#ORD-{order._id.slice(-6).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 md:gap-12">
                      <div className="flex flex-col">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Order Date</span>
                        <span className="text-lg font-extrabold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Total Amount</span>
                        <span className="text-lg font-extrabold text-accent-color">₹{order.totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Status</span>
                        <span className={`px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                          order.isPaid 
                            ? 'bg-green-50 text-green-600 border-green-100' 
                            : 'bg-orange-50 text-orange-600 border-orange-100'
                        }`}>
                          {order.isPaid ? 'Success' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      {order.orderItems.map((item, i) => (
                        <div key={i} className="relative group/item">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm border-2 border-white group-hover/item:scale-105 transition-transform">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="absolute -top-2 -right-2 bg-accent-color text-white text-[10px] font-extrabold w-6 h-6 flex items-center justify-center rounded-full shadow-md">
                            {item.qty}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-6 border-t border-gray-50 mt-2">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                          <Clock className="w-5 h-5" /> Estimated Delivery: Tomorrow
                        </div>
                        <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                          <CheckCircle className="w-5 h-5" /> Quality Checked
                        </div>
                      </div>
                      <button className="text-accent-color font-bold hover:gap-3 transition-all flex items-center gap-2">
                        Order Details <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
