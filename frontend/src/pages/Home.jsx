import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, Clock, Truck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: products } = await axios.get('http://localhost:5000/api/products');
        setFeaturedProducts(products.filter(p => p.isFeatured).slice(0, 4));

        const config = user ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
        const { data: recs } = await axios.get('http://localhost:5000/api/products/recommendations', config);
        setRecommendations(recs);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col gap-20 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center bg-primary-color bg-opacity-20 overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-2 items-center gap-12 z-10">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <span className="text-accent-color font-bold tracking-widest uppercase text-sm px-4 py-1 bg-white rounded-full w-max shadow-sm">
              Artisan Bakery Since 2010
            </span>
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
              Baking the <span className="text-accent-color">Sweetest</span> Dreams for You
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Indulge in our collection of handcrafted cakes, pastries, and artisan breads made with premium organic ingredients.
            </p>
            <div className="flex gap-6 mt-4">
              <Link to="/menu" className="btn btn-primary text-lg px-10 py-4 flex items-center gap-2">
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn btn-outline text-lg px-10 py-4">
                Our Story
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-primary-dark rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-accent-color rounded-full opacity-10 blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000" 
              alt="Artisan Croissants" 
              className="relative z-10 w-full h-[600px] object-cover rounded-3xl shadow-2xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <Clock className="w-10 h-10 text-accent-color" />, title: "Fresh Every Morning", desc: "Baked daily at dawn with premium organic ingredients." },
            { icon: <Truck className="w-10 h-10 text-accent-color" />, title: "Doorstep Delivery", desc: "Fast and secure delivery to keep your treats fresh and intact." },
            { icon: <ShieldCheck className="w-10 h-10 text-accent-color" />, title: "Quality Guaranteed", desc: "No artificial flavors or preservatives. Only the best for you." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="glass p-10 rounded-3xl text-center flex flex-col items-center gap-4 shadow-lg border border-primary-dark border-opacity-10"
            >
              <div className="p-4 bg-primary-color rounded-2xl mb-2">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recommendation Section */}
      <section className="bg-primary-color bg-opacity-20 py-32">
        <div className="container flex flex-col gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-accent-color font-bold tracking-widest uppercase text-sm px-6 py-2 bg-white rounded-full shadow-sm">AI Powered Suggestions</span>
            <h2 className="text-5xl font-extrabold max-w-2xl">Tailored for <span className="text-accent-color">Your Taste</span></h2>
            <p className="text-gray-500 max-w-xl text-lg">Our smart recommendation system suggests treats based on your preferences.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendations.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="flex flex-col gap-16">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-4">
              <span className="text-accent-color font-bold tracking-widest uppercase text-sm">Our Favorites</span>
              <h2 className="text-5xl font-extrabold">Featured <span className="text-accent-color">Masterpieces</span></h2>
            </div>
            <Link to="/menu" className="btn btn-outline flex items-center gap-2 group">
              View All Menu <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container section-padding">
        <div className="glass rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-color opacity-5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-dark opacity-10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="text-4xl md:text-5xl font-bold max-w-2xl">Join Our <span className="text-accent-color">Sweet Community</span></h2>
            <p className="text-gray-500 max-w-xl text-lg">Subscribe to get exclusive recipes, baking tips, and 10% off your first order!</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mt-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-8 py-5 rounded-full border border-gray-200 outline-none focus:border-accent-color text-lg"
              />
              <button className="btn btn-primary px-10 py-5 text-lg font-bold">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
