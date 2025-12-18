import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle, X, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('success'); // 'success' or 'error'

  const formRef = useRef();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // send mail to you
    emailjs.sendForm(
      'service_nu1avko',
      'template_r2z5heg',
      formRef.current,
      'PmeFR-QQxZlg6vxM4'
    );

    // send auto-reply to user
    emailjs
      .sendForm(
        'service_nu1avko',
        'template_plm2a78',
        formRef.current,
        'PmeFR-QQxZlg6vxM4'
      )
      .then(
        (result) => {
          console.log('✅ Message sent:', result.text);
          setPopupType('success');
          setShowPopup(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
          setTimeout(() => setShowPopup(false), 5000);
        },
        (error) => {
          console.error('❌ Error:', error.text);
          setPopupType('error');
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 5000);
        }
      );
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'kabhinav.salem@gmail.com',
      href: 'mailto:kabhinav.salem@gmail.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '6381154351',
      href: 'tel:+916381154351'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Salem, Tamil Nadu',
      href: '#'
    }
  ];

  return (
    <section id="contact" className="relative py-20 px-6">
      {/* Success/Error Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`relative max-w-md w-full bg-gradient-to-br ${
            popupType === 'success' 
              ? 'from-gray-900 to-gray-800 border-green-500' 
              : 'from-gray-900 to-gray-800 border-red-500'
          } border-2 rounded-2xl p-8 shadow-2xl transform transition-all duration-300 animate-scaleIn`}>
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              {popupType === 'success' ? (
                <div className="bg-green-500/10 rounded-full p-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
              ) : (
                <div className="bg-red-500/10 rounded-full p-4">
                  <AlertCircle className="w-16 h-16 text-red-500" />
                </div>
              )}
            </div>

            {/* Message */}
            <div className="text-center">
              <h3 className={`text-2xl font-bold mb-3 ${
                popupType === 'success' ? 'text-green-500' : 'text-red-500'
              }`}>
                {popupType === 'success' ? 'Mail Sent Successfully!' : 'Oops! Something Went Wrong'}
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                {popupType === 'success' 
                  ? 'Thank you for reaching out! You will get a response sooner.' 
                  : 'Failed to send message. Please try again later.'}
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                  popupType === 'success'
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="text-red-500">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to start your next project? Let's work together to create something amazing!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Hey, I'm Abhinav. Always down to chat about new ideas, collabs, or just geek out over tech.
                Drop a message and I’ll hit you back ASAP.
              </p>
            </div>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center space-x-4 p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-red-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-red-500">{info.icon}</div>
                  <div>
                    <p className="text-gray-400 text-sm">{info.label}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
