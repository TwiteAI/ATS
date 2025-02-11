import axios from 'axios';

// Define types for login and signup
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  username: string;  // Changed from 'name' to 'username' to match backend
  email: string;
  company_name?: string; // Optional as per backend schema
  role: string; // Changed from 'job_title' to 'role' to match backend
  phone?: string; // Optional field
  password: string;
  confirm_password: string; // Kept this because backend validates it
}

// Define API base URL (Change this to match your backend)
const API_BASE_URL = 'http://localhost:8000'; // Removed extra "http://"

/**
 * Login function
 * @param credentials - User login credentials
 * @returns A promise resolving to login response
 */
export const login = async (credentials: LoginCredentials): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data; // If login is successful
  } catch (error: any) {
    console.error('Login failed:', error.response?.data?.detail || error.message);
    // Ensure meaningful errors are thrown
    if (error.response) {
      throw new Error(error.response.data.detail || 'Login failed. Please try again.');
    }
    throw new Error('Network error. Please check your connection.');
  }
};

/**
 * Signup function
 * @param userData - New user signup data
 * @returns A promise resolving to signup response
 */
export const signup = async (userData: SignupData): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data; // If signup is successful
  } catch (error: any) {
    console.error('Signup failed:', error.response?.data?.detail || error.message);

    // Ensure meaningful errors are thrown
    if (error.response) {
      throw new Error(error.response.data.detail || 'Signup failed. Please try again.');
    }
    throw new Error('Network error. Please check your connection.');
  }
};
