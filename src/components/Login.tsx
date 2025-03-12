import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, loginLoading, loginError } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials || !credentials.email || !credentials.password) {
      console.error('Credentials are invalid:', credentials);
      return;
    }
    console.log('Submitting credentials:', credentials);
    login(credentials); // Ensure this matches the variable name
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-primary text-center">Login</h2>
        {loginError && (
          <p className="text-error text-center bg-error/10 p-2 rounded-lg">
            {loginError.message}
          </p>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="Email"
              required
              disabled={loginLoading}
              className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-secondary text-primary placeholder-primary/50 bg-surface"
            />
          </div>
          <div>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Password"
              required
              disabled={loginLoading}
              className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-secondary text-primary placeholder-primary/50 bg-surface"
            />
          </div>
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-3 px-4 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {loginLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;