import './globals.css';
import { Ubuntu_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const ubuntuMono = Ubuntu_Mono({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-mono',
});

export type RootLayoutProps = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="p5js-ml5js-inpage-editor" />
				<title>p5js ml5js inpage editor</title>
			</head>

			<body className={'min-h-screen bg-background antialiased' + ubuntuMono}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
