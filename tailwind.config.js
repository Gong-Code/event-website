/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                primary: 'var(--primary)',
                'primary-muted': 'var(--primary-muted)',
                secondary: 'var(--secondary)',
                'secondary-muted': 'var(--secondary-muted)',
                tertiary: 'var(--tertiary)',
                error: 'var(--error)',
                'error-muted': 'var(--error-muted)',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
