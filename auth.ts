import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
}

interface Session {
  user: User;
}

export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    // Replace this with your actual API call
    const response = await mockApiCall({ email, password });
    
    if (response.success) {
      localStorage.setItem('session', JSON.stringify(response.session));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Login failed');
    return false;
  }
};

export const logout = async (): Promise<void> => {
  try {
    localStorage.removeItem('session');
  } catch (error) {
    console.error('Logout error:', error);
    toast.error('Logout failed');
  }
};

export const getSession = (): Session | null => {
  try {
    const sessionStr = localStorage.getItem('session');
    if (!sessionStr) return null;
    return JSON.parse(sessionStr);
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
};

// Mock API call - Replace with actual API implementation
const mockApiCall = async (credentials: { email: string; password: string }) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful response
  return {
    success: true,
    session: {
      user: {
        id: '1',
        email: credentials.email
      }
    }
  };
};