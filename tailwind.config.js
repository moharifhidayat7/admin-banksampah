module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
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
            ringColor: ['hover', 'active'],
        },
    },
    plugins: [],
};
