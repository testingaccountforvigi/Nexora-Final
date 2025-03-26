import React, { useState } from 'react'
import {motion} from "framer-motion"
import { Plane, Users, Bell, PackageSearch, Send, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import Popup from '../features/Popup';
import Loader from '../features/Loader';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://cwtqnccdxagehrzadhah.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3dHFuY2NkeGFnZWhyemFkaGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Njg0MzQsImV4cCI6MjA1ODU0NDQzNH0.fO5Gks_aO1dwtJkr5oGiBX-0LyINtp6243u5E0AGras';
const supabase = createClient(supabaseUrl, supabaseKey);

const items1 = [
    { id: 1, content: 'Nexora', duration: 0.5, tailwindClass: "text-6xl font-bold mb-6" },
    { id: 2, content: 'Connect. Explore. Experience', duration: 0.8, tailwindClass: "text-2xl mb-8" },
    { id: 3, content: 'Join a community of passionate travelers who share your wanderlust. Create unforgettable memories and lifelong friendships around the globe.', duration: 1.2, tailwindClass: "text-xl mb-12" },
  ];

const items2 = [
    { id: 1, content: 'Welcome to Nexora!', duration: 0.5, tailwindClass: "text-6xl font-bold mb-6" },
    { id: 2, content: "You've successfully signed up for early access.", duration: 0.8, tailwindClass: "text-2xl mb-8" },
    { id: 3, content: "We'll notify you as soon as we launch and send exclusive early bird offers your way.", duration: 1.2, tailwindClass: "text-xl mb-12" },
    { id: 4, content: "Stay tuned for an exciting travel experience!", duration: 1.6, tailwindClass: "text-lg mb-12" },
  
]
const features = [
    {
      icon: <Plane className="w-8 h-8" />,
      title: 'Personalized Itineraries',
      description: 'Get custom travel plans tailored to your preferences and budget.'
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications about your travel plans and group activities.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Travel Partner Matching',
      description: 'Find like-minded travelers and create unforgettable memories together.'
    },
    {
      icon: <PackageSearch className="w-8 h-8" />,
      title: 'Smart Packing Lists',
      description: 'Never forget essential items with our AI-powered packing suggestions.'
    }
  ];

const whatsappGroups = [
  {
    name: 'Adventure Seekers',
    description: 'Connect with adrenaline junkies and extreme sports enthusiasts',
    link: 'https://chat.whatsapp.com/Jvg9RCek7dW2C7IFdpZ26k'
  },
  {
    name: 'Culture Explorers',
    description: 'Discover local traditions, arts, and authentic experiences',
    link: 'https://chat.whatsapp.com/F5q0jdolULG4C5tcFt3JBK'
  },
  {
    name: 'Budget Travelers',
    description: 'Share tips and tricks for smart, affordable travel',
    link: 'https://chat.whatsapp.com/ISwwLKlyPWKC85C9o89Wpy'
  }
];

const AnimatedItem = ({ content, duration, tailwindClass  }) => {
    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: 'easeIn' },
      },
    };
  
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        style={{ listStyle: 'none', marginBottom: '10px' }}
        className={`mb-4 ${tailwindClass}`}
      >
        {content}
      </motion.div>
    );
  };

function LandingPage() {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Function to submit email to Supabase
  const submitToWaitlist = async (email) => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ email: email }]);
        
      if (error) {
        if (error.code === '23505') { // Unique violation error code
          toast.info('This email is already on our waitlist!');
        } else {
          console.error('Error submitting to waitlist:', error);
          toast.error('Something went wrong. Please try again.');
        }
        setStatus('error');
      } else {
        toast.success('Thanks for joining our waitlist!');
        setEmail('');
        setStatus('success');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Popup/>
    <Loader/>
    
    <div className='min-h-screen'>
        {/* Header */}
        <header className="relative h-screen flex items-center justify-center overflow-hidden">

        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          {items1.map((item) => (
          <AnimatedItem
          key={item.id}
          content={item.content}
          duration={item.duration}
          tailwindClass={item.tailwindClass}
          />
          ))}
        </div>

      </header>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Nexora?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Be First to Experience Nexora</h2>
          <p className="text-xl text-gray-600 mb-10">
            Join our waitlist to get early access and exclusive updates about our launch.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 max-w-lg px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => submitToWaitlist(email)}
              disabled={isSubmitting}
              className={`${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap`}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </div>
          
          {status === 'success' && (
            <p className="mt-4 text-green-600">
              Thanks for signing up! We'll keep you updated.
            </p>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Join Our WhatsApp Community</h2>
          <p className="text-xl text-gray-600 mb-12">
            Connect with fellow travelers, share experiences, and get instant updates about travel opportunities.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {whatsappGroups.map((group, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{group.name}</h3>
                <p className="text-gray-600 mb-4">
                  {group.description}
                </p>
                <a
                  href={group.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                  onClick={() => toast.success(`Joining ${group.name} group!`)}
                >
                  Join Group <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>

          <button 
            onClick={() => {
              toast.success('WhatsApp invite sent!');
              window.open('https://chat.whatsapp.com/ERzDvgVPd6kFcewob14Sm6', '_blank');
            }}
            className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Join WhatsApp Group</span>
          </button>
        </div>
      </section>
    </div>

{/* Footer Newly added here */}

    <footer data-name="footer" className="bg-gray-900 text-white py-12">
                <div data-name="footer-content" className="container mx-auto px-6">
                    <div data-name="footer-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div data-name="footer-left">
                            <h3 data-name="footer-logo" className="text-2xl font-bold mb-4">Nexora</h3>
                            <p data-name="footer-description" className="text-gray-400 max-w-md">
                                The future of smart travel planning. Personalized itineraries, real-time updates, and a community of travelers.
                            </p>
                        </div>
                        <div data-name="footer-right" className="flex justify-start md:justify-end items-center space-x-6">
                            <a href="mailto:nexora195@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                            <i class="fa-solid fa-envelope text-2xl"></i>
                            </a>
                            <a href="https://www.instagram.com/nexora.official2025?igsh=MWUzaDFwdjNwdHk2NA%3D%3D&utm_source=qr" className="text-gray-400 hover:text-white transition-colors">
                                <i className="fab fa-instagram text-2xl mr-5"></i>
                            </a>
                            <a href="https://www.linkedin.com/company/nexora-official-2025/" className="text-gray-400 hover:text-white transition-colors">
                                <i className="fab fa-linkedin text-2xl"></i>
                            </a>
                        </div>
                    </div>
                    <div data-name="footer-bottom" className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Nexora. All rights reserved.</p>
                    </div>
                </div>
    </footer>
    <ToastContainer />
  </>
  )
}

export default LandingPage