import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MdFlightTakeoff } from 'react-icons/md';
import jLogo from 'src/assets/j-logo.svg';

const destinations = [
	'Berlin',
	'Marrakech',
	'New York',
	'Cape Town',
	'Singapore',
	'Riyadh',
	'Paris',
	'Nice',
	'Doha',
	'Toronto',
	'Seoul',
	'Zurich',
	'Hong Kong',
	'London',
	'Dubai',
	'Miami',
	'Lagos',
	'Tel Aviv',
	'Milan',
	'Tokyo',
	'São Paulo',
	'Cairo',
	'Sydney',
	'Mykonos',
	'Los Angeles',
	'Mexico City',
	'Shanghai',
	'Abu Dhabi',
	'Geneva',
	'Melbourne',
	'Bangkok',
];

const CityReel = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		if (prefersReducedMotion) return;

		const timer = window.setInterval(() => {
			setActiveIndex((current) => (current + 1) % destinations.length);
		}, 900);

		return () => window.clearInterval(timer);
	}, [prefersReducedMotion]);

	const visibleCities = useMemo(
		() =>
			[-3, -2, -1, 0, 1, 2, 3].map((offset) => ({
				city: destinations[(activeIndex + offset + destinations.length) % destinations.length],
				offset,
			})),
		[activeIndex]
	);

	return (
		<div className='global-city-window relative h-49 w-[clamp(8.5rem,14vw,14rem)] overflow-hidden'>
			{visibleCities.map(({ city, offset }) => (
				<motion.div
					key={city}
					initial={prefersReducedMotion ? false : { opacity: 0, y: 217 }}
					animate={{
						opacity: offset === 0 ? 1 : Math.max(0.05, 0.2 - Math.abs(offset) * 0.045),
						y: (offset + 3) * 31,
					}}
					transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
					className='absolute inset-x-0 top-0 truncate text-[clamp(1rem,1.5vw,1.5rem)] leading-none font-bold tracking-[-0.055em] text-white'
				>
					{city}
				</motion.div>
			))}
		</div>
	);
};

export const OrbitLines = () => (
	<svg
		aria-hidden='true'
		viewBox='0 0 1000 1000'
		className='pointer-events-none absolute inset-[-14%] h-[128%] w-[128%] overflow-visible text-[#837a76]'
	>
		<motion.path
			d='M82 692 C 235 395, 745 300, 917 611'
			fill='none'
			stroke='currentColor'
			strokeWidth='3'
			strokeLinecap='round'
			initial={{ pathLength: 0, opacity: 0 }}
			whileInView={{ pathLength: 1, opacity: 0.75 }}
			viewport={{ once: false, amount: 0.25 }}
			transition={{ duration: 2.4, ease: 'easeInOut' }}
		/>
		<motion.path
			d='M235 860 C 372 530, 463 205, 622 134'
			fill='none'
			stroke='currentColor'
			strokeWidth='3'
			strokeLinecap='round'
			initial={{ pathLength: 0, opacity: 0 }}
			whileInView={{ pathLength: 1, opacity: 0.7 }}
			viewport={{ once: false, amount: 0.25 }}
			transition={{ duration: 2, delay: 0.15, ease: 'easeInOut' }}
		/>
		<motion.path
			d='M103 458 C 340 528, 689 765, 871 910'
			fill='none'
			stroke='currentColor'
			strokeWidth='2.5'
			strokeLinecap='round'
			initial={{ pathLength: 0, opacity: 0 }}
			whileInView={{ pathLength: 1, opacity: 0.62 }}
			viewport={{ once: false, amount: 0.25 }}
			transition={{ duration: 2.7, delay: 0.3, ease: 'easeInOut' }}
		/>
	</svg>
);

