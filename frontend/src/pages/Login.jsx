import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const { user, login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success('Welcome back to Rosywood!');
      } else {
        await register(formData.name, formData.email, formData.password);
        toast.success('Welcome to the Rosywood family!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="container min-h-screen py-32 flex items-center justify-center relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-color opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-dark opacity-10 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg glass p-12 rounded-[40px] border border-primary-dark border-opacity-20 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center gap-6 mb-12 text-center">
          <Link to="/" className="text-4xl font-extrabold">
            <span className="text-accent-color">Rosy</span>wood
          </Link>
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-extrabold text-gray-900">{isLogin ? 'Welcome Back' : 'Join Us Today'}</h2>
            <p className="text-gray-500 text-lg font-medium">{isLogin ? 'Sign in to access your sweet account' : 'Create an account to start your sweet journey'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <AnimatePresence mode='wait'>
            {!isLogin && (
              <motion.div 
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative group"
              >
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required={!isLogin}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:border-accent-color transition-all shadow-sm font-medium text-lg"
                />
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-accent-color" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative group">
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:border-accent-color transition-all shadow-sm font-medium text-lg"
            />
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-accent-color" />
          </div>

          <div className="relative group">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-14 pr-16 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:border-accent-color transition-all shadow-sm font-medium text-lg"
            />
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-accent-color" />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-color transition-colors"
            >
              {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </button>
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <a href="#" className="text-accent-color font-bold hover:underline">Forgot Password?</a>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full py-6 text-xl font-extrabold flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transition-all group disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : (
              <>
                {isLogin ? 'Sign In' : 'Sign Up'} 
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-gray-500 font-medium text-lg">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={toggleMode}
              className="text-accent-color font-extrabold hover:underline transition-all ml-1"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>

        <div className="mt-12 pt-12 border-t border-gray-100 flex flex-col items-center gap-6">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Or continue with</p>
          <div className="flex gap-6 w-full">
            <button className="flex-grow flex items-center justify-center gap-3 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-all font-bold">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" /> Google
            </button>
            <button className="flex-grow flex items-center justify-center gap-3 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-all font-bold">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-6 h-6" /> Facebook
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
