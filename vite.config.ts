import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	/*
	build: {
		rollupOptions: {
			output: {
				// Inline dynamic imports
				inlineDynamicImports: true,
				// Define a single output file
				format: 'iife', // Immediately Invoked Function Expression
				// Specify the directory to output files
				dir: 'dist',
				// Define the naming pattern for entry files
				entryFileNames: `assets/[name].js`,
			},
		},
		// Ensuring all CSS is inlined into the JavaScript file, not as separate files
		cssCodeSplit: false,
		// Treats the build as a single-page application, which is usually desirable for embeddable widgets
		assetsInlineLimit: 1000000000,
	},
  */
});
