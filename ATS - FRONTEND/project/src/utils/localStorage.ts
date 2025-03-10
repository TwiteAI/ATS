import { Candidate } from '../types/candidate';

// Local storage keys
const CANDIDATES_KEY = 'twite_ai_candidates';
const AUTH_KEY = 'twite_ai_auth';

// Auth types
export interface User {
  id: string;
  email: string;
  name?: string;
  company_name?: string;
  job_title?: string;
  phone_number?: string;
}

export interface AuthSession {
  user: User;
}

// Auth functions
export const getSession = (): AuthSession | null => {
  const sessionStr = localStorage.getItem(AUTH_KEY);
  if (!sessionStr) return null;
  
  try {
    return JSON.parse(sessionStr);
  } catch (error) {
    console.error('Failed to parse auth session:', error);
    return null;
  }
};

export const signIn = (email: string, password: string): Promise<AuthSession> => {
  return new Promise((resolve, reject) => {
    if (email && password.length >= 6) {
      const user: User = {
        id: generateUserId(email),
        email,
        name: email.split('@')[0]
      };
      
      const session: AuthSession = { user };
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      
      setTimeout(() => resolve(session), 500);
    } else {
      setTimeout(() => reject(new Error('Invalid email or password')), 500);
    }
  });
};

export const signUp = (
  email: string, 
  password: string, 
  userData: { 
    name: string, 
    company_name: string, 
    job_title: string, 
    phone_number: string 
  }
): Promise<AuthSession> => {
  return new Promise((resolve, reject) => {
    if (!email || !password || password.length < 6) {
      return reject(new Error('Invalid email or password (must be at least 6 characters)'));
    }
    
    const existingSession = getSession();
    if (existingSession && existingSession.user.email === email) {
      return reject(new Error('This email is already registered'));
    }
    
    const user: User = {
      id: generateUserId(email),
      email,
      ...userData
    };
    
    const session: AuthSession = { user };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    
    setTimeout(() => resolve(session), 500);
  });
};

export const signOut = (): Promise<void> => {
  return new Promise((resolve) => {
    localStorage.removeItem(AUTH_KEY);
    setTimeout(resolve, 300);
  });
};

export const resetPasswordForEmail = (email: string): Promise<void> => {
  return new Promise((resolve) => {
    console.log(`Password reset requested for: ${email}`);
    setTimeout(resolve, 1000);
  });
};

// Candidate functions
export const getCandidates = (search?: string): Promise<Candidate[]> => {
  return new Promise((resolve) => {
    const session = getSession();
    if (!session) {
      resolve([]);
      return;
    }
    
    const userId = session.user.id;
    const candidatesStr = localStorage.getItem(CANDIDATES_KEY);
    let allCandidates: Record<string, Candidate[]> = {};
    
    if (candidatesStr) {
      try {
        allCandidates = JSON.parse(candidatesStr);
      } catch (error) {
        console.error('Failed to parse candidates:', error);
      }
    }
    
    let userCandidates = allCandidates[userId] || [];
    
    if (search) {
      const searchLower = search.toLowerCase();
      userCandidates = userCandidates.filter(candidate => 
        candidate.name.toLowerCase().includes(searchLower) ||
        candidate.email.toLowerCase().includes(searchLower) ||
        candidate.phone.toLowerCase().includes(searchLower) ||
        (candidate.role && candidate.role.toLowerCase().includes(searchLower)) ||
        (candidate.status && candidate.status.toLowerCase().includes(searchLower)) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    userCandidates.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
    
    setTimeout(() => resolve(userCandidates), 300);
  });
};

export const addCandidate = (candidate: Omit<Candidate, 'id'>): Promise<Candidate> => {
  return new Promise((resolve, reject) => {
    const session = getSession();
    if (!session) {
      reject(new Error('You must be logged in to add candidates'));
      return;
    }
    
    const userId = session.user.id;
    const candidatesStr = localStorage.getItem(CANDIDATES_KEY);
    let allCandidates: Record<string, Candidate[]> = {};
    
    if (candidatesStr) {
      try {
        allCandidates = JSON.parse(candidatesStr);
      } catch (error) {
        console.error('Failed to parse candidates:', error);
      }
    }
    
    const userCandidates = allCandidates[userId] || [];
    
    const newCandidate: Candidate = {
      ...candidate,
      id: Date.now(),
      user_id: userId,
      created_at: new Date().toISOString(),
      status: candidate.status || 'Pending'
    };
    
    allCandidates[userId] = [newCandidate, ...userCandidates];
    localStorage.setItem(CANDIDATES_KEY, JSON.stringify(allCandidates));
    
    setTimeout(() => resolve(newCandidate), 300);
  });
};

export const updateCandidate = (id: number, candidateData: Omit<Candidate, 'id'>): Promise<Candidate> => {
  return new Promise((resolve, reject) => {
    const session = getSession();
    if (!session) {
      reject(new Error('You must be logged in to update candidates'));
      return;
    }
    
    const userId = session.user.id;
    const candidatesStr = localStorage.getItem(CANDIDATES_KEY);
    let allCandidates: Record<string, Candidate[]> = {};
    
    if (candidatesStr) {
      try {
        allCandidates = JSON.parse(candidatesStr);
      } catch (error) {
        console.error('Failed to parse candidates:', error);
        reject(new Error('Failed to update candidate'));
        return;
      }
    }
    
    const userCandidates = allCandidates[userId] || [];
    const candidateIndex = userCandidates.findIndex(c => c.id === id);
    
    if (candidateIndex === -1) {
      reject(new Error('Candidate not found'));
      return;
    }
    
    const updatedCandidate: Candidate = {
      ...candidateData,
      id,
      user_id: userId,
      created_at: userCandidates[candidateIndex].created_at
    };
    
    userCandidates[candidateIndex] = updatedCandidate;
    allCandidates[userId] = userCandidates;
    localStorage.setItem(CANDIDATES_KEY, JSON.stringify(allCandidates));
    
    setTimeout(() => resolve(updatedCandidate), 300);
  });
};

export const deleteCandidate = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const session = getSession();
    if (!session) {
      reject(new Error('You must be logged in to delete candidates'));
      return;
    }
    
    const userId = session.user.id;
    const candidatesStr = localStorage.getItem(CANDIDATES_KEY);
    let allCandidates: Record<string, Candidate[]> = {};
    
    if (candidatesStr) {
      try {
        allCandidates = JSON.parse(candidatesStr);
      } catch (error) {
        console.error('Failed to parse candidates:', error);
        reject(new Error('Failed to delete candidate'));
        return;
      }
    }
    
    const userCandidates = allCandidates[userId] || [];
    allCandidates[userId] = userCandidates.filter(c => c.id !== id);
    localStorage.setItem(CANDIDATES_KEY, JSON.stringify(allCandidates));
    
    setTimeout(resolve, 300);
  });
};

// Helper functions
function generateUserId(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `user_${Math.abs(hash)}`;
}