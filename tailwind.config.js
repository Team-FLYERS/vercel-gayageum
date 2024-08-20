/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': {'max': '599px'},
      'notMobile': {'min': '600px'},
      'miniTablet': {'min': '600px', 'max': '1023px'},
      'tablet': {'min': '1024px', 'max': '1439px'},
      'desktop': {'min': '1440px'},
    },
    extend: {
      backgroundImage: theme => ({
        'custom-image': "url('/src/assets/background-img.png')",
        'custom-gradient': `linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
                            linear-gradient(0deg, rgba(225, 235, 238, 0.8), rgba(225, 235, 238, 0.8))`,
      })
    },
  },
  plugins: [],
}
