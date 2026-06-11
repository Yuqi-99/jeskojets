/* eslint-disable @typescript-eslint/no-unused-vars */
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

	// ─── BACKGROUND STRATEGY ────────────────────────────────────────────────
	//
	// Problem: LuxurySection starts transparent. Behind it:
	//   - cloud-2.avif (from AboutSection) → has cloud texture
	//   - body #f4f1ea (below AboutSection's bounds) → flat cream
	// This difference creates a visible hard line.
	//
	// Fix: two-layer approach
	//
	// Layer A (always present, no animation):
	//   Bottom-weighted gradient that immediately covers the lower viewport.
	//   Transparent at top (lets cloud texture show) → sky-blue at bottom
	//   (matches cloud-2.avif's flat bottom area, hiding the hard dividing line).
	//
	// Layer B (scroll-driven):
	//   Full cream gradient that reaches opacity 1 BEFORE AboutSection ends
	//   (~scrollYProgress 0.25 ≈ 75vh), so we never see the About/body
	//   background boundary at all.
	//
	// ────────────────────────────────────────────────────────────────────────

	// Layer B opacity — reaches 1.0 by 0.25 (well before AboutSection ends at ~0.33)
	const creamOverlayOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 1, 1]);
	// Layer A only bridges the opening overlap, then leaves the blue-cream
	// background unobstructed for the rest of the section.
	// const transitionOverlayOpacity = useTransform(scrollYProgress, [0, 0.12, 0.3], [1, 0.6, 0]);
	const transitionVisibility = useTransform(
		scrollYProgress,
		[0, 0.12, 0.3, 1],
		['visible', 'visible', 'hidden', 'hidden']
	);

	// ─── CONTENT ────────────────────────────────────────────────────────────
	// Content starts appearing from the very beginning of the section's scroll,
	// riding upward as if being "scrolled up" into view.
	// All transforms complete by 0.30 so content is fully on-screen well before
	// the cream overlay is fully settled.

	const titleY = useTransform(scrollYProgress, [0, 0.28, 1], ['75vh', '12vh', '12vh']);
	const titleOpacity = useTransform(scrollYProgress, [0, 0.22, 1], [0, 1, 1]);

	// const subtitleY = useTransform(scrollYProgress, [0.02, 0.3, 1], ['65vh', '0vh', '0vh']);
	// const subtitleOpacity = useTransform(scrollYProgress, [0.02, 0.25, 1], [0, 1, 1]);

	// const infoY = useTransform(scrollYProgress, [0.06, 0.34, 1], ['55vh', '0vh', '0vh']);
	// const infoOpacity = useTransform(scrollYProgress, [0.06, 0.3, 1], [0, 1, 1]);

	return (
		<section
			id='luxury'
			ref={sectionRef}
			// mt-[-140vh]: overlaps with AboutSection's last 140vh so the transition
			// begins while cloud-2.avif is still in view.
			// z-20: sits above AboutSection (z-2) and hero (z-0).
			className='relative z-5 mt-[-140vh] h-[200vh] w-full text-[#1d1b18]'
		>
			{/* Keeps the section cream after the sticky viewport starts scrolling away.
			    It begins below the opening viewport, so the cloud transition is unchanged. */}

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

				{/* ── LAYER B: Scroll-driven full cream overlay 蓝米色渐变 ── */}
				{/* Fades from 0 → 1 within the first 25% of the section's scroll,
				    which is ~75vh and still within the About/Luxury overlap zone.
				    Once fully opaque (opacity=1), it completely hides whatever is behind
				    — so no background discontinuity is ever visible. */}

				<motion.div
					className='absolute inset-0'
					aria-hidden='true'
					style={{
						opacity: creamOverlayOpacity,
						// Gradient starts at cloud-sky blue (top) → cream (bottom).
						// Even at partial opacity this blends naturally with the sky behind.
						background:
							'linear-gradient(to bottom, #c2d5e0 0%, #ccdfe5 12%, #d5e4e0 25%, #dfe7da 38%, #e8e6da 52%, #ede9e0 66%, #f1eee5 80%, #f4f1ea 100%)',
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
			</div>
		</section>
	);
};
