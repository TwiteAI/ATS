import { useState } from 'react';
import toast from 'react-hot-toast';

interface LoginFormProps {
  onSwitch: () => void;
  onLoginSuccess: (credentials: { email: string; password: string }) => Promise<any>;
  onForgotPassword: () => void; // Prop for Forgot Password navigation
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch, onLoginSuccess, onForgotPassword }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    toast.dismiss();

    try {
      await onLoginSuccess(formData);
      toast.success('Login successful!');
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Login to Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>

        {/* Navigate to Forgot Password Page */}
        <button type="button" onClick={onForgotPassword} className="text-blue-600 font-medium hover:underline mt-2">
          Forgot Password?
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
