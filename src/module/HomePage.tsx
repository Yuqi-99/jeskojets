import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MdFlightTakeoff } from 'react-icons/md';

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

export const HomePage = () => {
	const [heroScale, setHeroScale] = useState(getHeroScale);

	useEffect(() => {
		const updateHeroScale = () => setHeroScale(getHeroScale());

		updateHeroScale();
		window.addEventListener('resize', updateHeroScale);

		return () => window.removeEventListener('resize', updateHeroScale);
	}, []);

	return (
		<section className='relative h-screen min-h-170 w-full overflow-hidden bg-[#201b16] text-white sm:min-h-180 lg:min-h-screen'>
			<div
				className='absolute top-1/2 left-1/2 h-full w-full origin-center md:h-[1443px] md:w-[2560px]'
				style={{ transform: `translate(-50%, -50%) scale(${heroScale})` }}
			>
				<motion.div
					aria-hidden='true'
					className='absolute inset-0 z-0'
					initial={{ opacity: 0, scale: 1.04 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.1, ease: 'easeOut' }}
				>
					<img
						src='/sky.webp'
						alt=''
						className='absolute inset-0 h-full w-full origin-top translate-y-[18vh] scale-[1.5] object-cover object-top sm:translate-y-0'
					/>

					<div className='absolute top-[18%] left-1/2 z-1 h-[40vh] w-[250vw] -translate-x-1/2 overflow-hidden opacity-90 sm:top-[20%] sm:h-[52vh] sm:w-[170vw]'>
						<div className='hero-cloud-track flex h-full items-center'>
							<img src='/cloud.webp' alt='' className='hero-cloud-tile' />
							<img src='/cloud.webp' alt='' className='hero-cloud-tile' />
							<img src='/cloud.webp' alt='' className='hero-cloud-tile' />
							<img src='/cloud.webp' alt='' className='hero-cloud-tile' />
						</div>
					</div>

					<div className='absolute top-[47.4%] left-1/2 z-2 -translate-x-1/2 -translate-y-1/2 text-[2.25rem] leading-none font-light tracking-tight text-white/95 sm:text-[3rem] md:text-[4rem]'>
						Jesko Jets
					</div>

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
			</div>

			<motion.h1
				className='absolute top-[15%] left-[10%] z-20 max-w-[min(34rem,72vw)] text-[3rem] leading-[0.875] font-medium tracking-[-0.065em] text-white sm:top-[17.5%] sm:left-[6.55%] sm:text-[4rem] md:text-[5.25rem] 2xl:text-[6.75rem]'
				initial={{ opacity: 0, x: -34 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.85, delay: 0.18, ease: 'easeOut' }}
			>
				We are
				<br />
				movement
			</motion.h1>

			<div className='absolute right-[10%] bottom-32 z-20 flex max-w-[min(34rem,72vw)] flex-col items-end gap-3 md:right-[6.55%] 2xl:bottom-10'>
				<motion.h2
					className='text-right text-[2.75rem] leading-[0.875] font-medium tracking-[-0.065em] text-white sm:text-[4rem] md:text-[5.25rem] 2xl:text-[6.75rem]'
					initial={{ opacity: 0, x: 34 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.85, delay: 0.28, ease: 'easeOut' }}
				>
					We are
					<br />
					distinction
				</motion.h2>

				<div className='mt-6 hidden h-px w-2/3 bg-white lg:flex' />

				<motion.div
					className='hidden w-full items-center justify-between text-[10px] leading-none font-semibold uppercase lg:flex lg:text-[11px]'
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.75, delay: 0.5, ease: 'easeOut' }}
				>
					<div className='flex items-center gap-1 pt-4'>
						<img src='/arrow-bottom.gif' alt='Scroll down' className='size-6 lg:size-8' />
						<span className='font-bold'>Scroll down</span>
					</div>
					<div className='pt-4 text-right font-bold'>To start the journey</div>
				</motion.div>
			</div>

			<motion.div
				className='absolute bottom-32 left-[6.65%] z-20 hidden w-70 lg:block xl:w-135 2xl:bottom-10 2xl:w-120'
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.75, delay: 0.42, ease: 'easeOut' }}
			>
				<h3 className='max-w-78 text-[1.5rem] leading-[0.9] font-semibold tracking-[-0.064em] lg:text-[2rem] 2xl:text-[2.25rem]'>
					Your
					<br />
					freedom to
					<br />
					enjoy life
				</h3>
				<div className='mt-6 h-px w-8 bg-white lg:w-12' />
				<p className='mt-7 text-[0.625rem] leading-[1.35] font-semibold lg:text-xs 2xl:text-sm'>
					Every flight is designed around your comfort, time, and ambitions -- so you can focus on
					what truly matters, while we take care of everything else.
				</p>
			</motion.div>

			<motion.div
				className='absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 p-2 shadow-[0_16px_42px_rgba(0,0,0,0.28)] sm:bottom-[5.2%]'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.65, delay: 0.6, ease: 'easeOut' }}
			>
				<button className='text-textdark rounded-full bg-white px-6 py-4'>
					<p className='text-xs leading-none font-bold lg:text-sm'>Book the Flight</p>
				</button>
				<button
					aria-label='Open booking form'
					className='flex size-12 items-center justify-center rounded-full bg-white'
				>
					<MdFlightTakeoff className='text-textdark text-2xl' />
				</button>
			</motion.div>
		</section>
	);
};
