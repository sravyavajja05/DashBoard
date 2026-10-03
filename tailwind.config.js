/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                board: {
                    black: '#111111',
                    bg: '#F8F9FA',
                    card: '#FFFFFF',
                    accent: '#F97316',
                },
            },
        },
    },
    plugins: [],
};
