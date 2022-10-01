const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: {
        // DEFAULT: "#76528BFF",
        DEFAULT: "#5F4B8BFF",
      }
    },
  },
  plugins: [],
});