export const GlobalFooterSection = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const prefersReducedMotion = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end end'],
	});
	const { scrollYProgress: filledFooterProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end end'],
	});

	const introOpacity = useTransform(filledFooterProgress, [0, 0.1, 0.15, 1], [1, 1, 0, 0]);
	const introY = useTransform(scrollYProgress, [0, 0.2, 1], ['0vh', '15vh', '15vh']);
	const globalOpacity = useTransform(
		scrollYProgress,
		[0, 0.2, 0.32, 0.94, 1],
		[0.07, 0.12, 0.3, 0.3, 0.2]
	);
	const globalScale = useTransform(
		scrollYProgress,
		[0, 0.2, 0.42, 0.68, 1],
		[1.25, 1.25, 1.12, 1.12, 1.12]
	);
	const globalY = useTransform(
		scrollYProgress,
		[0, 0.2, 0.42, 0.72, 1],
		['58vh', '48vh', '9vh', '-2vh', '-2vh']
	);
	const globeY = useTransform(
		scrollYProgress,
		[0, 0.2, 0.45, 0.78, 1],
		['88vh', '78vh', '40vh', '22vh', '22vh']
	);
	const globeScale = useTransform(
		scrollYProgress,
		[0, 0.2, 0.42, 0.68, 1],
		[1.25, 1.25, 1.12, 0.95, 0.7]
	);
	const globeRotate = useTransform(scrollYProgress, [0, 0.2, 1], [-13, -13, 13]);
	const ticketY = useTransform(
		scrollYProgress,
		[0, 0.2, 0.36, 0.62, 0.74, 1],
		['96vh', '96vh', '0vh', '-95vh', '-95vh', '-95vh']
	);
	const finalOpacity = useTransform(scrollYProgress, [0, 0.7, 0.9, 1], [0, 0, 0.8, 1]);
	const finalY = useTransform(scrollYProgress, [0, 0.7, 0.9, 1], ['100vh', '50vh', '20vh', '0vh']);

	return (
		<section
			id='global'
			ref={sectionRef}
			className='relative z-10 h-[500vh] bg-[#211918] text-white sm:h-[500vh]'
		>
			<div className='sticky top-0 h-dvh min-h-150 overflow-hidden bg-[linear-gradient(to_bottom,#2d2322_0%,#191313_49%,#000_78%)]'>
				<motion.div
					className='absolute top-0 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 sm:gap-5 md:gap-3'
					style={prefersReducedMotion ? undefined : { opacity: introOpacity, y: introY }}
				>
					<h2 className='text-[clamp(1.15rem,1.55vw,1.6rem)] leading-none font-bold tracking-[-0.055em]'>
						Fly anywhere
					</h2>
					<span className='h-px w-8 bg-white/18 sm:w-12' />
					<MdFlightTakeoff className='size-5 -rotate-12' />
					<span className='h-px w-8 bg-white/18 sm:w-12' />
					<CityReel />
				</motion.div>

				<motion.div
					aria-hidden='true'
					className='absolute inset-x-0 top-[35%] z-0 text-center text-[clamp(8rem,22vw,22rem)] leading-none font-medium tracking-[-0.09em] text-[#493d3a]'
					style={{ opacity: globalOpacity, y: globalY, scale: globalScale }}
				>
					Global
				</motion.div>

				<motion.div
					className='absolute top-[18%] left-1/2 z-5 aspect-square w-[min(78vw,44rem)] -translate-x-1/2 will-change-transform sm:w-[min(58vw,48rem)]'
					style={
						prefersReducedMotion
							? { y: '22vh', scale: 0.83 }
							: { y: globeY, scale: globeScale, rotate: globeRotate }
					}
				>
					{/* <OrbitLines /> */}
					<img
						src='/planet.webp'
						alt='Globe showing Jesko Jets worldwide reach'
						className='relative z-2 h-full w-full object-contain'
					/>
				</motion.div>

				<motion.article
					className='absolute top-[12%] left-[8%] z-10 flex w-[min(78vw,20rem)] flex-col overflow-hidden bg-[#fff8ed] p-3 text-[#211918] sm:left-[18%] sm:w-[20rem]'
					style={prefersReducedMotion ? { opacity: 0 } : { opacity: 1, y: ticketY, height: '75vh' }}
				>
					<div className='flex items-start justify-between'>
						<h3 className='text-[clamp(3.3rem,5.1vw,5rem)] leading-[0.72] font-medium tracking-[-0.09em]'>
							5K+
							<br />
							flights
						</h3>
						<div className='global-barcode h-17 w-5' aria-hidden='true' />
					</div>

					<div className='mt-auto'>
						<div className='mb-[min(30vh,17rem)] text-[9px] leading-none font-bold uppercase'>
							Successfully arranged
						</div>
						<img src={jLogo} alt='' className='mb-3 h-6 w-auto' />
						<p className='max-w-68 text-[11px] leading-[1.12] font-medium tracking-[-0.035em]'>
							Each journey reflects years of expertise, precision, and trust. From last-minute
							charters to intercontinental business routes — Jesko Jets ensures safety, discretion,
							and excellence in every flight.
						</p>
					</div>
				</motion.article>

				<motion.div
					className='absolute inset-x-[6.55%] top-[59%] bottom-5 z-20 flex flex-col justify-between sm:top-[58%]'
					style={prefersReducedMotion ? undefined : { opacity: finalOpacity, y: finalY }}
				>
					<div className='grid grid-cols-2 items-start gap-8 sm:grid-cols-[1fr_1fr_1fr]'>
						<h3 className='max-w-60 text-[clamp(1.15rem,1.65vw,1.7rem)] leading-[0.92] font-bold tracking-[-0.055em]'>
							Fly anywhere with
							<br /> total comfort and
							<br /> control
						</h3>
						<div className='hidden sm:block' />
						<div className='justify-self-end text-[clamp(0.78rem,1vw,1rem)] leading-[1.08] font-bold tracking-[-0.04em]'>
							<a href='mailto:info@jeskojets.com' className='block hover:opacity-65'>
								info@jeskojets.com
							</a>
							<a href='tel:+971544325050' className='block hover:opacity-65'>
								+971 54 432 5050
							</a>
							<div className='mt-10 flex items-center justify-end gap-3 text-[8px] leading-[0.9] uppercase'>
								<span className='h-px w-6 bg-white' />
								<span className='text-right'>
									For
									<br />
									inquiries
								</span>
							</div>
						</div>
					</div>

					<footer className='grid grid-cols-2 items-end gap-5 border-b border-white/45 pb-2 text-[8px] leading-none font-bold text-white/45 uppercase sm:grid-cols-[1fr_1fr_1fr]'>
						<div className='flex flex-wrap gap-x-8 gap-y-2'>
							<span>©2026 Jesko Jets. All rights reserved</span>
							<a href='https://cdn.prod.website-files.com/' className='hover:text-white'>
								Privacy Policy
							</a>
						</div>
						<div className='hidden sm:block' />
						<div className='flex items-center justify-end gap-7'>
							<span>Clone by</span>
							<a
								href='https://thefirstthelast.agency/'
								className='flex items-center gap-2 hover:text-white'
							>
								Yuqi
							</a>
						</div>
					</footer>
				</motion.div>
			</div>
		</section>
	);
};
