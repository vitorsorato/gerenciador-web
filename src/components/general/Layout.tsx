import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import HeaderNav from './navbar/HeaderNav';

type LayoutProps = {
	children: ReactNode;
	className?: string;
};

export default function Layout({ children, className }: LayoutProps) {
	return (
		<>
			<HeaderNav/>
			<main className={cn(className)}>{children}</main>
		</>
	);
}
