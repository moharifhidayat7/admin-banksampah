module.exports = {
   purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
   darkMode: false, // or 'media' or 'className'
   theme: {
      extend: {
         animation: {
            "spin-slow": "spin 3s linear infinite",
         },
         backgroundImage: (theme) => ({
            "logo-text": "url('/logo-text.png')",
            "logo-icon": "url('/logo-icon.png')",
         }),
         width: {
            150: "150px",
            "icon-60": "60px",
         },
         backgroundSize: {
            "w-150px": "150px",
            "w-60px": "60px",
         },
      },
   },
   variants: {
      extend: {
         appearance: ["hover", "focus"],
         ringColor: ["hover", "active", "focus-within"],
         textColor: ["focus-within"],
         width: ["hover", "focus"],
         transform: ["hover", "focus"],
      },
   },
   plugins: [
      require("@tailwindcss/forms")({
         strategy: "class",
      }),
      require("@tailwindcss/line-clamp"),
   ],
};
