import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Globe, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronRight, 
  Terminal,
  Cpu,
  Star,
  MessageCircle,
  Sparkles 
} from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true); 
   const [clientName, setClientName] = useState(''); 

   useEffect(() => {
    // Check the URL for a specific name (e.g., ?name=John)
    const params = new URLSearchParams(window.location.search);
    const nameFromUrl = params.get('name');
    
    if (nameFromUrl) {
      setClientName(nameFromUrl);
    }
  }, []);
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const skills = [
    {
      category: "Full-Stack Development",
      icon: <Code2 className="w-8 h-8 text-blue-500" />,
      items: ["React.js", "Node.js", "Express", "MongoDB", "JavaScript (ES6+)", "Tailwind CSS"]
    },
    {
      category: "E-Commerce & CMS",
      icon: <ShoppingCart className="w-8 h-8 text-green-500" />,
      items: ["Shopify Development", "WordPress", "Webflow", "Store Optimization", "Theme Customization"]
    },
    {
      category: "Blockchain & Web3",
      icon: <Cpu className="w-8 h-8 text-purple-500" />,
      items: ["Smart Contracts", "Web3 Integration", "dApps", "Solidity", "Blockchain Architecture"]
    }
  ];

  // --- PROJECT LIST EXPANDED TO 12 ITEMS ---
  const projects = [
    {
      title: "BTCINU Presale Website",
      category: "Web3 | React",
      description: "A Complete Presale website for BTCINU built on the Ethereum blockchain, raising over $687,000 in a fully sold-out token sale.",
      tags: ["React", "Web3.js", "CSS", "Ether.js"],
      image: "/btcinu.png"
    },
    {
      title: "Lawn and Landscape Website",
      category: "Wix Custom Website",
      description: "A professional Wix website developed for a full-service landscaping company providing lawn care, snow removal, and sprinkler installation.",
      tags: ["Wix", "Business Website", "Website Design", "Wix Studio"],
      image: "/sss.png"
    },
    {
      title: "Cirqle Landing Page",
      category: "Custom Website",
      description: "A custom-built landing page optimized for showcasing and linking mobile apps on the Play Store and App Store.",
      tags: ["Javascript", "Tailwind", "React", "FIGMA-to-Code"],
      image: "/Landingpage.png"
    },
    {
      title: "Airtime & Data VTU Website",
      category: "Web Application | Financial Service",
      description: "A VTU platform designed for fast and reliable airtime, data, and bill payment services.",
      tags: ["VTU", "Fintech", "Payment Platform", "Web Application"],
      image: "/vtu-website.png"
    },
    {
      title: "Bugsbunny Presale Website",
      category: "Web3 | Dapps",
      description: "A presale website built from scratch, handling the UI/UX, frontend, backend, wallet integration, and smart contract deployment on the Ethereum network.",
      tags: ["React", "Ether.js", "Solidity", "Ethereum Chain", "Remix IDE"],
      image: "bugsbunny -Presale-Website.png"
    },
    {
      title: "Pugcoin Presale / ICO Website",
      category: "Cryptocurrency | Blockchain | ICO",
      description: "A presale website built on the Ethereum chain that allows users to buy with ETH and USDT smoothly, with vesting and token claim options. Multilevel/phase presale website.",
      tags: ["Solidity", "Smart Contract", "Presale", "ICO"],
      image: "/pugcoin-presale.png"
    },
    {
      title: "Secured Class Dashboard",
      category: "Custom Website Solution",
      description: "Secure React dashboard featuring robust anti-piracy tools: dynamic watermarks, blocked inputs, and overlays to fully protect video content.",
      tags: ["React", "Tailwind CSS", "Firebase", "Typescript"],
      image: "/secured-class.png"
      
    },


    // {
    //   title: "Organic Food Store",
    //   category: "Shopify",
    //   description: "A clean, fast-loading Shopify store for organic products with subscription functionality and custom cart drawer.",
    //   tags: ["Shopify Plus", "Liquid", "JavaScript"],
    //   image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
    // },
    // {
    //   title: "Task Management App",
    //   category: "React / Firebase",
    //   description: "Productivity application with drag-and-drop kanban boards, real-time collaboration, and cloud syncing.",
    //   tags: ["React", "Firebase", "DnD Kit", "Tailwind"],
    //   image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800"
    // },
    // {
    //   title: "DAO Voting System",
    //   category: "Blockchain",
    //   description: "Decentralized Autonomous Organization governance portal allowing token holders to create and vote on proposals.",
    //   tags: ["Solidity", "React", "Graph Protocol"],
    //   image: "https://images.unsplash.com/photo-1639322537228-ad7117a394bc?auto=format&fit=crop&q=80&w=800"
    // },
    // {
    //   title: "Tech Blog Platform",
    //   category: "Next.js / Headless CMS",
    //   description: "Modern blog built with Next.js and Contentful, featuring static generation for lightning-fast page loads.",
    //   tags: ["Next.js", "Contentful", "GraphQL"],
    //   image: "https://images.unsplash.com/photo-1499750310159-52f0f834631b?auto=format&fit=crop&q=80&w=800"
    // },
    // {
    //   title: "Fitness Tracking App",
    //   category: "React Native",
    //   description: "Cross-platform mobile application for tracking workouts and nutrition with social sharing features.",
    //   tags: ["React Native", "Expo", "Node.js"],
    //   image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800"
    // }
  ];







  // FORM HANDLING




