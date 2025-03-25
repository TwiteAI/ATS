import React, { createContext, useContext, useState, useCallback } from 'react';
import { Candidate } from '../types/candidate';
import toast from 'react-hot-toast';
import { supabase } from '../utils/supabase';

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

  const fetchCandidates = useCallback(async (search?: string) => {
    try {
      setLoading(true);
      let query = supabase.from('candidates').select('*');

      if (search) {
        query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,skills.cs.{${search}}`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCandidates(data || []);
    } catch (error: any) {
      console.error('Error fetching candidates:', error);
      toast.error('Failed to fetch candidates: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  const addCandidate = async (candidate: Omit<Candidate, 'id'>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('candidates')
        .insert([candidate])
        .select()
        .single();

      if (error) throw error;

      toast.success('Candidate added successfully');
      await fetchCandidates();
    } catch (error: any) {
      console.error('Error adding candidate:', error);
      toast.error('Failed to add candidate: ' + (error.message || 'Unknown error'));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCandidate = async (id: number, candidate: Omit<Candidate, 'id'>) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('candidates')
        .update(candidate)
        .eq('id', id);

      if (error) throw error;

      toast.success('Candidate updated successfully');
      await fetchCandidates();
    } catch (error: any) {
      console.error('Error updating candidate:', error);
      toast.error('Failed to update candidate: ' + (error.message || 'Unknown error'));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidate = async (id: number) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('candidates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Candidate deleted successfully');
      await fetchCandidates();
    } catch (error: any) {
      console.error('Error deleting candidate:', error);
      toast.error('Failed to delete candidate: ' + (error.message || 'Unknown error'));
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
