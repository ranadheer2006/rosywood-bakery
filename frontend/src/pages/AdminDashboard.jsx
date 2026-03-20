import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Package, ShoppingBag, Users, TrendingUp, 
  Search, Filter, ChevronDown, CheckCircle, Clock, XCircle, MoreVertical, 
  Upload, X, LayoutDashboard, Settings, HelpCircle, Bell
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', description: '', category: 'Cakes', image: '', stock: 100, isFeatured: false
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const [prodRes, orderRes] = await Promise.all([
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/orders', config)
      ]);
      setProducts(prodRes.data);
      setOrders(orderRes.data);
    } catch (error) {
      toast.error('Error fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        toast.success('Product deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Error deleting product');
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      stock: product.stock,
      isFeatured: product.isFeatured
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData, config);
        toast.success('Product updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/products', formData, config);
        toast.success('Product created successfully');
      }
      setShowProductModal(false);
      setEditingProduct(null);
      fetchData();
    } catch (error) {
      toast.error('Error saving product');
    }
  };

  const stats = [
    { label: 'Total Products', value: products.length, icon: <Package className="w-8 h-8" />, color: 'bg-blue-500' },
    { label: 'Total Orders', value: orders.length, icon: <ShoppingBag className="w-8 h-8" />, color: 'bg-purple-500' },
    { label: 'Total Revenue', value: `₹${orders.reduce((a, c) => a + c.totalPrice, 0).toLocaleString('en-IN')}`, icon: <TrendingUp className="w-8 h-8" />, color: 'bg-green-500' },
    { label: 'Total Customers', value: '1,240', icon: <Users className="w-8 h-8" />, color: 'bg-orange-500' },
  ];

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-accent-color"></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-100 p-10 flex flex-col gap-12 sticky top-0 h-screen">
        <div className="flex items-center gap-4 px-4">
          <div className="w-12 h-12 bg-accent-color rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-pink-200">R</div>
          <span className="text-3xl font-extrabold tracking-tight">Rosywood <span className="text-accent-color">Admin</span></span>
        </div>

        <nav className="flex flex-col gap-4">
          {[
            { id: 'dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
            { id: 'products', icon: <Package />, label: 'Inventory' },
            { id: 'orders', icon: <ShoppingBag />, label: 'Orders' },
            { id: 'users', icon: <Users />, label: 'Customers' },
            { id: 'stats', icon: <TrendingUp />, label: 'Analytics' },
            { id: 'settings', icon: <Settings />, label: 'Settings' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 px-6 py-5 rounded-2xl font-bold transition-all ${
                activeTab === item.id 
                  ? 'bg-accent-color text-white shadow-xl shadow-pink-100 scale-105' 
                  : 'text-gray-400 hover:bg-primary-color hover:bg-opacity-30 hover:text-accent-color'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto glass p-8 rounded-[30px] border border-primary-dark border-opacity-10 shadow-lg flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-color overflow-hidden border-2 border-white shadow-md">
              <img src="https://ui-avatars.com/api/?name=Admin&background=fce4ec&color=d81b60" alt="Admin" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg">Admin User</span>
              <span className="text-xs font-bold text-accent-color uppercase tracking-widest">Main Office</span>
            </div>
          </div>
          <button className="btn btn-outline w-full py-4 text-sm font-bold border-2 border-accent-color hover:bg-accent-color hover:text-white transition-all rounded-xl">
            Account Details
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12">
        <header className="flex justify-between items-center mb-16">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-extrabold text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} <span className="text-accent-color">Overview</span>
            </h1>
            <p className="text-gray-400 text-xl font-medium">Manage your bakery business with precision and style.</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-14 pr-8 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:border-accent-color transition-all shadow-sm w-96 font-medium text-lg"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-accent-color" />
            </div>
            <button className="p-5 bg-white rounded-2xl shadow-sm text-gray-400 hover:text-accent-color transition-all relative">
              <Bell className="w-7 h-7" />
              <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-10 rounded-[40px] flex items-center gap-8 border border-primary-dark border-opacity-10 shadow-xl hover:shadow-2xl transition-all group"
            >
              <div className={`p-6 ${stat.color} text-white rounded-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1">{stat.label}</span>
                <span className="text-4xl font-extrabold text-gray-900">{stat.value}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Section */}
        {activeTab === 'products' && (
          <div className="glass rounded-[40px] border border-primary-dark border-opacity-10 shadow-2xl overflow-hidden bg-white">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50 bg-opacity-30">
              <div className="flex items-center gap-8">
                <h3 className="text-3xl font-extrabold">Product Inventory</h3>
                <div className="flex gap-4">
                  <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">Total: {products.length}</span>
                  <span className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-bold">In Stock: {products.filter(p => p.stock > 0).length}</span>
                </div>
              </div>
              <button 
                onClick={() => { setEditingProduct(null); setFormData({ name: '', price: '', description: '', category: 'Cakes', image: '', stock: 100, isFeatured: false }); setShowProductModal(true); }}
                className="btn btn-primary px-10 py-5 text-lg font-bold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all"
              >
                <Plus className="w-6 h-6" /> Add New Product
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-sm font-bold uppercase tracking-widest border-b border-gray-100">
                    <th className="px-10 py-8">Product</th>
                    <th className="px-10 py-8">Category</th>
                    <th className="px-10 py-8">Price</th>
                    <th className="px-10 py-8">Stock</th>
                    <th className="px-10 py-8">Rating</th>
                    <th className="px-10 py-8 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map(product => (
                    <tr key={product._id} className="hover:bg-primary-color hover:bg-opacity-5 transition-colors group">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md group-hover:scale-110 transition-transform">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-extrabold text-xl text-gray-900">{product.name}</span>
                            <span className="text-gray-400 text-sm font-medium line-clamp-1 max-w-xs">{product.description}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="px-6 py-2 bg-primary-color text-accent-color rounded-full text-sm font-extrabold uppercase tracking-widest border border-primary-dark border-opacity-20">{product.category}</span>
                      </td>
                      <td className="px-10 py-8 text-2xl font-extrabold text-gray-900">₹{product.price.toLocaleString('en-IN')}</td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-xl font-bold text-gray-900">{product.stock} pcs</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-2 text-yellow-500">
                          <Star className="w-5 h-5 fill-current" />
                          <span className="text-xl font-extrabold text-gray-900">{product.rating}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEditProduct(product)} className="p-4 bg-white rounded-2xl shadow-sm text-blue-500 hover:bg-blue-500 hover:text-white transition-all"><Edit className="w-6 h-6" /></button>
                          <button onClick={() => handleDeleteProduct(product._id)} className="p-4 bg-white rounded-2xl shadow-sm text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-6 h-6" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="glass rounded-[40px] border border-primary-dark border-opacity-10 shadow-2xl overflow-hidden bg-white">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50 bg-opacity-30">
              <h3 className="text-3xl font-extrabold">Recent Orders</h3>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-2xl border border-gray-100 font-bold text-gray-600 hover:border-accent-color transition-all shadow-sm">
                  <Filter className="w-5 h-5" /> Filter
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-2xl border border-gray-100 font-bold text-gray-600 hover:border-accent-color transition-all shadow-sm">
                  <ChevronDown className="w-5 h-5" /> Sort By
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-sm font-bold uppercase tracking-widest border-b border-gray-100">
                    <th className="px-10 py-8">Order ID</th>
                    <th className="px-10 py-8">Customer</th>
                    <th className="px-10 py-8">Date</th>
                    <th className="px-10 py-8">Amount</th>
                    <th className="px-10 py-8">Status</th>
                    <th className="px-10 py-8 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map(order => (
                    <tr key={order._id} className="hover:bg-primary-color hover:bg-opacity-5 transition-colors group">
                      <td className="px-10 py-8 font-extrabold text-gray-900">#ORD-{order._id.slice(-6).toUpperCase()}</td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary-color flex items-center justify-center font-bold text-accent-color">
                            {order.user?.name?.charAt(0) || 'U'}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900">{order.user?.name || 'Guest User'}</span>
                            <span className="text-gray-400 text-xs font-medium">{order.user?.email || 'N/A'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-gray-500 font-bold">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-10 py-8 text-2xl font-extrabold text-accent-color">₹{order.totalPrice.toLocaleString('en-IN')}</td>
                      <td className="px-10 py-8">
                        <span className={`px-6 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest border ${
                          order.isPaid 
                            ? 'bg-green-50 text-green-600 border-green-100' 
                            : 'bg-orange-50 text-orange-600 border-orange-100'
                        }`}>
                          {order.isPaid ? 'Paid & Success' : 'Pending Payment'}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button className="p-4 bg-white rounded-2xl shadow-sm text-gray-400 hover:text-accent-color transition-all">
                          <MoreVertical className="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Product Modal */}
      <AnimatePresence>
        {showProductModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProductModal(false)}
              className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[50px] shadow-2xl overflow-hidden z-10 border-8 border-white"
            >
              <div className="p-12">
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-4xl font-extrabold text-gray-900">{editingProduct ? 'Update' : 'Create'} <span className="text-accent-color">Treat</span></h3>
                  <button onClick={() => setShowProductModal(false)} className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-all">
                    <X className="w-7 h-7" />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest">Product Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="px-8 py-5 rounded-2xl bg-gray-50 border border-transparent outline-none focus:border-accent-color focus:bg-white transition-all font-bold text-lg"
                        placeholder="e.g. Red Velvet Cake"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest">Price ($)</label>
                        <input 
                          type="number" 
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="px-8 py-5 rounded-2xl bg-gray-50 border border-transparent outline-none focus:border-accent-color focus:bg-white transition-all font-bold text-lg"
                          placeholder="45.99"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest">Stock</label>
                        <input 
                          type="number" 
                          required
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                          className="px-8 py-5 rounded-2xl bg-gray-50 border border-transparent outline-none focus:border-accent-color focus:bg-white transition-all font-bold text-lg"
                          placeholder="100"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest">Category</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="px-8 py-5 rounded-2xl bg-gray-50 border border-transparent outline-none focus:border-accent-color focus:bg-white transition-all font-bold text-lg appearance-none cursor-pointer"
                      >
                        <option value="Cakes">Cakes</option>
                        <option value="Pastries">Pastries</option>
                        <option value="Breads">Breads</option>
                        <option value="Cookies">Cookies</option>
                        <option value="Cupcakes">Cupcakes</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest">Description</label>
                      <textarea 
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="4"
                        className="px-8 py-5 rounded-2xl bg-gray-50 border border-transparent outline-none focus:border-accent-color focus:bg-white transition-all font-bold text-lg resize-none"
                        placeholder="Tell the story of this delicious treat..."
                      ></textarea>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest">Image URL</label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          required
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full pl-8 pr-16 py-5 rounded-2xl bg-gray-50 border border-transparent outline-none focus:border-accent-color focus:bg-white transition-all font-bold text-lg"
                          placeholder="Paste Unsplash link here..."
                        />
                        <Upload className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <input 
                        type="checkbox" 
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="w-6 h-6 rounded accent-accent-color"
                      />
                      <label htmlFor="isFeatured" className="font-extrabold text-gray-700 text-lg cursor-pointer">Feature on Homepage</label>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-6 mt-8">
                    <button 
                      type="button"
                      onClick={() => setShowProductModal(false)}
                      className="px-12 py-5 rounded-2xl bg-gray-100 font-extrabold text-lg text-gray-500 hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="btn btn-primary px-16 py-5 text-xl font-extrabold shadow-xl hover:shadow-2xl transition-all"
                    >
                      {editingProduct ? 'Save Changes' : 'Create Product'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
