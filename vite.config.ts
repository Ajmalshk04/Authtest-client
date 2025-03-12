import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const baseUrl = env.REACT_APP_API_URL || 'http://localhost:5555';
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    console.error(`Error: REACT_APP_API_URL must be a valid URL. Got: ${baseUrl}`);
    process.exit(1);
  }

  console.log(`Mode: ${mode}, Proxy target: ${baseUrl}`);

  return {
    plugins: [react()],
    server: {
      // port: 5174, // Fix the port to avoid random changes (5174 vs 5173)
      proxy: {
        '/api': {
          target: baseUrl,
          changeOrigin: true,
          secure: mode === 'production', // Use HTTPS in production
          // No rewrite needed since backend expects /api/v1
        },
      },
    },
    define: {
      // 'import.meta.env.VITE_RAZORPAY_KEY_ID': JSON.stringify(env.VITE_RAZORPAY_KEY_ID),
      'import.meta.env.REACT_APP_API_URL': JSON.stringify(baseUrl), // Expose to client
    },
  };
});