const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: ""
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = (e) => {
  e.preventDefault();

  emailjs.send(
    "service_x1ec9dp",    // Replace with your EmailJS service ID
    "template_0yxag4n",   // Replace with your EmailJS template ID
    formData,
    "qRcDGSL9YNWDjdYSi"     // Replace with your EmailJS public key
  )
  .then(() => {
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  })
  .catch((error) => {
    console.error("EmailJS Error:", error);
    alert("Failed to send message. Try again later.");
  });
};








// <--- COPY THIS FUNCTION START --->
  const handleExplorePortfolio = () => {
    setShowWelcomeModal(false);
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      setTimeout(() => {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  // <--- COPY THIS FUNCTION END --->
  // FORM HANDLINGG
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      
{/* <--- PASTE THIS MODAL BLOCK START ---> */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
            onClick={() => setShowWelcomeModal(false)}
          ></div>
          
          {/* Modal Content */}
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

            {/* DYNAMIC WELCOME HEADER */}
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
      {/* <--- PASTE THIS MODAL BLOCK END ---> */}

      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold tracking-tighter text-slate-900 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-blue-600" />
            <span>Israel<span className="text-blue-600">.Dev</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-900">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 py-4 px-6 flex flex-col gap-4 shadow-xl">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-600 font-medium py-2 hover:text-blue-600"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden">
        {/* Background Decorative Blobs */}
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
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Building Scalable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Web & Blockchain</span> Solutions
            </h1>
            
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
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
             {/* Abstract Hero Image Representation */}
            <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border border-slate-100">
               <div className="bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] flex flex-col">
                  {/* Mock Browser Header */}
                  <div className="h-8 bg-slate-800 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  {/* Mock Code Content */}
                  <div className="p-6 font-mono text-xs md:text-sm text-blue-300">
                    <p><span className="text-purple-400">const</span> <span className="text-yellow-300">developer</span> = {'{'}</p>
                    <p className="pl-4">name: <span className="text-green-400">"Israel O."</span>,</p>
                    <p className="pl-4">role: <span className="text-green-400">"Full-Stack Engineer"</span>,</p>
                    <p className="pl-4">skills: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Node.js"</span>, <span className="text-green-400">"Web3"</span>],</p>
                    <p className="pl-4">mission: <span className="text-green-400">"Building digital excellence."</span></p>
                    <p>{'};'}</p>
                    <br />
                    <p><span className="text-purple-400">await</span> developer.<span className="text-blue-400">createAmazingApp</span>();</p>
                  </div>
               </div>
            </div>
            {/* Background Accent Card */}
            <div className="absolute top-10 -right-4 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl -z-10 opacity-20 rotate-6"></div>
          </div>
        </div>
      </section>

      {/* Services/Skills Section */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Technical Expertise</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              I combine creative design with technical robustness to deliver complete solutions across various platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="mb-6 bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{skill.category}</h3>
                <ul className="space-y-3">
                  {skill.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
      <section id="portfolio" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
              <p className="text-slate-600 max-w-xl">
                A selection of projects that showcase my skills in Full-Stack, E-Commerce, and Blockchain development.
              </p>
            </div>
            <a href="https://drive.google.com/drive/folders/1RBpkcaHwzH17Cxs3QZATXxOhB3M4w-m4" target='_blank' className="text-blue-600 font-semibold flex items-center hover:gap-2 transition-all">
              View All Projects <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                
                {/* PROJECT IMAGE CONTAINER */}
                <div className="h-48 relative overflow-hidden bg-slate-200">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">{project.category}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>

                      {/* Disable the External Link on the Portolio Cards */}
                    {/* <a href="#" className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                      View Case Study <ExternalLink className="w-4 h-4 ml-2" />
                    </a> */}


                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
        onSubmit={handleSubmit} // Form submission now calls EmailJS
      >
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            placeholder="Your Name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
          <textarea
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            placeholder="Tell me about your project..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>

    <div className="mt-12 flex justify-center gap-8">
      <a href="mailto:israelthedev278@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
        <Mail className="w-5 h-5" /> israelthedev278@gmail.com
      </a>
      {/* <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
        <Globe className="w-5 h-5" /> Lagos Island, Nigeria
      </a> */}
    </div>
  </div>
</section>


      <footer className="py-8 bg-slate-950 text-slate-500 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Israel O. All rights reserved.</p>
      </footer>

      {/* --- FLOATING CONTACT BUTTON --- */}
      {/* Update 'href' below with your custom link (e.g., WhatsApp link, Calendly, etc.) */}
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

export default Portfolio;