import React from 'react';
import { MessageCircle } from 'lucide-react';

function Footer() {
  return (
    <>
      {/* Main Footer */}
      <footer className="py-8 bg-slate-950 text-slate-500 text-sm text-center relative">
        <p>&copy; {new Date().getFullYear()} Israel O. All rights reserved.</p>
      </footer>

      {/* Floating Contact Button */}
      <a 
        href="https://t.me/profhisrael" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300 font-bold flex items-center gap-2 border-2 border-white/20"
      >
        <MessageCircle className="w-5 h-5" />
        Contact Now
      </a>
    </>
  );
}

export default Footer;
