import '@/styles/globals.css';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

import { Toaster } from '@/components/ui/sonner';

export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {

	return (
			<ThemeProvider
				attribute="class"
				disableTransitionOnChange
				defaultTheme="system"
				enableSystem
			>
				<Component {...pageProps} />
				<Toaster />
			</ThemeProvider>
	);
}
