import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setCsrfToken } from '../api/axiosInstance';

export const useAuth = () => {
  const [csrfToken, setCsrfTokenState] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (credentials) => {
      if (!credentials || !credentials.email || !credentials.password) {
        console.error('Credentials are invalid in mutationFn:', credentials);
        throw new Error('Credentials are not defined or incomplete');
      }
      console.log('Sending login request with:', credentials);
      return axiosInstance.post('/api/auth/login', credentials);
    },
    onSuccess: async (response) => {
      console.log('Login success:', response.data);
      const { csrfToken = '', email } = response.data;
      if (!email) {
        console.warn('Email not returned from backend');
      }
      // Set CSRF token and wait for state to update
      await new Promise((resolve) => {
        setCsrfTokenState(csrfToken);
        setCsrfToken(csrfToken);
        setTimeout(resolve, 0); // Ensure state update is queued
      });
      queryClient.setQueryData(['user'], { email });
      console.log('CSRF token set:', csrfToken);
      console.log('Navigating to /dashboard with user:', { email });
      try {
        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.error('Navigation error:', err);
      }
    },
    onError: (error) => {
      console.error('Login error:', error.response?.data || error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (credentials) => {
      if (!credentials || !credentials.email || !credentials.password) {
        console.error('Credentials are invalid in mutationFn:', credentials);
        throw new Error('Credentials are not defined or incomplete');
      }
      console.log('Sending register request with:', credentials);
      return axiosInstance.post('/api/auth/register', credentials);
    },
    onSuccess: async (response) => {
      console.log('Register success:', response.data);
      const { csrfToken = '', email } = response.data;
      await new Promise((resolve) => {
        setCsrfTokenState(csrfToken);
        setCsrfToken(csrfToken);
        setTimeout(resolve, 0);
      });
      queryClient.setQueryData(['user'], { email });
      console.log('CSRF token set:', csrfToken);
      console.log('Navigating to /dashboard with user:', { email });
      try {
        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.error('Navigation error:', err);
      }
    },
    onError: (error) => {
      console.error('Register error:', error.response?.data || error.message);
    },
  });

  const refreshToken = useCallback(async () => {
    try {
      const response = await axiosInstance.post('/api/auth/refresh');
      console.log('Refresh success:', response.data);
      const { csrfToken } = response.data;
      setCsrfTokenState(csrfToken);
      setCsrfToken(csrfToken);
      return true;
    } catch (error) {
      console.error('Refresh error:', error.response?.data || error.message);
      setCsrfTokenState(null);
      setCsrfToken(null);
      navigate('/login');
      return false;
    }
  }, [navigate]);

  const logoutMutation = useMutation({
    mutationFn: () => axiosInstance.post('/api/auth/logout'),
    onSuccess: () => {
      console.log('Logout success');
      setCsrfTokenState(null);
      setCsrfToken(null);
      queryClient.setQueryData(['user'], null);
      navigate('/');
    },
  });

  const fetchUser = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/auth/me');
      console.log('Fetch user success:', response.data);
      queryClient.setQueryData(['user'], response.data.user);
      return response.data.user;
    } catch (error) {
      console.error('Fetch user error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed) {
          const retryResponse = await axiosInstance.get('/api/auth/me');
          queryClient.setQueryData(['user'], retryResponse.data.user);
          return retryResponse.data.user;
        }
      }
      return null;
    }
  }, [refreshToken]);

  return {
    isAuthenticated: !Boolean(csrfToken),
    user: queryClient.getQueryData(['user']),
    login: loginMutation.mutate,
    loginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    registerLoading: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: logoutMutation.mutate,
    logoutLoading: logoutMutation.isPending,
    fetchUser,
    refreshToken,
  };
};