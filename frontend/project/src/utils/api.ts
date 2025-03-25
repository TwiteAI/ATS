import axios from 'axios';
import { Candidate } from '../types/candidate'; // Ensure this type is defined in your project

const API_BASE_URL = 'http://127.0.0.1:8000'; // Centralized base URL

// Define types for login and signup
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  username: string;
  email: string;
  company_name?: string;
  role: string;
  phone?: string;
  password: string;
  confirm_password: string;
}

// Login API
export const login = async (credentials: LoginCredentials): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    
    // ✅ Store token after successful login
    const { token } = response.data;
    if (token) {
      localStorage.setItem("token", token);
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Login failed:', error.response?.data?.detail || error.message);
    throw new Error(error.response?.data?.detail || 'Login failed. Please try again.');
  }
};

// Signup API
export const signup = async (userData: SignupData): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error: any) {
    console.error('Signup failed:', error.response?.data?.detail || error.message);
    throw new Error(error.response?.data?.detail || 'Signup failed. Please try again.');
  }
};

// Forgot Password API
export const forgotPassword = async (email: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot_password`, { email });
    return response.data;
  } catch (error: any) {
    console.error('Forgot password failed:', error.response?.data?.detail || error.message);
    throw new Error(error.response?.data?.detail || 'Forgot password failed. Please try again.');
  }
};

// Reset Password API
export const resetPassword = async (email: string, passcode: string, newPassword: string): Promise<any> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/reset_password`, {
      email,
      passcode,
      new_password: newPassword,
    });
    return response.data;
  } catch (error: any) {
    console.error('Password reset failed:', error.response?.data?.detail || error.message);
    throw new Error(error.response?.data?.detail || 'Password reset failed. Please try again.');
  }
};

// Create Candidate API
export const createCandidate = async (candidateData: Candidate): Promise<Candidate> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_candidates`, candidateData);
    return response.data; // Ensure the backend returns the created candidate
  } catch (error: any) {
    console.error('Create candidate failed:', error.response?.data?.detail || error.message);
    throw new Error(error.response?.data?.detail || 'Create candidate failed. Please try again.');
  }
};

// Retrieve Candidates API
export const retrieveCandidates = async (): Promise<Candidate[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/retrieve_candidates`);
    return response.data; // Ensure the backend returns an array of candidates
  } catch (error: any) {
    console.error('Retrieve candidates failed:', error.response?.data?.detail || error.message);
    throw new Error(error.response?.data?.detail || 'Retrieve candidates failed. Please try again.');
  }
};

// Update Candidate API
export const updateCandidate = async (id: number, candidateData: Candidate): Promise<Candidate> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update_candidates/${id}`, candidateData);
    return response.data; // Ensure the backend returns the updated candidate
  } catch (error: any) {
    console.error('Update candidate failed:', error.response?.data?.detail || error.message);
    throw new Error(error.response?.data?.detail || 'Update candidate failed. Please try again.');
  }
};

// Delete Candidate API
export const deleteCandidate = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/delete_candidates/${id}`);
  } catch (error: any) {
    console.error('Delete candidate failed:', error.response?.data?.detail || error.message);
    throw new Error(error.response?.data?.detail || 'Delete candidate failed. Please try again.');
  }
};