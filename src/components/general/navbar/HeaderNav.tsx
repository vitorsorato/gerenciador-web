import Link from 'next/link';

import ToggleTheme from './ThemeToggler';
export default function HeaderNav() {
	return (
		<header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-white px-4 dark:border-zinc-800 dark:bg-black lg:px-6">
				<nav className="flex items-center gap-4">
					<Link href="/" className="flex items-center gap-2 font-semibold text-teal-600">
						ARTIA
					</Link>
				</nav>
			<div className="ml-auto flex items-center space-x-4 transition-all duration-1000 ease-in-out">
					<>
						<ToggleTheme />
					</>
			</div>
		</header>
	);
}
