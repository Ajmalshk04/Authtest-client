import { useAuth } from '../hooks/useAuth';

function Dashboard() {
  const { user, logout, logoutLoading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
        <p className="text-primary/80">Welcome, {user?.email}</p>
        <button
          onClick={() => logout()}
          disabled={logoutLoading}
          className="w-full py-3 px-4 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {logoutLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;