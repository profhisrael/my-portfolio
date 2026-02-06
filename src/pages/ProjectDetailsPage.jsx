import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowLeft,
  ShoppingCart,
  Bitcoin,
  LayoutGrid
} from 'lucide-react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const db = getFirestore();

  // Category Labels Mapping
  const categoryLabels = {
    web3: "Blockchain & Web3",
    ecom: "E-Commerce",
    app: "Custom Apps",
    "Blockchain & Web3": "Blockchain & Web3",
    "E-Commerce": "E-Commerce",
    "Custom Apps": "Custom Apps"
  };

  const [project, setProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        const projectDoc = await getDoc(doc(db, 'portfolio_projects', id));
        if (projectDoc.exists()) {
          setProject({ id: projectDoc.id, ...projectDoc.data() });
        } else {
          console.error('Project not found');
          navigate('/portfolio');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, db, navigate]);

  const getCategoryIcon = (category) => {
    const normalizedCategory = categoryLabels[category] || category;
    if (normalizedCategory.toLowerCase().includes('web3') || normalizedCategory.toLowerCase().includes('blockchain')) {
      return <Bitcoin className="w-5 h-5" />;
    }
    if (normalizedCategory.toLowerCase().includes('commerce')) {
      return <ShoppingCart className="w-5 h-5" />;
    }
    return <LayoutGrid className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Project not found</h2>
          <Link to="/portfolio" className="text-blue-600 hover:underline">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Portfolio
        </button>

        {/* Project Details Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          {/* Image Gallery */}
          <div className="relative h-96 bg-slate-100 flex items-center justify-center">
            <img
              src={project.images?.[currentImageIndex] || project.image || '/placeholder.png'}
              alt={project.title}
              className="max-h-full max-w-full object-contain"
            />

            {project.images?.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % project.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900/70 text-white rounded-full text-sm">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              </>
            )}
          </div>

          {/* Image Thumbnails */}
          {project.images?.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto bg-slate-50">
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx ? 'border-blue-600 scale-105' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt={`${project.title} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Project Info */}
          <div className="p-8">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-3">
              {getCategoryIcon(project.category)}
              {categoryLabels[project.category] || project.category}
            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-4">{project.title}</h1>

            <p className="text-slate-600 text-lg mb-6 leading-relaxed">{project.description}</p>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag, idx) => (
                  <span key={idx} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Link */}
            {project.link && (
              <div className="flex gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                  View Live Project <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Related Projects Section (Optional - can be implemented later) */}
        <div className="mt-12 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            View More Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
