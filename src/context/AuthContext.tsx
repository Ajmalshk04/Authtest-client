import { createContext, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AuthContext = createContext();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    },
  },
});

export const AuthProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{}}>
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export const useAuthContext = () => useContext(AuthContext);