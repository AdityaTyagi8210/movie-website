import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, initialView, onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(initialView === 'login');
  const [formData, setFormData] = useState({ username: '', email: '', password: '', identifier: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync state if initialView changes externally
  React.useEffect(() => {
    if (isOpen) {
      setIsLoginView(initialView === 'login');
      setError('');
      setFormData({ username: '', email: '', password: '', identifier: '' });
    }
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const BASE_URL = "https://movie-website-1-1.onrender.com";

const url = isLoginView 
  ? `${BASE_URL}/api/auth/login`
  : `${BASE_URL}/api/auth/register`;

    const payload = isLoginView 
      ? { username: formData.identifier, email: formData.identifier, password: formData.password }
      : { username: formData.username, email: formData.email, password: formData.password };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        // withCredentials: true
      });
      // Mock or real user object
      const userObj = {
        username: response.data.user?.username || payload.username || payload.email?.split('@')[0] || 'User',
        token: response.data.accessToken || ''
      };
      console.log('Auth success:', response.data);
      onLoginSuccess(userObj);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Authentication failed. Please check if the backend server is running on port 3000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay glass" onClick={onClose}>
      <div className="auth-modal glass" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        <h2 className="modal-title text-gradient">{isLoginView ? 'Welcome Back' : 'Create Account'}</h2>
        
        {error && <div className="modal-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="modal-form">
          {isLoginView ? (
            <input 
              type="text" name="identifier" placeholder="Email or Username" 
              value={formData.identifier} onChange={handleChange} required
              className="modal-input"
            />
          ) : (
            <>
              <input 
                type="text" name="username" placeholder="Username" 
                value={formData.username} onChange={handleChange} required
                className="modal-input"
              />
              <input 
                type="email" name="email" placeholder="Email" 
                value={formData.email} onChange={handleChange} required
                className="modal-input"
              />
            </>
          )}
          <input 
            type="password" name="password" placeholder="Password" 
            value={formData.password} onChange={handleChange} required 
            className="modal-input"
          />
          <button type="submit" className="featured-button modal-submit-btn" disabled={loading}>
            {loading ? 'Processing...' : (isLoginView ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <p className="modal-switch">
          {isLoginView ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLoginView(!isLoginView)}>
            {isLoginView ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
