/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        brandBlueDark: "#1B91BF",
        brandBlueLight: "#0DB3D9",
        brandYellowDark: "#A65D05",
        brandRed: "#BF3326",
        brandGray: "#F2F2F2",    
        brandPurple: "#9941BF", //30%
        brandDarkPurple: "#3C308C",
        brandYellow: "#F2B705", //10%
        brandCream: "#FFB48F",
        brandOrange: "#F26513", //10%
        brandPale: "#F5E6CC",
        brandBlue: "#04D9C4", //60%

        brandBlueGradient: {
          25: "#E4F6FB",
          50: "#B7E9F5",
          100: "#8AE2EF",
          200: "#60D4E8",
          300: "#33C6E1",
          400: "#0DB3D9",
          500: "#09A0C8",
          600: "#0892B8",
          700: "#0784A7",
          800: "#06769A",
          900: "#05678D",
          950: "#045D7B",
          1000: "#034D6B",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        // Add other trending fonts here
      },
      textColor: {
        DEFAULT: '#6B7280', 
      },
    },
  },
  plugins: [],
};
