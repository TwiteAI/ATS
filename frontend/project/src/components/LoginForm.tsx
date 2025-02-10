import { useState } from 'react';
import toast from 'react-hot-toast';

interface LoginFormProps {
  onSwitch: () => void;
  onLoginSuccess: (credentials: { email: string; password: string }) => Promise<Response>; // Accepts credentials
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onLoginSuccess(formData); // Pass credentials
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Error logging in, please try again!');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Login to Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Don't have an account?{' '}
        <button onClick={onSwitch} className="text-blue-600 font-medium hover:underline">Sign Up</button>
      </p>
    </div>
  );
};

export default LoginForm;
