export const Header = () => {
	const links = [
		{ label: 'About', href: '#about' },
		{ label: 'Our Fleet', href: '#fleet' },
		{ label: 'Advantages', href: '#advantages' },
		{ label: 'Global', href: '#global' },
	];

	return (
		<header className='fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-16'>
			<div className='mx-auto flex max-w-640 items-center justify-between gap-3 text-xs font-bold text-white lg:text-sm'>
				<div className='hidden items-center gap-5 p-1 md:flex'>
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className='rounded-lg p-1 transition hover:bg-white/15'
						>
							{link.label}
						</a>
					))}
				</div>

				<div className='flex items-center gap-5 p-1'>
					<a href='tel:+971544325050' className='rounded-lg p-1 transition hover:bg-white/15'>
						+971 54 432 5050
					</a>
					<a
						href='mailto:info@jeskojets.com'
						className='hidden rounded-lg p-1 transition hover:bg-white/15 sm:block'
					>
						info@jeskojets.com
					</a>
				</div>
			</div>
		</header>
	);
};
