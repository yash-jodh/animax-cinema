import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    try {
      // Corrected POST request
      const { data } = await axios.post(`http://localhost:5000${endpoint}`, formData);
      if (isLogin) {
        localStorage.setItem('token', data.token); // Store JWT
        navigate('/');
      } else {
        alert("Account created! Logging in...");
        setIsLogin(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.msg || "Authentication failed.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative">
       {/* Use your index.css primary color for buttons */}
       <div className="w-full max-w-md bg-card p-8 rounded-lg border border-border">
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">ANIMAX</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input type="text" placeholder="Username" className="w-full p-3 rounded bg-secondary border border-border"
                     onChange={(e) => setFormData({...formData, username: e.target.value})} required />
            )}
            <input type="email" placeholder="Email" className="w-full p-3 rounded bg-secondary border border-border"
                   onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            <input type="password" placeholder="Password" className="w-full p-3 rounded bg-secondary border border-border"
                   onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            <button type="submit" className="w-full btn-primary justify-center">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-sm text-muted-foreground hover:text-foreground">
            {isLogin ? "New to Animax? Create account" : "Already have an account? Sign in"}
          </button>
       </div>
    </div>
  );
};

export default Auth;