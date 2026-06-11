import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { RefObject } from 'react';

type LuxurySectionProps = {
	sectionRef: RefObject<HTMLElement | null>;
};

const aircraftStats = [
	['Maximum operating range', '11,263 km'],
	['Speed', '480 knots'],
	['Passenger capacity', 'Up to 12 seats (+1 cabin server)'],
	['Endurance', '14 hrs (maximum for European based aircraft)'],
	['Baggage capacity', '5.52 m3'],
	['Cruising altitude', '15,544 m'],
];

const aircraftSpecifications = [
	['Cabin length', '14.05 m²'],
	['Cabin width', '2.49 m²'],
	['Cabin height', '1.92 m²'],
];

export const LuxurySection = ({ sectionRef }: LuxurySectionProps) => {
	const prefersReducedMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end end'],
	});

	// The first 60% keeps the exact physical duration of the existing 400vh scene.
	// The remaining scroll continues into the aircraft specification scene.
	const atmosphereOpacity = useTransform(scrollYProgress, [0, 0.108, 1], [0, 1, 1]);
	const atmosphereY = useTransform(
		scrollYProgress,
		[0, 0.108, 0.492, 0.6, 1],
		['0vh', '0vh', '-112vh', '-120vh', '-120vh']
	);
	const transitionVisibility = useTransform(
		scrollYProgress,
		[0, 0.072, 0.144, 1],
		['visible', 'visible', 'hidden', 'hidden']
	);

	const titleY = useTransform(scrollYProgress, [0, 0.12, 1], ['75vh', '12vh', '12vh']);
	const titleOpacity = useTransform(scrollYProgress, [0, 0.096, 1], [0, 1, 1]);
	const titleSceneY = useTransform(
		scrollYProgress,
		[0, 0.6, 0.84, 1],
		['0vh', '0vh', '112vh', '112vh']
	);
	const specificationSceneY = useTransform(
		scrollYProgress,
		[0, 0.6, 0.84, 1],
		['-105vh', '-105vh', '0vh', '0vh']
	);
	const desktopPlaneTop = useTransform(
		scrollYProgress,
		[0, 0.6, 0.84, 1],
		['0%', '0%', '50%', '50%']
	);
	const desktopPlaneY = useTransform(
		scrollYProgress,
		[0, 0.168, 0.264, 0.384, 0.516, 0.6, 0.84, 1],
		[
			'calc(0% + 118vh)',
			'calc(0% + 118vh)',
			'calc(0% + 58vh)',
			'calc(0% + 8vh)',
			'calc(-50% + 14vh)',
			'calc(-50% + 7vh)',
			'calc(-50% + 0vh)',
			'calc(-50% + 0vh)',
		]
	);
	const planeScale = useTransform(scrollYProgress, [0, 0.6, 0.84, 1], [1, 1, 0.5, 0.5]);
	const planeOpacity = useTransform(scrollYProgress, [0, 0.168, 0.18, 1], [0, 0, 1, 1]);
	const mobilePlaneScale = useTransform(scrollYProgress, [0, 0.6, 0.84, 1], [1, 1, 0.4, 0.4]);
	const mobilePlaneY = useTransform(
		scrollYProgress,
		[0, 0.168, 0.264, 0.384, 0.516, 0.6, 0.84, 1],
		[
			'calc(-50% + 118vh)',
			'calc(-50% + 118vh)',
			'calc(-50% + 58vh)',
			'calc(-50% + 8vh)',
			'calc(-50% + 0vh)',
			'calc(-50% - 2vh)',
			'calc(-50% - 4vh)',
			'calc(-50% - 4vh)',
		]
	);
	const revealBoundary = useTransform(scrollYProgress, [0, 0.84, 1], [112, 112, -16]);

	const airplaneMask = useTransform(
		revealBoundary,
		(value) =>
			`linear-gradient(to bottom, #000 0%, #000 ${value - 14}%, rgba(0,0,0,0.82) ${value - 8}%, rgba(0,0,0,0.48) ${value}%, rgba(0,0,0,0.16) ${value + 8}%, transparent ${value + 14}%, transparent 100%)`
	);
	const wireframeMask = useTransform(
		revealBoundary,
		(value) =>
			`linear-gradient(to bottom, transparent 0%, transparent ${value - 14}%, rgba(0,0,0,0.16) ${value - 8}%, rgba(0,0,0,0.48) ${value}%, rgba(0,0,0,0.82) ${value + 8}%, #000 ${value + 14}%, #000 100%)`
	);
	const wireframeOpacity = useTransform(scrollYProgress, [0, 0.835, 0.85, 1], [0, 0, 1, 1]);

	return (
		<section
			id='luxury'
			ref={sectionRef}
			// mt-[-140vh]: overlaps with AboutSection's last 140vh so the transition
			// begins while cloud-2.avif is still in view.
			// z-20: sits above AboutSection (z-2) and hero (z-0).
			className='relative z-5 mt-[-140vh] h-[600vh] w-full text-[#1d1b18]'
		>
			<div className='sticky top-0 h-screen w-full overflow-hidden'>
				{/* ── LAYER A: Always-present bottom gradient  一开始的蓝色渐变  ── */}
				{/* Transparent at top (cloud-2.avif shows through) →
				    sky-blue at bottom (covers cloud-2.avif's flat lower area).
				    The color #c2d5e0 is chosen to match cloud-2.avif's bottom tone,
				    so the transition within the image is invisible. */}
				<motion.div
					className='absolute inset-0 z-0'
					aria-hidden='true'
					style={{
						visibility: transitionVisibility,
						background:
							'linear-gradient(to bottom, transparent 0%, transparent 35%, rgba(194,213,224,0.55) 65%, rgba(194,213,224,0.9) 100%)',
					}}
				/>

				{/* ── LAYER B: Scroll-driven full cream overlay 整个背景色渐变 ── */}
				{/* Fades from 0 → 1 within the first 25% of the section's scroll,
				    which is ~75vh and still within the About/Luxury overlap zone.
				    Once fully opaque (opacity=1), it completely hides whatever is behind
				    — so no background discontinuity is ever visible. */}
				<motion.div
					className='absolute inset-x-0 top-0 h-[240vh] will-change-transform'
					aria-hidden='true'
					style={{
						opacity: atmosphereOpacity,
						y: prefersReducedMotion ? '-120vh' : atmosphereY,
						background:
							'linear-gradient(to bottom, #9fc5d8 0vh, #abcbd9 18vh, #bed5dc 38vh, #d2dfdf 58vh, #e1e5df 76vh, #ece9e1 92vh, #eee9e2 104vh, #e6e1db 116vh, #d8d1cb 130vh, #c9c1bc 144vh, #bbb3ae 158vh, #b2aaa5 172vh, #b5ada8 186vh, #c2bab4 200vh, #d2cac2 214vh, #e4ddd4 228vh, #f4f1ea 240vh)',
					}}
				/>

				{/* ── CONTENT ── */}
				<motion.div
					className='absolute inset-0 z-10 flex flex-col justify-around bg-transparent px-[6.55vw] pt-[18vh] pb-[6vh] will-change-transform lg:pt-[22vh] lg:pb-[8vh]'
					style={prefersReducedMotion ? { y: '112vh' } : { y: titleSceneY }}
				>
					{/* Headline row */}
					<div className='flex w-full items-start justify-between'>
						{/* Left: "Fly in" + subtitle stacked */}
						<div className='flex flex-col'>
							<motion.h2
								className='text-[clamp(3.8rem,9.2vw,10.5rem)] leading-[0.82] font-medium tracking-[-0.055em]'
								style={prefersReducedMotion ? {} : { y: titleY, opacity: titleOpacity }}
							>
								Fly in
							</motion.h2>

							<motion.p
								className='mt-[1.1em] ml-[0.1em] text-[clamp(0.95rem,1.5vw,1.45rem)] leading-[1.1] font-bold tracking-[-0.02em]'
								style={prefersReducedMotion ? {} : { y: titleY, opacity: titleOpacity }}
							>
								Luxury
								<br />
								that moves
								<br />
								with you
							</motion.p>
						</div>

						{/* Right: "Luxury" — offset down to match original asymmetric layout */}
						<motion.h2
							className='text-[clamp(3.8rem,9.2vw,10.5rem)] leading-[0.82] font-medium tracking-[-0.055em]'
							style={prefersReducedMotion ? {} : { y: titleY, opacity: titleOpacity }}
						>
							Luxury
						</motion.h2>
					</div>

					{/* Gulfstream spec — bottom right */}
					<motion.div
						className='w-full max-w-76 self-end lg:max-w-100'
						style={prefersReducedMotion ? {} : { y: titleY, opacity: titleOpacity }}
					>
						<div className='mb-[0.9em] flex items-baseline justify-between border-b border-[#1d1b18]/20 pb-[0.6em]'>
							<span className='text-[9px] font-bold tracking-[0.14em] uppercase lg:text-[10px]'>
								Gulfstream
							</span>
							<span className='text-[9px] font-bold tracking-[0.14em] uppercase lg:text-[10px]'>
								650ER
							</span>
						</div>
						<p className='text-[10px] leading-[1.6] font-bold tracking-tight lg:text-[11px]'>
							Featuring wings designed to minimize anything that could disrupt its natural
							aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 AI-12 engines, the
							Gulfstream G650 is engineered for exceptional range and top-end speed.
						</p>
					</motion.div>
				</motion.div>

				{/* second section */}
				<motion.div
					className='absolute inset-0 z-15 px-[6.55vw] pt-[11vh] pb-[11vh] will-change-transform md:pb-[5vh]'
					style={prefersReducedMotion ? { y: 0 } : { y: specificationSceneY }}
				>
					<div className='flex h-full flex-col md:hidden'>
						<div className='shrink-0'>
							<div className='border-t border-[#1d1b18]/15 pt-2 text-sm font-medium'>
								Gulfstream
							</div>
							<div className='mt-1 text-[clamp(3.25rem,15vw,6rem)] leading-[0.82] font-medium tracking-[-0.065em]'>
								650ER
							</div>
						</div>

						<div className='min-h-0 flex-1' aria-hidden='true' />

						<div className='shrink-0'>
							<div className='grid grid-cols-2 gap-x-4 gap-y-2 border-t border-[#1d1b18]/15 pt-3'>
								{aircraftStats.map(([label, value]) => (
									<div key={label}>
										<div className='text-[8px] leading-tight font-bold text-[#1d1b18]/35 uppercase'>
											{label}
										</div>
										<div className='mt-0.5 text-[8px] leading-[1.08] font-bold uppercase'>
											{value}
										</div>
									</div>
								))}
							</div>

							<div className='mt-3 grid grid-cols-2 gap-4 border-t border-[#1d1b18]/15 pt-3'>
								<div>
									<div className='text-[8px] font-bold text-[#1d1b18]/35 uppercase'>
										Specification
									</div>
									<div className='mt-2 grid gap-1'>
										{aircraftSpecifications.map(([label, value]) => (
											<div
												key={label}
												className='grid grid-cols-[1fr_auto] gap-2 text-[8px] leading-none font-bold uppercase'
											>
												<span>{label}</span>
												<span>{value}</span>
											</div>
										))}
									</div>
								</div>

								<div>
									<h3 className='text-[8px] leading-none font-bold uppercase'>
										Direct Access to Private Travel
									</h3>
									<p className='mt-2 text-[8px] leading-tight font-medium'>
										A true time-saving machine, it brings Tokyo and New York an hour closer, and at
										92% of the speed of sound, it can circle the globe with just a single stop.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className='hidden h-full grid-cols-[1fr_1.15fr_1fr] gap-10 md:grid'>
						<div className='flex min-h-0 flex-col justify-between'>
							<div>
								<div className='border-t border-[#1d1b18]/15 pt-3 text-[clamp(1rem,1.65vw,1.5rem)] font-medium'>
									Gulfstream
								</div>
								<div className='mt-3 text-[clamp(4rem,7.5vw,7.5rem)] leading-[0.8] font-medium tracking-[-0.065em]'>
									650ER
								</div>
							</div>

							<div>
								<div className='grid grid-cols-2 gap-x-5 gap-y-5 border-t border-[#1d1b18]/15 pt-4'>
									{aircraftStats.map(([label, value]) => (
										<div key={label}>
											<div className='text-[8px] leading-tight font-bold text-[#1d1b18]/32 uppercase lg:text-[9px]'>
												{label}
											</div>
											<div className='mt-0.5 max-w-40 text-[10px] leading-[1.08] font-bold uppercase lg:text-[9px]'>
												{value}
											</div>
										</div>
									))}
								</div>

								<div className='mt-5 border-t border-[#1d1b18]/15 pt-4'>
									<div className='text-[8px] font-bold text-[#1d1b18]/32 uppercase lg:text-[9px]'>
										Specification
									</div>
									<div className='mt-3 grid gap-1'>
										{aircraftSpecifications.map(([label, value]) => (
											<div
												key={label}
												className='grid grid-cols-[1fr_auto] text-[8px] leading-none font-bold uppercase lg:text-[9px]'
											>
												<span>{label}</span>
												<span>{value}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						<div className='hidden md:block' aria-hidden='true' />

						<div className='flex min-h-0 flex-col'>
							<div className='border-t border-[#1d1b18]/15 pt-3 text-[clamp(1rem,1.65vw,1.5rem)] leading-[0.95] font-medium tracking-[-0.04em]'>
								Ultra-long-range
								<br />
								Aircraft
							</div>

							<div className='mt-[12vh] border-t border-[#1d1b18]/15 pt-4'>
								<h3 className='text-[8px] leading-none font-bold uppercase lg:text-[9px]'>
									Direct Access to
									<br />
									Private Travel
								</h3>
								<p className='mt-8 max-w-72 text-[10px] leading-[1.35] font-medium lg:text-[11px]'>
									A true time-saving machine, it brings Tokyo and New York an hour closer, and at
									92% of the speed of sound, it can circle the globe with just a single stop.
								</p>
							</div>
						</div>
					</div>
				</motion.div>

				<motion.img
					src='/airplane-wireframe.avif'
					alt='Gulfstream 650ER cabin blueprint'
					className='pointer-events-none absolute top-1/2 left-1/2 z-19 h-auto w-[62vw] max-w-105 object-contain mix-blend-multiply will-change-transform md:w-[30vw] md:max-w-107.5'
					style={
						prefersReducedMotion
							? {
									opacity: 1,
									x: '-50%',
									y: '-50%',
								}
							: {
									opacity: wireframeOpacity,
									x: '-50%',
									y: '-63%',
									WebkitMaskImage: wireframeMask,
									maskImage: wireframeMask,
									WebkitMaskRepeat: 'no-repeat',
									maskRepeat: 'no-repeat',
								}
					}
				/>

				<motion.div
					className='pointer-events-none absolute inset-0 z-20 hidden md:block'
					style={
						prefersReducedMotion
							? { visibility: 'hidden' }
							: {
									WebkitMaskImage: airplaneMask,
									maskImage: airplaneMask,
									WebkitMaskRepeat: 'no-repeat',
									maskRepeat: 'no-repeat',
								}
					}
				>
					<motion.img
						src='/airplane.webp'
						alt='Gulfstream 650ER viewed from above'
						className='absolute top-0 left-1/2 w-[96vw] max-w-312.5 object-contain will-change-transform'
						style={{
							opacity: planeOpacity,
							scale: planeScale,
							top: desktopPlaneTop,
							x: '-50%',
							y: desktopPlaneY,
							transformOrigin: '50% 50%',
						}}
					/>
				</motion.div>

				<motion.div
					className='pointer-events-none absolute inset-0 z-20 md:hidden'
					style={
						prefersReducedMotion
							? { visibility: 'hidden' }
							: {
									WebkitMaskImage: airplaneMask,
									maskImage: airplaneMask,
									WebkitMaskRepeat: 'no-repeat',
									maskRepeat: 'no-repeat',
								}
					}
				>
					<motion.img
						src='/airplane.webp'
						alt='Gulfstream 650ER viewed from above'
						className='absolute top-1/2 left-1/2 w-[155vw] max-w-none object-contain will-change-transform sm:w-[112vw]'
						style={{
							opacity: planeOpacity,
							scale: mobilePlaneScale,
							x: '-50%',
							y: mobilePlaneY,
							transformOrigin: '50% 50%',
						}}
					/>
				</motion.div>
			</div>
		</section>
	);
};
