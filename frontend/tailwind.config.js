module.exports = {
	purge: [ './src/**/*.{js,jsx,ts,tsx}', './public/index.html' ],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundColor: {
				primary: 'var(--color-bg-primary)',
				secondary: 'var(--color-bg-secondary)',
				third: 'var(--color-bg-third)'
			},
			textColor: {
				accent: 'var(--color-text-accent)',
				primary: 'var(--color-text-primary)',
				secondary: 'var(--color-text-secondary)'
			},
			animation: {
				'spin-slow': 'spin 3s linear infinite'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
