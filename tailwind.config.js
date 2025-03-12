/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B7280',    // Cool Gray
        secondary: '#F472B6',  // Pink
        bg: '#F3F4F6',        // Light Gray
        surface: '#FFFFFF',    // White
        success: '#34D399',    // Emerald
        error: '#F87171',      // Red
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}

