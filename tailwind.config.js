/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

const customDarkTheme = {
  layout: {
    backgroundColor: '#161616', // Change this to your desired dark background color
    // You can also add other layout properties as needed
  },
};

const nextUiConfig = {
  defaultTheme: 'dark',
  themes: {
    dark: customDarkTheme,
  },
};


module.exports = {
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  
  theme: {
    extend: {
      colors:{
        "form-dark":"#1e1e22",
        "border-dark":"#2F2E31",
        
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    defaultTheme:"dark",
    themes:{
      dark:{
        layout:{
          
        },
        colors:{
          background:'#00000',
        },
      }
    }
  }),
  require('@headlessui/tailwindcss'),
  require('@tailwindcss/forms')
],
};
