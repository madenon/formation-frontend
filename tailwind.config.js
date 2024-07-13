/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
// louleur utilisee 
colors:{
  primary:"#2885ff",
  secondary:"#EF863E",
    },
  }
  },
  plugins: [],
}

