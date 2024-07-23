import { Html, Head, Main, NextScript } from 'next/document';

import { Toaster } from '@/components/ui/sonner';

export default function Document() {
	return (
		<Html lang="pt-BR" className="dark">
			<Head>
				<meta name="author" content="Artia" />
				<meta name="theme-color" content="white" />
				<link rel="icon" href="/logo.svg" sizes="any" />
				<link rel="icon" href="/logo.svg" type="image/svg+xml" />
			</Head>
			<body>
				<Main />
				<NextScript />
				<Toaster/>
			</body>
		</Html>
	);
}
