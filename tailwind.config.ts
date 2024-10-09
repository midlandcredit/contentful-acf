import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/**/*.{js,jsx,ts,tsx}',
    
  ],
  
  theme: {
    screens: {
      'tablet' : '615px',
      'laptop' : '1024px'
    },
    backgroundSize: {
      '55%' : '55%'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        
      },
      backgroundPosition: {
        'right-middle': 'bottom 160px right 100px',
        'mobile-right-middle' : 'bottom 60% left 93%'
      },
      borderRadius: {
        '45px' : '45px'
      },
      colors: {
        'morning-sky-blue' : '#DFE8F8',
        'midnight-blue' : '#143B62',
        'muted-medium-blue' : '#7991AD',
        'steel-blue' : '#7991AD',
        'alice-blue' : '#F8FAFF'
      },
      fontSize : {
        'standard': '12px',
        '3.1vw': '3.1vw',
        '2.65vw': '2.65vw',
        'clamp-title' : 'clamp(20px, 2.65vw, 40px)',
        'clamp-button' : 'clamp(18px, 2vw, 24px)',
        'clamp-footer' : 'clamp(12px, 2vw, 24px)',
        'clamp-home-body' : 'clamp(10px, 1.7vw, 18px)',
        'clamp-title-cta' : 'clamp(10px, 1.7vw, 22px)',
        'clamp-cta' : 'clamp(8.5rem, 10rem, 18rem)'
      },
      width: {
        'clamp-width-button' : 'clamp(233px, 32vw , 354px)',
      },
      maxWidth: {
        'max-width' : '1440px'
      }
    },
  },
  plugins: [],
};
export default config;
