import { useEffect, useState } from 'react';
import { FlipText } from 'src/components/FlipText';
import { cn } from 'src/utils/cn';

export const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const links = [
		{ label: 'About', href: '#about' },
		{ label: 'Our Fleet', href: '#fleet' },
		{ label: 'Advantages', href: '#advantages' },
		{ label: 'Global', href: '#global' },
	];

	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	useEffect(() => {
		const closeOnDesktop = () => {
			if (window.innerWidth >= 764) {
				closeMobileMenu();
			}
		};

		closeOnDesktop();
		window.addEventListener('resize', closeOnDesktop);

		return () => window.removeEventListener('resize', closeOnDesktop);
	}, []);

	return (
		<header className='z-header fixed inset-x-0 top-0 px-4 py-4 sm:px-6 lg:px-16'>
			<div className='mx-auto flex max-w-640 items-center justify-between gap-3 text-xs font-bold text-white lg:text-sm'>
				<div className='hidden items-center gap-5 p-1 md:flex'>
					{links.map((link) => (
						<FlipText key={link.href} href={link.href} label={link.label} />
					))}
				</div>

				<a href='#top' className='rounded-lg p-1 text-sm font-medium md:hidden'></a>

				<div className='hidden items-center gap-5 p-1 md:flex'>
					<FlipText label='+971 54 432 5050' />
					<FlipText href='mailto:info@jeskojets.com' label='info@jeskojets.com' />
				</div>

				<button
					type='button'
					aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={isMobileMenuOpen}
					onClick={() => setIsMobileMenuOpen((current) => !current)}
					className='group flex size-10 items-center justify-center rounded-lg bg-white/10 text-white shadow-[0_16px_42px_rgba(0,0,0,0.2)] backdrop-blur transition hover:bg-white/18 focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:outline-none md:hidden'
				>
					<span className='relative block h-3.5 w-5' aria-hidden='true'>
						<span
							className={cn(
								'absolute top-0 left-0 h-px w-full bg-current transition duration-300',
								isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''
							)}
						/>
						<span
							className={cn(
								'absolute bottom-0 left-0 h-px w-full bg-current transition duration-300',
								isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
							)}
						/>
					</span>
				</button>
			</div>

			<div
				className={cn(
					'absolute inset-x-4 top-18 overflow-hidden rounded-lg border border-white/12 text-white shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-300 md:hidden',
					isMobileMenuOpen
						? 'pointer-events-auto translate-y-0 opacity-100'
						: 'pointer-events-none -translate-y-3 opacity-0'
				)}
			>
				<nav aria-label='Mobile navigation' className='flex flex-col px-2 py-5'>
					<div className='flex flex-col gap-1 text-xl leading-none font-medium tracking-[-0.055em]'>
						{links.map((link) => (
							<FlipText
								key={link.href}
								href={link.href}
								label={link.label}
								onClick={closeMobileMenu}
								className='rounded-lg p-2 transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:outline-none'
							/>
						))}
					</div>

					<div className='mt-5 h-px bg-white/18' />

					<div className='mt-5 flex flex-col gap-3 text-[0.7rem] leading-none font-bold'>
						<a
							href='tel:+971544325050'
							onClick={closeMobileMenu}
							className='rounded-xl py-2 transition hover:text-white/70 focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:outline-none'
						>
							+971 54 432 5050
						</a>
						<a
							href='mailto:info@jeskojets.com'
							onClick={closeMobileMenu}
							className='rounded-xl py-2 transition hover:text-white/70 focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:outline-none'
						>
							info@jeskojets.com
						</a>
					</div>
				</nav>
			</div>
		</header>
	);
};
