import { cn } from 'src/utils/cn';

type HeaderLinkProps = {
	href?: string;
	label: string;
	className?: string;
	onClick?: () => void;
};

export const FlipText = ({ href, label, className = '', onClick }: HeaderLinkProps) => {
	return (
		<>
			{href ? (
				<a
					href={href}
					aria-label={label}
					className={cn('header-flip-link', className)}
					onClick={onClick}
				>
					<span className='header-flip-link__inner' aria-hidden='true'>
						<span className='header-flip-link__text'>{label}</span>
						<span className='header-flip-link__text header-flip-link__text--next'>{label}</span>
					</span>
				</a>
			) : (
				<span
					aria-label={label}
					className={cn('header-flip-link cursor-pointer', className)}
					onClick={onClick}
				>
					<span className='header-flip-link__inner' aria-hidden='true'>
						<span className='header-flip-link__text'>{label}</span>
						<span className='header-flip-link__text header-flip-link__text--next'>{label}</span>
					</span>
				</span>
			)}
		</>
	);
};
