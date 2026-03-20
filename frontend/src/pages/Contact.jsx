import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success('Message sent! We will get back to you soon.');
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-12"
        >
          <div className="flex flex-col gap-6">
            <span className="text-accent-color font-bold tracking-[0.3em] uppercase text-sm">Get in touch</span>
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight">Visit Our <span className="text-accent-color">Sweet Spot</span></h1>
            <p className="text-xl text-gray-500 font-medium max-w-lg leading-relaxed">Have a question about our menu, special orders, or just want to say hi? We'd love to hear from you!</p>
          </div>

          <div className="flex flex-col gap-8">
            {[
              { icon: <MapPin className="w-8 h-8 text-accent-color" />, label: "Our Bakery", value: "Urban Stay, Puttur" },
              { icon: <Phone className="w-8 h-8 text-accent-color" />, label: "Call Us", value: "9000191009" },
              { icon: <Mail className="w-8 h-8 text-accent-color" />, label: "Email Us", value: "hello@rosywood.com" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-8 glass p-8 rounded-[30px] shadow-lg border border-primary-dark border-opacity-10 hover:shadow-xl transition-all group">
                <div className="p-5 bg-primary-color rounded-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="flex flex-col">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1">{item.label}</span>
                  <span className="text-xl font-extrabold text-gray-900">{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Follow Our Sweet Journey</span>
            <div className="flex gap-6">
              {[<Instagram />, <Facebook />, <Twitter />].map((icon, idx) => (
                <button key={idx} className="p-5 bg-white rounded-2xl shadow-md text-gray-400 hover:text-accent-color hover:shadow-xl transition-all scale-100 hover:scale-110">
                  {React.cloneElement(icon, { className: "w-7 h-7" })}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-12 md:p-16 rounded-[60px] shadow-2xl border border-primary-dark border-opacity-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-color opacity-5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col gap-3 flex-grow">
                <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-8 py-5 rounded-3xl bg-white border border-gray-100 outline-none focus:border-accent-color shadow-sm font-bold text-lg"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-3 flex-grow">
                <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="px-8 py-5 rounded-3xl bg-white border border-gray-100 outline-none focus:border-accent-color shadow-sm font-bold text-lg"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest ml-4">Subject</label>
              <input 
                type="text" 
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="px-8 py-5 rounded-3xl bg-white border border-gray-100 outline-none focus:border-accent-color shadow-sm font-bold text-lg"
                placeholder="Special Order / General Question"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-extrabold text-gray-400 uppercase tracking-widest ml-4">Message</label>
              <textarea 
                required
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="px-8 py-5 rounded-[40px] bg-white border border-gray-100 outline-none focus:border-accent-color shadow-sm font-bold text-lg resize-none"
                placeholder="Tell us what's on your mind..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full py-6 text-xl font-extrabold flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transition-all group mt-4"
            >
              {isSubmitted ? (
                <>Sent Successfully <CheckCircle2 className="w-6 h-6" /></>
              ) : (
                <>Send Message <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
