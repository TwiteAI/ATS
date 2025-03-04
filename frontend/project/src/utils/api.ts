import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const sendPasscode = async (email: string): Promise<void> => {
  await axios.post(`${API_BASE_URL}/forgot_password`, { email });
};

export const verifyPasscode = async (email: string, passcode: string): Promise<void> => {
  await axios.post(`${API_BASE_URL}/verify_passcode`, { email, passcode });
};

export const resetUserPassword = async (email: string, password: string): Promise<void> => {
  await axios.post(`${API_BASE_URL}/password_reset`, { email, password });
};

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

/**
 * Login function
 * @param credentials - User login credentials
 * @returns A promise resolving to login response
 */
export const login = async (credentials: LoginCredentials): Promise<any> => {
  try {
    console.log("Sending login request:", credentials);
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    console.log("Login response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error('Login failed:', error.response?.data?.detail || error.message);
    throw new Error(error.response?.data?.detail || 'Login failed. Please try again.');
  }
};

/**
 * Signup function
 * @param userData - New user signup data
 * @returns A promise resolving to signup response
 */
export const signup = async (userData: SignupData): Promise<any> => {
  try {
    console.log("Sending signup request:", userData);
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    console.log("Signup response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error('Signup failed:', error.response?.data?.detail || error.message);
    throw new Error(error.response?.data?.detail || 'Signup failed. Please try again.');
  }
};

/**
 * Forgot Password API - Generates a 6-digit passcode and emails it to the user
 * @param email - User's email address
 * @returns A promise resolving to a response message
 */
export const forgotPassword = async (email: string) => {
  console.log("Sending forgot password request to API..."); // Debug Log
  console.log("Email sent:", email); // Debug Log

  try {
      const response = await fetch(`${API_BASE_URL}/forgot_password`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
      });

      console.log("Response Status:", response.status); // Debug Log

      if (!response.ok) {
          console.error("Failed request:", await response.text());
          return null;
      }

      const data = await response.json();
      console.log("API Response Data:", data); // Debug Log
      return data;
  } catch (error) {
      console.error("Error in API Call:", error);
      return null;
  }
};

/**
 * Reset Password API - Resets the user's password with a passcode
 * @param email - User's email
 * @param passcode - 6-digit passcode received via email
 * @param newPassword - New password
 * @returns A promise resolving to a success message
 */
export const resetPassword = async (email: string, passcode: string, newPassword: string): Promise<any> => {
  try {
    console.log("Requesting password reset for email:", email);
    
    const response = await axios.put(`${API_BASE_URL}/reset_password`, {
      email,
      passcode,
      new_password: newPassword // ✅ Corrected key from "password" to "new_password"
    });

    console.log("Reset password response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error('Password reset failed:', error.response?.data?.detail || error.message);
    throw new Error(error.response?.data?.detail || 'Password reset failed. Please try again.');
  }
};

