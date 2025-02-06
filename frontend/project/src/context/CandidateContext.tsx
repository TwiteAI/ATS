import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { Candidate } from '../types/candidate';
import toast from 'react-hot-toast';

interface CandidateContextType {
  candidates: Candidate[];
  loading: boolean;
  fetchCandidates: (search?: string) => Promise<void>;
  addCandidate: (candidate: Omit<Candidate, 'id'>) => Promise<void>;
  updateCandidate: (id: number, candidate: Omit<Candidate, 'id'>) => Promise<void>;
  deleteCandidate: (id: number) => Promise<void>;
}

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:8080/api/candidates';

  const fetchCandidates = useCallback(async (search?: string) => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL + (search ? `?search=${search}` : ''));
      setCandidates(response.data);
    } catch (error) {
      toast.error('Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  }, []);

  const addCandidate = async (candidate: Omit<Candidate, 'id'>) => {
    try {
      setLoading(true);
      await axios.post(API_URL, candidate);
      toast.success('Candidate added successfully');
      await fetchCandidates();
    } catch (error) {
      toast.error('Failed to add candidate');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCandidate = async (id: number, candidate: Omit<Candidate, 'id'>) => {
    try {
      setLoading(true);
      await axios.put(`${API_URL}/${id}`, candidate);
      toast.success('Candidate updated successfully');
      await fetchCandidates();
    } catch (error) {
      toast.error('Failed to update candidate');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidate = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      toast.success('Candidate deleted successfully');
      await fetchCandidates();
    } catch (error) {
      toast.error('Failed to delete candidate');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        loading,
        fetchCandidates,
        addCandidate,
        updateCandidate,
        deleteCandidate,
      }}
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