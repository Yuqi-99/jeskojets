import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { RefObject } from 'react';

type LuxurySectionProps = {
	sectionRef: RefObject<HTMLElement | null>;
};

export const LuxurySection = ({ sectionRef }: LuxurySectionProps) => {
	const prefersReducedMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end end'],
	});

	const atmosphereOpacity = useTransform(scrollYProgress, [0, 0.18, 1], [0, 1, 1]);
	const atmosphereY = useTransform(
		scrollYProgress,
		[0, 0.18, 0.82, 1],
		['0vh', '0vh', '-112vh', '-120vh']
	);
	const transitionVisibility = useTransform(
		scrollYProgress,
		[0, 0.12, 0.24, 1],
		['visible', 'visible', 'hidden', 'hidden']
	);

	const titleY = useTransform(scrollYProgress, [0, 0.2, 1], ['75vh', '12vh', '12vh']);
	const titleOpacity = useTransform(scrollYProgress, [0, 0.16, 1], [0, 1, 1]);
	const planeY = useTransform(
		scrollYProgress,
		[0, 0.28, 0.44, 0.64, 0.86, 1],
		['118vh', '118vh', '58vh', '8vh', '-7vh', '-14vh']
	);
	const planeOpacity = useTransform(scrollYProgress, [0, 0.28, 0.3, 1], [0, 0, 1, 1]);

	return (
		<section
			id='luxury'
			ref={sectionRef}
			// mt-[-140vh]: overlaps with AboutSection's last 140vh so the transition
			// begins while cloud-2.avif is still in view.
			// z-20: sits above AboutSection (z-2) and hero (z-0).
			className='relative z-5 mt-[-140vh] h-[400vh] w-full text-[#1d1b18]'
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
				<div className='absolute inset-0 z-10 flex flex-col justify-around bg-transparent px-[6.55vw] pt-[18vh] pb-[6vh] lg:pt-[22vh] lg:pb-[8vh]'>
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
						className='w-full max-w-[19rem] self-end lg:max-w-[25rem]'
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
						<p className='text-[9.5px] leading-[1.6] font-bold tracking-tight lg:text-[11px]'>
							Featuring wings designed to minimize anything that could disrupt its natural
							aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 AI-12 engines, the
							Gulfstream G650 is engineered for exceptional range and top-end speed.
						</p>
					</motion.div>
				</div>

				<motion.img
					src='/airplane.webp'
					alt='Gulfstream 650ER viewed from above'
					className='pointer-events-none absolute top-0 left-1/2 z-20 w-[155vw] max-w-none object-contain will-change-transform sm:w-[112vw] md:w-[96vw] md:max-w-[1250px]'
					style={
						prefersReducedMotion
							? { opacity: 1, x: '-50%', y: '4vh' }
							: { opacity: planeOpacity, x: '-50%', y: planeY }
					}
				/>
			</div>
		</section>
	);
};
