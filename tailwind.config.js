/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        ellipse: "url('/assets/background.svg')",
        contact: "url('/assets/contact2.svg')",
        loginBG: "url('/assets/loginBackground.svg')",
       
      }),
      colors: {
        primary: '#083F46',
        secondary: '#FF8D3E',
      },
      fontFamily: {
        FutuLight: 'FutuLight',
        FutuBold: 'FutuBold',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
