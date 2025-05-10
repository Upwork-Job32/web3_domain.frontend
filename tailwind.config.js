module.exports = {
  content: ['./dist/**/*.html', './src/**/*.{js,jsx,ts,tsx}', './*.html'],
  theme: {
    extend: {
      keyframes: {
        'confetti-1': {
          '0%': { transform: 'translateY(0) rotate(0)' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)' }
        },
        'confetti-2': {
          '0%': { transform: 'translateY(0) rotate(0)' },
          '100%': { transform: 'translateY(100vh) rotate(-360deg)' }
        },
        'confetti-3': {
          '0%': { transform: 'translateY(0) rotate(0)' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)' }
        },
        'confetti-4': {
          '0%': { transform: 'translateY(0) rotate(0)' },
          '100%': { transform: 'translateY(100vh) rotate(-720deg)' }
        },
        'confetti-5': {
          '0%': { transform: 'translateY(0) rotate(0)' },
          '100%': { transform: 'translateY(100vh) rotate(1080deg)' }
        },
        'confetti-6': {
          '0%': { transform: 'translateY(0) rotate(0)' },
          '100%': { transform: 'translateY(100vh) rotate(-1080deg)' }
        }
      },
      animation: {
        'confetti-1': 'confetti-1 3s linear infinite',
        'confetti-2': 'confetti-2 3.5s linear infinite',
        'confetti-3': 'confetti-3 4s linear infinite',
        'confetti-4': 'confetti-4 4.5s linear infinite',
        'confetti-5': 'confetti-5 5s linear infinite',
        'confetti-6': 'confetti-6 5.5s linear infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
  variants: {
    extend: {
      opacity: ['disabled'],
      scrollbar: ['rounded'] // Optional: enable more variants for scrollbar
    }
  }
}
