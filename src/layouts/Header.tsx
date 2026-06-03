export const Header = () => {
	const links = [
		{ label: 'About', href: '#about' },
		{ label: 'Our Fleet', href: '#fleet' },
		{ label: 'Advantages', href: '#advantages' },
		{ label: 'Global', href: '#global' },
	];

	return (
		<header className='fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-10'>
			<div className='mx-auto flex max-w-640 items-center justify-between gap-3 text-xl leading-none font-bold'>
				<div className='hidden items-center gap-1 p-1 md:flex'>
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className='rounded-full px-4 py-3 transition hover:bg-white/70'
						>
							{link.label}
						</a>
					))}
				</div>

				<div className='flex items-center gap-1 p-1'>
					<a
						href='tel:+971544325050'
						className='rounded-full px-3 py-3 transition hover:bg-white/70 sm:px-4'
					>
						+971 54 432 5050
					</a>
					<a
						href='mailto:info@jeskojets.com'
						className='hidden rounded-full px-4 py-3 transition hover:bg-white/70 sm:block'
					>
						info@jeskojets.com
					</a>
				</div>
			</div>
		</header>
	);
};
