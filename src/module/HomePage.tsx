import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const heroDesign = {
	width: 2560,
	height: 1443,
};

const getHeroScale = () => {
	if (typeof window === 'undefined' || window.innerWidth < 768) {
		return 1;
	}

	return Math.max(window.innerWidth / heroDesign.width, window.innerHeight / heroDesign.height);
};

const getViewportHeight = () => {
	if (typeof window === 'undefined') {
		return heroDesign.height;
	}

	return window.innerHeight;
};

export const HomePage = () => {
	const heroRef = useRef<HTMLElement>(null);
	const [heroScale, setHeroScale] = useState(getHeroScale);
	const [viewportHeight, setViewportHeight] = useState(getViewportHeight);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ['start start', 'end end'],
	});
	const windowScale = useTransform(scrollYProgress, (value) => heroScale * (1 + value * 4.2));
	const windowOpacity = useTransform(scrollYProgress, [0, 0.74, 0.96], [1, 1, 0]);
	const skyScale = useTransform(scrollYProgress, [0, 0.64, 1], [1.5, 1.16, 1]);
	const skyObjectPosition = useTransform(
		scrollYProgress,
		[0, 0.64, 1],
		['50% 0%', '50% 38%', '50% 50%']
	);
	const cloudY = useTransform(scrollYProgress, [0, 0.64, 1], [0, -150, -300]);
	// we are movement text
	const heroTextOpacity = useTransform(scrollYProgress, [0, 0.34, 0.72], [1, 0.62, 0]);
	const heroLeftX = useTransform(scrollYProgress, [0, 0.72], ['0vw', '-58vw']);
	const heroLeftY = useTransform(scrollYProgress, [0, 0.72], ['0vh', '-34vh']);
	const textScale = useTransform(scrollYProgress, [0, 0.42, 0.72], [1, 1.5]);
	// we are distinction text
	const heroRightX = useTransform(scrollYProgress, [0, 0.72], ['0vw', '58vw']);
	const heroRightY = useTransform(scrollYProgress, [0, 0.72], ['0vh', '34vh']);
	// your freedom to enjoy life copy
	const heroCopyX = useTransform(scrollYProgress, [0, 0.72], ['0vw', '-48vw']);
	const heroCopyY = useTransform(scrollYProgress, [0, 0.72], ['0vh', '32vh']);
	// scroll down to start the journey
	const heroScrollX = useTransform(scrollYProgress, [0, 0.72], ['0vw', '48vw']);
	const heroScrollY = useTransform(scrollYProgress, [0, 0.72], ['0vh', '32vh']);

	const jeskoJetsOpacity = useTransform(scrollYProgress, [0, 0.58, 0.86, 1], [1, 0.72, 0.9, 1]);
	const jeskoJetsScale = useTransform(scrollYProgress, [0, 0.86, 1], [1, 1.35, 1]);
	const jeskoJetsTop = useTransform(
		scrollYProgress,
		[0, 0.86, 1],
		[viewportHeight * 0.474, viewportHeight * 0.12, 32]
	);

	useEffect(() => {
		const updateHeroScale = () => {
			setHeroScale(getHeroScale());
			setViewportHeight(getViewportHeight());
		};

		updateHeroScale();
		window.addEventListener('resize', updateHeroScale);

		return () => window.removeEventListener('resize', updateHeroScale);
	}, []);

	return (
		<section ref={heroRef} className='relative h-[230vh] bg-[#201b16] text-white'>
			<div className='fixed top-0 h-screen min-h-170 w-full overflow-hidden sm:min-h-180 lg:min-h-screen'>
				<motion.div
					aria-hidden='true'
					className='absolute inset-0 z-0 will-change-transform'
					initial={{ opacity: 0, scale: 1.04 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.1, ease: 'easeOut' }}
					style={{ scale: skyScale }}
				>
					<motion.img
						src='/sky.webp'
						alt=''
						className='absolute inset-0 h-full w-full object-cover'
						style={{ objectPosition: skyObjectPosition }}
					/>

					<motion.div
						className='absolute top-[16%] left-1/2 h-[50vh] w-[260vw] -translate-x-1/2 overflow-hidden opacity-70 sm:top-[18%] sm:h-[58vh] sm:w-[190vw]'
						style={{ y: cloudY }}
					>
						<div className='hero-cloud-track flex h-full items-center'>
							<img src='/cloud.webp' alt='' className='hero-cloud-tile' />
							<img src='/cloud.webp' alt='' className='hero-cloud-tile' />
							<img src='/cloud.webp' alt='' className='hero-cloud-tile' />
							<img src='/cloud.webp' alt='' className='hero-cloud-tile' />
						</div>
					</motion.div>
				</motion.div>

				<motion.div
					className='absolute top-1/2 left-1/2 z-5 h-full w-full origin-center will-change-transform md:h-[1443px] md:w-[2560px]'
					style={{
						opacity: windowOpacity,
						x: '-50%',
						y: '-50%',
						scale: windowScale,
						transformOrigin: '50% 47.4%',
					}}
				>
					<motion.div
						aria-hidden='true'
						className='absolute inset-0 z-0'
						initial={{ opacity: 0, scale: 1.04 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1.1, ease: 'easeOut' }}
					>
						<img
							src='/window-outline-img-hero-back.webp'
							alt=''
							className='absolute inset-0 z-3 h-full w-full object-cover md:scale-[1] lg:scale-[1.25]'
						/>
						<img
							src='/window-img-hero-front.webp'
							alt='jet window'
							className='absolute inset-0 z-4 h-full w-full object-cover md:scale-[1] lg:scale-[1.25]'
						/>
						<img
							src='/shadow-img-hero-front-over.webp'
							alt=''
							className='absolute inset-0 z-5 h-full w-full object-cover mix-blend-multiply md:scale-[1] lg:scale-[1.2]'
						/>
					</motion.div>
				</motion.div>

				<motion.div
					className='absolute left-1/2 z-4 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[2.25rem] leading-none font-normal tracking-tight text-white/95 sm:text-[2rem]'
					style={{ opacity: jeskoJetsOpacity, scale: jeskoJetsScale, top: jeskoJetsTop }}
				>
					Jesko Jets
				</motion.div>

				<motion.h1
					className='absolute top-[20%] left-[10%] z-20 max-w-[min(45rem,86vw)] text-[3rem] leading-[0.9] font-medium tracking-[-0.08em] text-white sm:left-[6.55%] sm:text-[4rem] md:text-[clamp(4.5rem,5vw,6.75rem)] md:leading-[0.9] lg:top-[17.5%] lg:leading-[0.88889]'
					style={{
						opacity: heroTextOpacity,
						x: heroLeftX,
						y: heroLeftY,
						scale: textScale,
						transformOrigin: 'left top',
					}}
				>
					We are
					<br />
					movement
				</motion.h1>

				<div className='absolute right-[10%] bottom-[20%] z-20 flex max-w-[min(45rem,86vw)] flex-col items-end gap-3 md:right-[6.55%] lg:bottom-12'>
					<motion.h2
						className='max-w-[min(45rem,86vw)] text-right text-[2.75rem] leading-[0.9] font-medium tracking-[-0.08em] text-white sm:text-[4rem] md:text-[clamp(4.5rem,5vw,6.75rem)] md:leading-[0.9] lg:leading-[0.88889]'
						style={{
							opacity: heroTextOpacity,
							x: heroRightX,
							y: heroRightY,
							scale: textScale,
							transformOrigin: 'right bottom',
						}}
					>
						We are
						<br />
						distinction
					</motion.h2>

					<motion.div
						className='mt-10 hidden h-px w-2/3 bg-white lg:flex'
						style={{ opacity: heroTextOpacity, x: heroScrollX, y: heroScrollY }}
					/>

					<motion.div
						className='hidden w-full items-center justify-between text-[clamp(8px,0.694vw,10px)] leading-[1.2] font-bold tracking-[-0.032em] uppercase lg:flex'
						style={{
							opacity: heroTextOpacity,
							x: heroScrollX,
							y: heroScrollY,
							scale: textScale,
							transformOrigin: 'right bottom',
						}}
					>
						<div className='flex items-center gap-1 pt-4'>
							<img src='/arrow-bottom.gif' alt='Scroll down' className='size-6' />
							<span className='font-bold'>Scroll down</span>
						</div>
						<div className='pt-4 text-right font-bold'>To start the journey</div>
					</motion.div>
				</div>

				<motion.div
					className='absolute bottom-[20%] left-[6.65%] z-20 hidden w-70 lg:bottom-20 lg:block xl:w-120'
					style={{
						opacity: heroTextOpacity,
						x: heroCopyX,
						y: heroCopyY,
						scale: textScale,
						transformOrigin: 'left bottom',
					}}
				>
					<h3 className='max-w-[24rem] text-[clamp(16px,1.667vw,24px)] leading-none font-bold'>
						Your
						<br />
						freedom to
						<br />
						enjoy life
					</h3>
					<div className='mt-6 h-px w-8 bg-white lg:w-12' />
					<p className='mt-7 text-[clamp(10px,0.833vw,11px)] font-bold'>
						Every flight is designed around your comfort, time, and ambitions — so you can focus on
						what truly matters, while we take care of everything else.
					</p>
				</motion.div>
			</div>
		</section>
	);
};
