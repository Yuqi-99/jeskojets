import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import type { RefObject } from 'react';
import JLogo from 'src/assets/j-logo.svg?react';
import Sphere from 'src/assets/sphere.svg?react';

const aboutCopy =
	'Jesko Jets® is a private aviation operator with over 5,000 missions completed across 150+ countries. From international executives to global industries, our clients trust us to deliver on time, every time.';

const aboutHighlights = [
	{
		title: 'Direct Access to Private Travel',
		copy: 'Fly beyond boundaries with Jesko Jets. Our global operations ensure seamless, personalized travel experiences — from the first call to landing. Every journey is tailored to your comfort, privacy, and schedule.',
	},
	{
		title: 'Your Freedom to Enjoy Life',
		copy: 'We value your time above all. Jesko Jets gives you the freedom to live, work, and relax wherever life takes you — without compromise.',
	},
	{
		title: 'Precision and Excellence',
		copy: 'Each detail of your flight — from route planning to in-flight service — reflects our dedication to perfection. Our crew and fleet meet the highest global standards, ensuring reliability in every mission.',
	},
	{
		title: 'Global Reach, Personal Touch',
		copy: 'With access to destinations in over 150 countries, Jesko Jets brings the world closer to you. Our experts manage every aspect of your flight, guaranteeing a smooth and effortless journey.',
	},
];

type RevealCharProps = {
	progress: MotionValue<number>;
	index: number;
	total: number;
	children: string;
};

const RevealChar = ({ progress, index, total, children }: RevealCharProps) => {
	const start = 0.02 + (index / total) * 0.17;
	const end = start + 0.001;
	const color = useTransform(
		progress,
		[0, start, end, 1],
		['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)']
	);

	return <motion.span style={{ color }}>{children}</motion.span>;
};

type AboutSectionProps = {
	sectionRef: RefObject<HTMLElement | null>;
};

export const AboutSection = ({ sectionRef }: AboutSectionProps) => {
	const prefersReducedMotion = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end end'],
	});
	const containerY = useTransform(scrollYProgress, [0.1, 0.4], ['0px', '-50vh']);
	const containerOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);
	const detailsY = useTransform(scrollYProgress, [0.15, 0.4], ['100vh', '0px']);
	const detailsOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
	const chars = aboutCopy.split('');

	return (
		<section
			id='about'
			ref={sectionRef}
			className='relative z-2 -mt-[100vh] h-[350vh] bg-transparent bg-[url("/cloud-2.avif")] text-white'
		>
			<div className='sticky top-0 flex h-dvh min-h-170 flex-col overflow-hidden px-[6.55vw] pt-28 pb-24 sm:min-h-180 lg:pt-[34vh] lg:pb-20'>
				<motion.div
					style={
						prefersReducedMotion
							? { opacity: 1, y: 0 }
							: { opacity: containerOpacity, y: containerY }
					}
					className='flex flex-col gap-16 lg:gap-24'
				>
					<h2 className='relative z-10 max-w-6xl text-[clamp(2.5rem,4.55vw,5.1rem)] leading-[0.94] font-medium tracking-[-0.07em]'>
						{chars.map((char, index) =>
							prefersReducedMotion ? (
								<span key={`${char}-${index}`}>{char}</span>
							) : (
								<RevealChar
									key={`${char}-${index}`}
									progress={scrollYProgress}
									index={index}
									total={chars.length}
								>
									{char}
								</RevealChar>
							)
						)}
					</h2>

					<motion.div
						className='z-10 grid md:grid-cols-[15rem_1fr] md:gap-10 lg:grid-cols-[20rem_1fr]'
						style={prefersReducedMotion ? { opacity: 1 } : { opacity: detailsOpacity, y: detailsY }}
					>
						<div className='flex h-fit items-center justify-around gap-5'>
							<div className='flex size-16 items-center justify-center gap-2 text-lg'>
								<Sphere />
								<JLogo />
							</div>
							<div className='text-xs font-bold uppercase'>
								<div>Jesko Jets</div>
								<div>Global private aviation</div>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-x-12 gap-y-8'>
							{aboutHighlights.map((highlight) => (
								<article key={highlight.title}>
									<h3 className='max-w-64 text-2xl leading-[0.95] font-bold tracking-[-0.045em]'>
										{highlight.title}
									</h3>
									<div className='mt-4 h-px w-7 bg-white/85' />
									<p className='mt-4 max-w-70 text-[0.66rem] leading-[1.35] font-bold'>
										{highlight.copy}
									</p>
								</article>
							))}
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};
