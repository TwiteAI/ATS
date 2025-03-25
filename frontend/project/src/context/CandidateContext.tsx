import React, { createContext, useContext, useState, useCallback } from 'react';
import { Candidate } from '../types/candidate';
import { retrieveCandidates, createCandidate, deleteCandidate as deleteCandidateApi, updateCandidate as updateCandidateApi } from '../utils/api';

interface CandidateContextProps {
  candidates: Candidate[];
  loading: boolean;
  fetchCandidates: () => Promise<void>;
  addCandidate: (candidate: Candidate) => Promise<void>;
  updateCandidate: (id: number, candidate: Candidate) => Promise<void>;
  deleteCandidate: (id: number) => Promise<void>;
}

const CandidateContext = createContext<CandidateContextProps | undefined>(undefined);

export const CandidateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all candidates
  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    try {
      const data = await retrieveCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new candidate
  const addCandidate = async (candidate: Candidate) => {
    try {
      const newCandidate = await createCandidate(candidate);
      setCandidates((prev) => [...prev, newCandidate]);
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  // Update an existing candidate
  const updateCandidate = async (id: number, candidate: Candidate) => {
    try {
      const updatedCandidate = await updateCandidateApi(id, candidate);
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? updatedCandidate : c))
      );
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  // Delete a candidate
  const deleteCandidate = async (id: number) => {
    try {
      await deleteCandidateApi(id);
      setCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  return (
    <CandidateContext.Provider
      value={{ candidates, loading, fetchCandidates, addCandidate, updateCandidate, deleteCandidate }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidates = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidates must be used within a CandidateProvider');
  }
  return context;
};