import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Utensils, Award, Clock, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1500" 
            alt="Bakery background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-color to-transparent opacity-40"></div>
        </div>
        <div className="container relative z-10 text-center flex flex-col items-center gap-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-color font-bold tracking-[0.3em] uppercase text-sm"
          >
            Est. 2010
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-extrabold text-gray-900"
          >
            Our <span className="text-accent-color">Story</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-500 max-w-2xl font-medium"
          >
            At Rosywood Bakery, we believe that every bite should be a celebration. Our journey began in a small kitchen with a passion for artisan baking.
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-color rounded-full opacity-30 blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800" 
              alt="Artisan Baking" 
              className="relative z-10 w-full rounded-[60px] shadow-2xl border-8 border-white"
            />
            <div className="absolute -bottom-10 -right-10 glass p-10 rounded-[40px] shadow-xl z-20 hidden md:block border border-primary-dark border-opacity-10">
              <div className="flex flex-col items-center gap-2">
                <span className="text-5xl font-extrabold text-accent-color">15+</span>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Years Experience</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <h2 className="text-5xl font-extrabold leading-tight">Handcrafted with <span className="text-accent-color">Love & Organic</span> Ingredients</h2>
            <p className="text-lg text-gray-500 font-medium">
              We started Rosywood with a simple mission: to bring the authentic taste of artisan baking to your home. Every loaf of bread, every delicate pastry, and every celebration cake is crafted by hand in our bakery.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
              {[
                { icon: <Utensils className="w-8 h-8 text-accent-color" />, title: "Artisan Methods", desc: "Traditional slow-fermentation and hand-kneading." },
                { icon: <Heart className="w-8 h-8 text-accent-color" />, title: "Organic Only", desc: "Sourcing local, organic ingredients for every treat." },
                { icon: <Award className="w-8 h-8 text-accent-color" />, title: "Award Winning", desc: "Voted Best Bakery in the city for 5 consecutive years." },
                { icon: <Users className="w-8 h-8 text-accent-color" />, title: "Local Family", desc: "A family-owned business deeply rooted in the community." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="p-3 bg-primary-color w-max rounded-2xl mb-2">{item.icon}</div>
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <p className="text-gray-400 font-medium text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-primary-color bg-opacity-10 py-32">
        <div className="container">
          <div className="text-center flex flex-col items-center gap-6 mb-20">
            <h2 className="text-5xl font-extrabold">Meet the <span className="text-accent-color">Artists</span></h2>
            <p className="text-gray-500 max-w-2xl text-lg font-medium">The passionate bakers and designers behind your favorite treats.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Signature Pastries", role: "Crafted Daily", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=400" },
              { name: "Artisan Breads", role: "Slow Fermented", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400" },
              { name: "Designer Cakes", role: "Custom Creations", img: "https://images.unsplash.com/photo-1535141192574-5d4897c82536?q=80&w=400" }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -15 }}
                className="glass rounded-[50px] overflow-hidden group shadow-xl border border-primary-dark border-opacity-10"
              >
                <div className="h-[400px] overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-10 text-center bg-white">
                  <h4 className="text-2xl font-extrabold text-gray-900">{member.name}</h4>
                  <p className="text-accent-color font-bold uppercase tracking-widest text-xs mt-2">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
