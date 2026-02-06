import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import PortfolioPage from './PortfolioPage';
import {
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  Code2,
  ShoppingCart,
  Cpu,
  Star,
  MessageCircle,
  Sparkles,
  X,
  Loader2
} from 'lucide-react';

const HomePage = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  // Typewriter Effect State
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const typewriterWords = ["Shopify Stores", "WordPress Sites", "Web3 Solutions", "Custom Apps"];
  const currentWord = typewriterWords[typewriterIndex];

  // Get client name from URL (computed once on mount)
  const params = new URLSearchParams(window.location.search);
  const [clientName] = useState(params.get('name') || '');

  // Typewriter Effect
  useEffect(() => {
    let timer;
    const speed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTypewriterIndex((prev) => (prev + 1) % typewriterWords.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentWord.substring(0, displayText.length - 1)
            : currentWord.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWord, typewriterWords.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        "service_x1ec9dp",
        "template_0yxag4n",
        formData,
        "qRcDGSL9YNWDjdYSi"
      );
      setSubmitStatus('success');
      setFormData({ name: "", email: "", message: "" });
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus('error');
      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExplorePortfolio = () => {
    setShowWelcomeModal(false);
    setTimeout(() => {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
            onClick={() => setShowWelcomeModal(false)}
          ></div>

          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center animate-[fade-in-up_0.5s_ease-out]">
            <button
              onClick={() => setShowWelcomeModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-blue-100">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              {clientName ? (
                <>Welcome <span className="text-blue-600 capitalize">{clientName}</span> to Israel's Workspace!</>
              ) : (
                "Welcome to Israel's Workspace!"
              )}
            </h2>

            <p className="text-slate-600 mb-8 leading-relaxed">
              Hi {clientName ? clientName : "there"}! I'm <span className="font-semibold text-slate-900">Israel</span>.
              I realized looking at portfolios can be boring, so I built this interactive workspace to show you exactly what I can do for your project.
            </p>

            <button
              onClick={handleExplorePortfolio}
              className="w-full py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Check Israel's Portfolio Now
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 -z-10"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for new projects
            </div>

            {/* 1. PRIMARY HEADLINE */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Building Scalable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Web & Blockchain</span> Solutions
            </h1>

            {/* 2. TYPEWRITER SUBHEADING */}
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mt-4">
              I Build <span className="text-blue-600">{displayText}</span><span className="animate-pulse text-blue-600">|</span>
            </h2>

            {/* 3. ORIGINAL BIO */}
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed mt-6">
              Hi, I'm <span className="font-semibold text-slate-900">Israel O.</span> A Full-Stack Developer specializing in MERN, WordPress, Shopify, and Web3 applications. I help businesses drive real growth through high-performance digital products.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#portfolio" className="px-7 py-3.5 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 group">
                View My Work
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="px-7 py-3.5 bg-white text-slate-900 border border-slate-200 font-semibold rounded-full hover:bg-slate-50 transition-all">
                Contact Me
              </a>
            </div>

            <div className="pt-8 flex gap-6 text-slate-400">
              <a href="https://github.com/profhisrael" className="hover:text-blue-600 transition-colors"><Github className="w-6 h-6" /></a>
              <a href="https://ng.linkedin.com/in/israel-ojeyinka-01564b229" className="hover:text-blue-600 transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href="mailto:israelthedev278@gmail.com" className="hover:text-blue-600 transition-colors"><Mail className="w-6 h-6" /></a>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border border-slate-100">
              <div className="bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] flex flex-col">
                <div className="h-8 bg-slate-800 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6 font-mono text-xs md:text-sm text-blue-300">
                  <p><span className="text-purple-400">const</span> <span className="text-yellow-300">expert</span> = {'{'}</p>
                  <p className="pl-4">name: <span className="text-green-400">"Israel O."</span>,</p>
                  <p className="pl-4">role: <span className="text-green-400">"Full-Stack Engineer"</span>,</p>
                  <p className="pl-4">mastery: [</p>
                  <p className="pl-8"><span className="text-green-400">"Shopify/Liquid"</span>,</p>
                  <p className="pl-8"><span className="text-green-400">"WordPress/PHP"</span>,</p>
                  <p className="pl-8"><span className="text-green-400">"React/Next.js"</span>,</p>
                  <p className="pl-8"><span className="text-green-400">"Web3/Solidity"</span></p>
                  <p className="pl-4">]</p>
                  <p>{'};'}</p>
                  <br />
                  <p><span className="text-purple-400">await</span> expert.<span className="text-blue-400">buildYourVision</span>();</p>
                </div>
              </div>
            </div>
            <div className="absolute top-10 -right-4 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl -z-10 opacity-20 rotate-6"></div>
          </div>
        </div>
      </section>

      {/* --- START OF SERVICES SECTION (White BG + Slate Cards) --- */}
      <section id="services" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Technical Expertise</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              I combine creative design with technical robustness to deliver complete solutions across various platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Card 1: Full-Stack */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100/50 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-6">Full-Stack Development</h3>
              <ul className="space-y-4">
                {["React.js", "Node.js", "Express", "MongoDB", "JavaScript (ES6+)", "Tailwind CSS"].map((item, idx) => (
                  <li key={idx} className="flex items-center text-slate-600 font-medium text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: E-Commerce */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100/50 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-6">E-Commerce & CMS</h3>
              <ul className="space-y-4">
                {["Shopify Development", "WordPress", "Webflow", "Store Optimization", "Theme Customization"].map((item, idx) => (
                  <li key={idx} className="flex items-center text-slate-600 font-medium text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Web3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100/50 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-6">Blockchain & Web3</h3>
              <ul className="space-y-4">
                {["Smart Contracts", "Web3 Integration", "dApps", "Solidity", "Blockchain Architecture"].map((item, idx) => (
                  <li key={idx} className="flex items-center text-slate-600 font-medium text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-1">100%</div>
            <div className="text-blue-200 text-sm">Job Success Score</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">100+</div>
            <div className="text-blue-200 text-sm">Projects Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">7+</div>
            <div className="text-blue-200 text-sm">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">24/7</div>
            <div className="text-blue-200 text-sm">Support Available</div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <div id="portfolio">
        <PortfolioPage />
      </div>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Client Feedback</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl relative">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "Israel is an exceptional developer. He completely transformed our Shopify store, optimizing it for speed and mobile conversions. His knowledge of the MERN stack also helped us build a custom dashboard that saved us hours of work."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">JD</div>
                <div>
                  <div className="font-bold text-slate-900">John Doe</div>
                  <div className="text-xs text-slate-500">CEO, TechStart Inc.</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl relative">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "Incredible attention to detail on our Web3 project. Israel handled the smart contract integration perfectly and the React frontend is buttery smooth. Highly recommended for any blockchain related work."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">ML</div>
                <div>
                  <div className="font-bold text-slate-900"> Matteo Lenny</div>
                  <div className="text-xs text-slate-500">Pugcoin CEO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Something Great Together</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
            Whether you need a custom web app, a blockchain solution, or an e-commerce overhaul, I'm ready to help you achieve your goals.
          </p>

          <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
            <form
              className="space-y-4 max-w-md mx-auto text-left"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Your Name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="your@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  submitStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : submitStatus === 'error'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
                } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-cyan-500/20'}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  '✓ Message Sent!'
                ) : submitStatus === 'error' ? (
                  '✗ Failed. Try Again'
                ) : (
                  'Send Message'
                )}
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm text-center mt-2">Thank you! I'll get back to you soon.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm text-center mt-2">Something went wrong. Please try again or email me directly.</p>
              )}
            </form>
          </div>

          <div className="mt-12 flex justify-center gap-8">
            <a href="mailto:israelthedev278@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" /> israelthedev278@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Floating Contact Button */}
      <a
        href="https://www.upwork.com/freelancers/~0166141be829840d31?mp_source=share"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300 font-bold flex items-center gap-2 border-2 border-white/20"
      >
        <MessageCircle className="w-5 h-5" />
        Contact Now
      </a>
    </div>
  );
};

export default HomePage;
