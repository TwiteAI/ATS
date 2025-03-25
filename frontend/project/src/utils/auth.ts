import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { login as apiLogin, signup as apiSignup } from './api';

// Define User Interface
interface User {
  id: string;
  email: string;
  exp: number; // Expiration timestamp
}

// ✅ Store Token in Local Storage
export const storeToken = (token: string) => {
  localStorage.setItem('token', token);
};

// ✅ Get Token from Local Storage
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// ✅ Decode & Verify Token
export const decodeToken = (): User | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded: User = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      logout();
      return null;
    }
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    logout();
    return null;
  }
};

// ✅ Login Function
export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await apiLogin({ email, password });

    if (!response || !response.access_token) {
      throw new Error('Invalid response from server');
    }

    storeToken(response.access_token); // ✅ Store only token
    return true;
  } catch (error) {
    console.error('Login error:', error);
    toast.error(error instanceof Error ? error.message : 'Login failed');
    return false;
  }
};

// ✅ Signup Function
export const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
  try {
    const response = await apiSignup({
      username: name,
      email,
      password,
      confirm_password: password,
      role: 'user', // Default role
    });

    if (!response || !response.access_token) {
      throw new Error('Invalid response from server');
    }

    storeToken(response.access_token); // ✅ Store only token
    return true;
  } catch (error) {
    console.error('Sign-up error:', error);
    toast.error(error instanceof Error ? error.message : 'Sign-up failed');
    return false;
  }
};

// ✅ Logout Function
export const logout = async (): Promise<void> => {
  try {
    localStorage.removeItem('token'); // ✅ Remove token
    toast.success('Logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
    toast.error('Logout failed');
  }
};

// ✅ Fetch Session Function (Decode Token Instead of API Call)
export const getSession = async (): Promise<User | null> => {
  return decodeToken();
};
