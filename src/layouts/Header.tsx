type HeaderLinkProps = {
	href?: string;
	label: string;
	className?: string;
};

export const FlipText = ({ href, label, className = '' }: HeaderLinkProps) => {
	return (
		<>
			{href ? (
				<a href={href} aria-label={label} className={`header-flip-link ${className}`}>
					<span className='header-flip-link__inner' aria-hidden='true'>
						<span className='header-flip-link__text'>{label}</span>
						<span className='header-flip-link__text header-flip-link__text--next'>{label}</span>
					</span>
				</a>
			) : (
				<span aria-label={label} className={`header-flip-link cursor-pointer ${className}`}>
					<span className='header-flip-link__inner' aria-hidden='true'>
						<span className='header-flip-link__text'>{label}</span>
						<span className='header-flip-link__text header-flip-link__text--next'>{label}</span>
					</span>
				</span>
			)}
		</>
	);
};

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
						<FlipText key={link.href} href={link.href} label={link.label} />
					))}
				</div>

				<div className='flex items-center gap-5 p-1'>
					<FlipText label='+971 54 432 5050' />
					<FlipText
						href='mailto:info@jeskojets.com'
						label='info@jeskojets.com'
						className='hidden sm:inline-flex'
					/>
				</div>
			</div>
		</header>
	);
};
