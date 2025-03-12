function NotFound() {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-surface rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-error">404</h1>
          <p className="text-primary/80">Page not found.</p>
          <a
            href="/"
            className="inline-block py-3 px-4 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }
  
  export default NotFound;