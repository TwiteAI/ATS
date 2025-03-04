import React, { useState, useEffect } from 'react';
import { useCandidates } from '../context/CandidateContext';
import SearchBar from './SearchBar';
import CandidateForm from './CandidateForm';
import CandidateList from './CandidateList';
import DeleteConfirmation from './DeleteConfirmation';
import { Pencil, Trash2, Plus, Users, Calendar, FileText, BarChart2, ExternalLink } from 'lucide-react';
import { Candidate } from '../types/candidate';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { candidates, loading, fetchCandidates, addCandidate, updateCandidate, deleteCandidate } = useCandidates();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        await fetchCandidates();
        setFetchError(null);
      } catch (error: any) {
        console.error("Error in useEffect:", error);
        setFetchError(error.message || 'Failed to fetch candidates');
      }
    };
    
    loadCandidates();
  }, [fetchCandidates]);

  const handleEdit = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowEditForm(true);
  };

  const handleDelete = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedCandidate?.id) {
      try {
        await deleteCandidate(selectedCandidate.id);
        setShowDeleteConfirm(false);
      } catch (error) {
        console.error("Error deleting candidate:", error);
        toast.error("Failed to delete candidate");
      }
    }
  };

  const handleAddCandidate = async (candidate: Omit<Candidate, 'id'>) => {
    try {
      await addCandidate(candidate);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  const handleUpdateCandidate = async (id: number, candidate: Omit<Candidate, 'id'>) => {
    try {
      await updateCandidate(id, candidate);
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };

  // Get current date for "this week" calculation
  const getThisWeekCandidates = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return candidates.filter(candidate => {
      if (!candidate.created_at) return false;
      const createdDate = new Date(candidate.created_at);
      return createdDate >= oneWeekAgo;
    }).length;
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Candidates" 
          value={candidates.length} 
          icon={<Users className="h-6 w-6 text-cyan-400" />} 
        />
        <StatCard 
          title="New This Week" 
          value={getThisWeekCandidates()} 
          icon={<Users className="h-6 w-6 text-cyan-400" />}
          change={getThisWeekCandidates() > 0 ? "+100%" : "0%"}
        />
        <StatCard 
          title="Upcoming Interviews" 
          value={0} 
          icon={<Calendar className="h-6 w-6 text-cyan-400" />} 
        />
        <StatCard 
          title="Pending Review" 
          value={0} 
          icon={<FileText className="h-6 w-6 text-cyan-400" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Statistics */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Application Statistics</h2>
            <button className="text-cyan-400 flex items-center gap-1 text-sm">
              View all <ExternalLink size={14} />
            </button>
          </div>
          
          <div className="h-64 flex items-end justify-around">
            <ChartBar label="Total" value={candidates.length} color="rgb(45, 212, 191)" />
            <ChartBar label="New" value={getThisWeekCandidates()} color="rgb(45, 212, 191)" />
            <ChartBar label="Interviews" value={0} color="rgb(20, 184, 166)" />
            <ChartBar label="Pending" value={0} color="rgb(13, 148, 136)" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
          
          <div className="space-y-4">
            <button 
              onClick={() => setShowAddForm(true)}
              className="w-full bg-cyan-500 text-white py-3 px-4 rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
            >
              <Users size={20} />
              Add New Candidate
            </button>
            
            <button 
              onClick={() => setActiveTab('candidates')}
              className="w-full border border-gray-600 text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <Users size={20} />
              View All Candidates
            </button>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                  <ExternalLink size={16} />
                  Interview Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                  <ExternalLink size={16} />
                  Hiring Best Practices
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCandidatesList = () => (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Candidate Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Candidate
        </button>
      </div>

      <div className="mb-6">
        <SearchBar />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Skills</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-300">
                  Loading...
                </td>
              </tr>
            ) : fetchError ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-red-400">
                  Error: {fetchError}
                </td>
              </tr>
            ) : candidates.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-300">
                  No candidates found. Add your first candidate using the button above.
                </td>
              </tr>
            ) : (
              candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{candidate.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{candidate.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{candidate.phone}</td>
                  <td className="px-6 py-4 text-gray-300">{candidate.skills.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{candidate.experience} years</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(candidate)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(candidate)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'dashboard'
              ? 'text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'candidates'
              ? 'text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('candidates')}
        >
          Candidates
        </button>
      </div>

      {/* Welcome Message */}
      {activeTab === 'dashboard' && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome back, Twite AI</p>
        </div>
      )}

      {activeTab === 'dashboard' ? renderDashboard() : renderCandidatesList()}

      {showAddForm && (
        <CandidateForm
          onSubmit={handleAddCandidate}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {showEditForm && selectedCandidate && (
        <CandidateForm
          initialValues={selectedCandidate}
          onSubmit={(values) => {
            if (selectedCandidate.id) {
              return handleUpdateCandidate(selectedCandidate.id, values);
            }
            return Promise.reject('No candidate ID');
          }}
          onClose={() => setShowEditForm(false)}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmation
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
};

// Stat Card Component
const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  change?: string;
}> = ({ title, value, icon, change }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
          <p className="text-3xl font-bold mt-2 text-white">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className="text-green-500 text-sm bg-green-900 bg-opacity-50 px-2 py-0.5 rounded">
                {change}
              </span>
              <span className="text-gray-400 text-xs ml-2">vs last period</span>
            </div>
          )}
        </div>
        <div className="bg-cyan-900 bg-opacity-50 p-3 rounded-full">{icon}</div>
      </div>
    </div>
  );
};

// Chart Bar Component
const ChartBar: React.FC<{
  label: string;
  value: number;
  color: string;
}> = ({ label, value, color }) => {
  // Calculate height based on value (minimum 10% height for visibility)
  const height = value === 0 ? '10%' : `${Math.max(10, Math.min(100, value * 10))}%`;
  
  return (
    <div className="flex flex-col items-center w-16">
      <div className="h-full w-full flex items-end justify-center">
        <div 
          className="w-12 rounded-t-md" 
          style={{ height, backgroundColor: color }}
        ></div>
      </div>
      <p className="text-gray-400 text-sm mt-2">{label}</p>
    </div>
  );
};

export default Dashboard;