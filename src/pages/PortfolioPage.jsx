import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  LayoutGrid,
  ShoppingCart,
  Bitcoin,
  Image as ImageIcon,
  LogOut,
  Lock
} from 'lucide-react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  // Category Labels Mapping
  const categoryLabels = {
    web3: "Blockchain & Web3",
    ecom: "E-Commerce",
    app: "Custom Apps",
    "Blockchain & Web3": "Blockchain & Web3",
    "E-Commerce": "E-Commerce",
    "Custom Apps": "Custom Apps",
    all: "All Projects"
  };

  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '', description: '', category: 'Web3', tags: '', mainImage: '', extraImages: '', link: ''
  });
  const [user, setUser] = useState(null);

  // Fetch Projects from Firestore
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, setUser);
    return unsubscribeAuth;
  }, [auth]);

  useEffect(() => {
    const q = query(
      collection(db, 'portfolio_projects'),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, [db]);

  // Admin Functions
  const handleSaveProject = async () => {
    console.log("Save clicked");
    
    if (!user) {
      alert("Wait for login...");
      return;
    }
    
    const imageList = [editForm.mainImage, ...editForm.extraImages.split(',')]
      .map(u => u.trim())
      .filter(u => u.length > 0);

    const data = {
      title: editForm.title,
      description: editForm.description,
      category: editForm.category,
      tags: editForm.tags.split(',').map(t => t.trim()),
      images: imageList,
      link: editForm.link,
      updatedAt: serverTimestamp()
    };

    try {
      if (editForm.id) {
        await updateDoc(doc(db, 'portfolio_projects', editForm.id), data);
      } else {
        await addDoc(collection(db, 'portfolio_projects'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      setIsEditing(false);
    } catch (error) {
      alert(`Failed to save project: ${error.message}`);
      console.error("Save error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this project?')) {
      await deleteDoc(doc(db, 'portfolio_projects', id));
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setIsAdminMode(true);
      setShowAdminLogin(false);
      setLoginEmail('');
      setLoginPassword('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdminMode(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const startEdit = (project = null) => {
    if (project) {
      setEditForm({
        id: project.id,
        title: project.title,
        description: project.description,
        category: project.category,
        tags: project.tags.join(', '),
        mainImage: project.images[0] || '',
        extraImages: project.images.slice(1).join(', '),
        link: project.link || ''
      });
    } else {
      setEditForm({
        title: '', description: '', category: 'web3', tags: '', mainImage: '', extraImages: '', link: ''
      });
    }
    setIsEditing(true);
  };

  // Filter Projects
  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeTab.toLowerCase()));

  // Category Icons
  const getCategoryIcon = (category) => {
    const normalizedCategory = categoryLabels[category] || category;
    if (normalizedCategory.toLowerCase().includes('web3') || normalizedCategory.toLowerCase().includes('blockchain')) {
      return <Bitcoin className="w-4 h-4" />;
    }
    if (normalizedCategory.toLowerCase().includes('commerce')) {
      return <ShoppingCart className="w-4 h-4" />;
    }
    return <LayoutGrid className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
              <p className="text-slate-600 max-w-xl">
                A selection of projects that showcase my skills in Full-Stack, E-Commerce, and Blockchain development.
              </p>
            </div>
            <a href="https://drive.google.com/drive/folders/1RBpkcaHwzH17Cxs3QZATXxOhB3M4w-m4" target='_blank' rel="noopener noreferrer" className="text-blue-600 font-semibold flex items-center hover:gap-2 transition-all">
              View All Projects <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'web3', label: 'Blockchain/Web3' },
              { id: 'ecom', label: 'E-Commerce' },
              { id: 'app', label: 'Custom Apps / Website' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {isAdminMode && (
              <button
                onClick={() => startEdit()}
                className="ml-auto px-4 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            )}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">

                {/* Admin Controls */}
                {isAdminMode && (
                  <div className="absolute top-3 right-3 z-10 flex gap-2">
                    <button
                      onClick={() => startEdit(project)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* PROJECT IMAGE CONTAINER */}
                <div
                  className="h-48 relative overflow-hidden bg-slate-200 cursor-pointer"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <img
                    src={project.images?.[0] || project.image || '/placeholder.png'}
                    alt={project.title}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-full text-sm font-semibold text-slate-900">
                      View Details
                    </div>
                  </div>
                  {project.images?.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-slate-900/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> {project.images.length}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">
                    {getCategoryIcon(project.category)}
                    {categoryLabels[project.category] || project.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <LayoutGrid className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No projects found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Edit Project Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto py-8">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">{editForm.id ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Project Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="BTCINU Presale Website"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Project description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="web3">Blockchain & Web3</option>
                  <option value="ecom">E-Commerce</option>
                  <option value="app">Custom Apps</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editForm.tags}
                  onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Web3, Blockchain"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Main Image URL</label>
                <input
                  type="text"
                  value={editForm.mainImage}
                  onChange={(e) => setEditForm({ ...editForm, mainImage: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Extra Images (comma-separated URLs)</label>
                <textarea
                  value={editForm.extraImages}
                  onChange={(e) => setEditForm({ ...editForm, extraImages: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  placeholder="https://image2.jpg, https://image3.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Project Link (optional)</label>
                <input
                  type="text"
                  value={editForm.link}
                  onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveProject}
                className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Project
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Login Button */}
      {!isAdminMode && (
        <button
          onClick={() => setShowAdminLogin(true)}
          className="fixed bottom-24 left-6 p-3 bg-slate-800 text-white rounded-full shadow-lg hover:bg-slate-700 transition-all opacity-20 hover:opacity-100"
          title="Admin Login"
        >
          <Lock className="w-4 h-4" />
        </button>
      )}

      {/* Admin Logout Button */}
      {isAdminMode && (
        <button
          onClick={handleLogout}
          className="fixed bottom-24 left-6 px-4 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all flex items-center gap-2"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Admin Login</h3>
              <button onClick={() => setShowAdminLogin(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
