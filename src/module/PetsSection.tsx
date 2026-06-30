import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

const benefitsCards = [
	{
		title: 'Pets',
		image: '/allow-pets.webp',
		imageAlt: 'Dog resting inside a private jet cabin',
		description:
			'Traveling with pets on a private jet means comfort and peace of mind for both owners and their companions. Our dedicated team ensures seamless arrangements, from documentation and safety to onboard care, so that your pet enjoys the same level of attention and luxury as you do. Every detail is managed to create a stress-free and enjoyable journey for everyone on board.',
	},
	{
		title: '24/7 availability',
		image: '/24:7-availability.webp',
		imageAlt: 'Private jet cabin service available around the clock',
		description:
			'Our team is available around the clock to handle any request, no matter the time zone or urgency. From last-minute flight arrangements to personalized services, we provide seamless support whenever you need it. With us, assistance is never more than a call away.',
	},
	{
		title: 'Onboard services',
		image: '/onboard-services.webp',
		imageAlt: 'Private jet onboard dining and service details',
		description:
			'Every flight is tailored with a range of personalized onboard services designed to elevate your journey. From fine dining and curated entertainment to attentive crew and seamless connectivity, every detail is arranged to ensure maximum comfort and enjoyment in the air.',
	},
	{
		title: 'Efficient',
		image: '/efficient.webp',
		imageAlt: 'Private jet prepared for an efficient journey',
		description:
			'Efficiency is at the core of every flight we operate. From optimized routes and streamlined procedures to quick boarding and smooth ground handling, we make sure your time is always used wisely. The result is a seamless journey that gets you where you need to be, faster and without compromise.',
	},
];

export const PetsSection = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const [activeCardIndex, setActiveCardIndex] = useState(0);
	const prefersReducedMotion = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});

	const contentY = useTransform(scrollYProgress, [0, 0.28, 1], ['4vh', '0vh', '-6vh']);
	const mediaY = contentY;
	const mediaInnerY = useTransform(scrollYProgress, [0, 1], ['-25%', '8%']);
	const activeCard = benefitsCards[activeCardIndex];

	return (
		<section
			id='benefits'
			ref={sectionRef}
			className='relative z-5 -mt-px min-h-[128vh] overflow-hidden bg-[linear-gradient(to_bottom,#d8d1cb_0%,#d8d1cb_10vh,#FFF8ED_42vh,#FFF8ED_68vh,#FFF8ED_100%)] px-[6.55vw] pt-[5vh] pb-[10vh] text-[#1d1b18] md:min-h-[140vh] md:pt-[6vh] md:pb-[12vh]'
		>
			<div className='grid gap-10 md:grid-cols-[1fr_0.75fr] md:gap-[8vw]'>
				<motion.div
					className='flex min-h-[82vh] flex-col justify-between md:min-h-[96vh]'
					style={prefersReducedMotion ? { y: 0 } : { y: contentY }}
				>
					<div className='border-t border-[#1d1b18]/15 pt-3 text-[9px] leading-none font-bold tracking-[-0.02em] uppercase md:text-[10px]'>
						A Better Way to Fly
					</div>

					{/* <div className='flex-1' aria-hidden='true' /> */}

					<div className='mb-0 max-w-120 md:mb-[12%]'>
						{benefitsCards.map((card, index) => {
							const isOpen = index === activeCardIndex;

							return (
								<motion.div
									key={card.title}
									layout
									className='border-t border-[#1d1b18]/15 last:border-b'
									whileHover={
										prefersReducedMotion ? undefined : { paddingTop: 24, paddingBottom: 24 }
									}
									transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
								>
									<button
										type='button'
										aria-expanded={isOpen}
										onClick={() => setActiveCardIndex(index)}
										className='flex w-full items-start justify-between gap-6 py-4 text-left md:py-5'
									>
										<h2 className='text-[clamp(1.05rem,1.4vw,2.05rem)] leading-[0.95] font-medium tracking-[-0.055em]'>
											{card.title}
										</h2>
										<motion.span
											animate={{ rotate: isOpen ? 0 : 90 }}
											transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
											className='text-[clamp(1.25rem,1.5vw,1.75rem)] leading-none font-medium'
										>
											{isOpen ? '−' : '+'}
										</motion.span>
									</button>

									<AnimatePresence initial={false}>
										{isOpen ? (
											<motion.div
												key={`${card.title}-description`}
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: 'auto', opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
												className='overflow-hidden'
											>
												<p className='max-w-76 pt-[7vh] pb-6 text-[10px] leading-[1.28] font-medium tracking-[-0.035em] md:text-[11px]'>
													{card.description}
												</p>
											</motion.div>
										) : null}
									</AnimatePresence>
								</motion.div>
							);
						})}
					</div>
				</motion.div>

				<motion.div
					className='h-[72vh] overflow-hidden md:h-screen'
					style={prefersReducedMotion ? { y: 0 } : { y: mediaY }}
				>
					<div className='relative h-full w-full overflow-hidden'>
						<motion.div
							className='absolute inset-x-0 top-0 h-full will-change-transform'
							style={prefersReducedMotion ? { y: '-8%' } : { y: mediaInnerY }}
						>
							<AnimatePresence mode='popLayout'>
								<motion.div
									key={activeCard.image}
									className='absolute inset-0 overflow-hidden'
									initial={prefersReducedMotion ? false : { y: '100%' }}
									animate={{ y: '0%' }}
									exit={prefersReducedMotion ? { opacity: 0 } : { y: '-10%', opacity: 0 }}
									transition={{ duration: 0.95, ease: [0.23, 1, 0.32, 1] }}
								>
									<motion.img
										src={activeCard.image}
										alt={activeCard.imageAlt}
										className='h-full w-full object-cover object-center will-change-transform'
										initial={prefersReducedMotion ? false : { scale: 1.65 }}
										animate={{ scale: 1 }}
										exit={prefersReducedMotion ? { opacity: 0 } : { scale: 1.05 }}
										transition={{ duration: 0.95, ease: [0.23, 1, 0.32, 1] }}
									/>
								</motion.div>
							</AnimatePresence>
						</motion.div>
					</div>
				</motion.div>
			</div>

			<div className='border-t border-solid border-[#1d1b18]/15'>
				<div className='mt-5 flex flex-wrap-reverse justify-between gap-4 md:flex-row md:gap-0'>
					<div className='flex flex-col uppercase'>
						<p className='text-[10px] font-bold text-[#1d1b18]/45'>Countries Supported</p>
						<p className='text-[10px] font-bold'>174</p>
					</div>

					<div className='flex flex-col uppercase'>
						<p className='text-[10px] font-bold text-[#1d1b18]/45'>Based In</p>
						<p className='text-[10px] font-bold'>Dubai, Uae</p>
					</div>

					<div className='flex gap-2 uppercase'>
						<p className='text-[10px] font-bold text-[#1d1b18]/45'>Local Time</p>
						<p className='-mt-1 text-3xl font-bold'>13:48</p>
					</div>
				</div>
			</div>
		</section>
	);
};
