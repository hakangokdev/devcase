/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#2c5fff",
        green: "#a7f343",
        black: "#171717",
        "gray-1": "#f3f4f6",
        "gray-2": "#e5e7eb",
        "gray-3": "#9ca3af",
        "gray-4": "#9ca3af",
        "dark-green": "#88d133",
        "soft-green": "#d1ff8a",
        "soft-orange": "#f27277",
        "dark-blue": "#515161",
        "grey-02": "#e5e7eb",
        colorblack: "#171717",
        colorwhite: "#ffffff"
      },
      boxShadow: {
        "shadow-01": "0px 4px 8px 0px rgba(0, 0, 0, 0.02)",
        "shadow-03": "0px 10px 30px 0px rgba(0, 0, 0, 0.10)",
        "shadow-1": "0px 4px 8px 0px rgba(0, 0, 0, 0.02)",
        "shadow-2": "0px 2px 4px 0px rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        "heading-2": "Cairo",
        "heading-3": "Cairo",
        "heading-4": "Cairo",
        "heading-5": "Open Sans",
        "heading-6": "Cairo",
        paragraph: "Open Sans",
        label: "Cairo",
        "label-2": "Poppins",
      },
    },
  },
  plugins: [],
}
