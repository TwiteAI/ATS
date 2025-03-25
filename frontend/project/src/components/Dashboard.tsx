import React, { useState, useEffect } from "react";
import { useCandidates } from "../context/CandidateContext";
import SearchBar from "./SearchBar";
import CandidateForm from "./CandidateForm";
import DeleteConfirmation from "./DeleteConfirmation";
import CandidateList from "./CandidateList"; // ✅ Import CandidateList
import { Plus } from "lucide-react";
import { Candidate } from "../types/candidate";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); // ✅ Move inside component body

  const {
    candidates,
    loading,
    fetchCandidates,
    addCandidate,
    updateCandidate,
    deleteCandidate,
  } = useCandidates();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, redirecting...");
      navigate("/login");
      return;
    }
  
    const loadCandidates = async () => {
      try {
        await fetchCandidates();
        setFetchError(null);
      } catch (error: any) {
        console.error("Error fetching candidates:", error);
        setFetchError(error.message || "Failed to fetch candidates");
      }
    };
    loadCandidates();
  }, []); // Run only once on mount
  
  const handleEdit = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowEditForm(true);
  };

  const handleDelete = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedCandidate?.id !== undefined) {
      try {
        await deleteCandidate(selectedCandidate.id);
        setShowDeleteConfirm(false);
        setSelectedCandidate(null);
        toast.success("Candidate deleted successfully");
      } catch (error) {
        console.error("Error deleting candidate:", error);
        toast.error("Failed to delete candidate");
      }
    } else {
      toast.error("No candidate selected for deletion");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "dashboard"
              ? "text-cyan-400 border-b-2 border-cyan-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "candidates"
              ? "text-cyan-400 border-b-2 border-cyan-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("candidates")}
        >
          Candidates
        </button>
      </div>

      {activeTab === "dashboard" ? (
        <div>
          <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
          <p className="text-gray-400">Welcome back, Twite AI</p>
        </div>
      ) : (
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
          <SearchBar />

          {/* ✅ Use CandidateList component */}
          <CandidateList
            candidates={candidates}
            loading={loading}
            error={fetchError}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {showAddForm && <CandidateForm onSubmit={addCandidate} onClose={() => setShowAddForm(false)} />}

      {showEditForm && selectedCandidate && (
        <CandidateForm
          initialValues={selectedCandidate}
          onSubmit={async (values) => {
            if (selectedCandidate?.id !== undefined) {
              await updateCandidate(selectedCandidate.id, values);
            }
          }}
          onClose={() => setShowEditForm(false)}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmation
          title="Delete Candidate"
          message={`Are you sure you want to delete ${selectedCandidate?.name}? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
