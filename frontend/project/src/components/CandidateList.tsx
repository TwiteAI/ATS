import React, { useEffect } from "react";
import { Pencil, Trash2, Calendar, DollarSign, Briefcase } from "lucide-react";
import { Candidate } from "../types/candidate";

interface CandidateListProps {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  onEdit: (candidate: Candidate) => void;
  onDelete: (candidate: Candidate) => void;
}

const CandidateList: React.FC<CandidateListProps> = ({
  candidates,
  loading,
  error,
  onEdit,
  onDelete,
}) => {
  // Debugging: Log candidates
  useEffect(() => {
    console.log("Candidates list:", candidates);
  }, [candidates]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Skills</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CTC</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interview</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center text-red-500">
                Error: {error}
              </td>
            </tr>
          ) : candidates.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                No candidates found. Add your first candidate.
              </td>
            </tr>
          ) : (
            candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50">
                {/* Name */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {candidate.name ? candidate.name : <span className="text-gray-400">No Name</span>}
                </td>

                {/* Email */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {candidate.email ? candidate.email : <span className="text-gray-400">No Email</span>}
                </td>

                {/* Role */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {candidate.role ? (
                    <div className="flex items-center">
                      <Briefcase size={16} className="mr-1 text-gray-400" />
                      {candidate.role}
                    </div>
                  ) : (
                    <span className="text-gray-400">No Role</span>
                  )}
                </td>

                {/* Skills */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {candidate.skills?.length ? candidate.skills.join(", ") : <span className="text-gray-400">No skills listed</span>}
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {candidate.status ? (
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        candidate.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : candidate.status === "Interviewing"
                          ? "bg-blue-100 text-blue-800"
                          : candidate.status === "Offered"
                          ? "bg-green-100 text-green-800"
                          : candidate.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {candidate.status}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                {/* CTC */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {candidate.current_ctc ? (
                    <div className="flex flex-col">
                      <div className="flex items-center text-gray-500">
                        <span className="text-xs">Current:</span>
                        <DollarSign size={14} className="ml-1 mr-0.5 text-gray-400" />
                        {candidate.current_ctc}
                      </div>
                      {candidate.expected_ctc && (
                        <div className="flex items-center text-gray-500">
                          <span className="text-xs">Expected:</span>
                          <DollarSign size={14} className="ml-1 mr-0.5 text-gray-400" />
                          {candidate.expected_ctc}
                        </div>
                      )}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>

                {/* Interview Date */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {candidate.interview_date ? (
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1 text-gray-400" />
                      {new Date(candidate.interview_date).toLocaleDateString()}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(candidate)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(candidate)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
