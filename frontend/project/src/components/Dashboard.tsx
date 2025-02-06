import React, { useState, useEffect } from 'react';
import { useCandidates } from '../context/CandidateContext';
import SearchBar from './SearchBar';
import CandidateForm from './CandidateForm';
import DeleteConfirmation from './DeleteConfirmation';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Candidate } from '../types/candidate';

const Dashboard: React.FC = () => {
  const { candidates, loading, fetchCandidates, addCandidate, updateCandidate, deleteCandidate } = useCandidates();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    fetchCandidates();
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
      await deleteCandidate(selectedCandidate.id);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-xl">
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Skills</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 bg-opacity-50 divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-300">
                    Loading...
                  </td>
                </tr>
              ) : candidates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-300">
                    No candidates found
                  </td>
                </tr>
              ) : (
                candidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-800">
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

      {showAddForm && (
        <CandidateForm
          onSubmit={addCandidate}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {showEditForm && selectedCandidate && (
        <CandidateForm
          initialValues={selectedCandidate}
          onSubmit={(values) => {
            if (selectedCandidate.id) {
              return updateCandidate(selectedCandidate.id, values);
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

export default Dashboard;