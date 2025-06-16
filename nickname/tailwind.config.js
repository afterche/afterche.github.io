/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#6366F1', // Confident indigo - indigo-500
        'primary-50': '#EEF2FF', // Light indigo tint - indigo-50
        'primary-100': '#E0E7FF', // Lighter indigo - indigo-100
        'primary-600': '#4F46E5', // Darker indigo - indigo-600
        'primary-700': '#4338CA', // Deep indigo - indigo-700
        
        // Secondary Colors
        'secondary': '#8B5CF6', // Complementary purple - violet-500
        'secondary-50': '#F5F3FF', // Light purple tint - violet-50
        'secondary-100': '#EDE9FE', // Lighter purple - violet-100
        'secondary-600': '#7C3AED', // Darker purple - violet-600
        
        // Accent Colors
        'accent': '#F59E0B', // Warm amber - amber-500
        'accent-50': '#FFFBEB', // Light amber tint - amber-50
        'accent-100': '#FEF3C7', // Lighter amber - amber-100
        'accent-600': '#D97706', // Darker amber - amber-600
        
        // Background Colors
        'background': '#FAFAF9', // Warm off-white - stone-50
        'surface': '#FFFFFF', // Pure white - white
        
        // Text Colors
        'text-primary': '#1F2937', // Rich charcoal - gray-800
        'text-secondary': '#6B7280', // Balanced gray - gray-500
        'text-muted': '#9CA3AF', // Light gray - gray-400
        
        // Status Colors
        'success': '#10B981', // Fresh green - emerald-500
        'success-50': '#ECFDF5', // Light green tint - emerald-50
        'success-100': '#D1FAE5', // Lighter green - emerald-100
        
        'warning': '#F59E0B', // Amber warning - amber-500
        'warning-50': '#FFFBEB', // Light amber tint - amber-50
        'warning-100': '#FEF3C7', // Lighter amber - amber-100
        
        'error': '#EF4444', // Clear red - red-500
        'error-50': '#FEF2F2', // Light red tint - red-50
        'error-100': '#FEE2E2', // Lighter red - red-100
        
        // Border Colors
        'border': '#E5E7EB', // Neutral border - gray-200
        'border-light': '#F3F4F6', // Light border - gray-100
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'body': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'caption': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'data': ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'moderate': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'interactive': '8px',
        'content': '12px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      transitionTimingFunction: {
        'smooth': 'ease-out',
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      animation: {
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}