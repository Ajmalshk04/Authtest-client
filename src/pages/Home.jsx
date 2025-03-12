function Home() {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-surface rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-primary">Welcome</h1>
          <p className="text-primary/80">
            Please{' '}
            <a href="/login" className="text-secondary hover:underline">
              login
            </a>{' '}
            or{' '}
            <a href="/register" className="text-secondary hover:underline">
              register
            </a>{' '}
            to continue.
          </p>
        </div>
      </div>
    );
  }
  
  export default Home;