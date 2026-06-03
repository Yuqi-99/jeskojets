import { type FormEvent, useState } from 'react';
import { motion, type Transition } from 'motion/react';

const fadeTransition: Transition = { duration: 0.8, ease: 'easeOut' };

const fadeUp = {
	initial: { opacity: 0, y: 36 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.25 },
	transition: fadeTransition,
};

const features = [
	{
		title: 'Direct Access to Private Travel',
		body: 'Fly beyond boundaries with Jesko Jets. Our global operations ensure seamless, personalized travel experiences — from the first call to landing. Every journey is tailored to your comfort, privacy, and schedule.',
	},
	{
		title: 'Your Freedom to Enjoy Life',
		body: 'We value your time above all. Jesko Jets gives you the freedom to live, work, and relax wherever life takes you — without compromise.',
	},
	{
		title: 'Precision and Excellence',
		body: 'Each detail of your flight — from route planning to in-flight service — reflects our dedication to perfection. Our crew and fleet meet the highest global standards, ensuring reliability in every mission.',
	},
	{
		title: 'Global Reach, Personal Touch',
		body: 'With access to destinations in over 150 countries, Jesko Jets brings the world closer to you. Our experts manage every aspect of your flight, guaranteeing a smooth and effortless journey.',
	},
];

const stats = [
	['Maximum operating range', '11,263 km'],
	['Speed', '480 knots'],
	['Passenger capacity', 'Up to 12 seats (+1 cabin server)'],
	['Endurance', '14 hrs'],
	['Baggage capacity', '5.52 m3'],
	['Cruising altitude', '15,544 m'],
];

const specifications = [
	['Cabin length', '14.05 m2'],
	['Cabin Width', '2.49 m2'],
	['Cabin Height', '1.92 m2'],
];

const advantages = [
	{
		title: 'Pets',
		image: '/allow-pets.webp',
		body: 'Traveling with pets on a private jet means comfort and peace of mind for both owners and their companions. Our dedicated team ensures seamless arrangements, from documentation and safety to onboard care.',
	},
	{
		title: '24/7 availability',
		image: '/airplane-inside-1.avif',
		body: 'Our team is available around the clock to handle any request, no matter the time zone or urgency. From last-minute flight arrangements to personalized services, assistance is never more than a call away.',
	},
	{
		title: 'Onboard services',
		image: '/airplane-inside-2.avif',
		body: 'Every flight is tailored with a range of personalized onboard services designed to elevate your journey, from fine dining and curated entertainment to attentive crew and seamless connectivity.',
	},
	{
		title: 'Efficient',
		image: '/1.avif',
		body: 'Efficiency is at the core of every flight we operate. From optimized routes and streamlined procedures to quick boarding and smooth ground handling, your time is always used wisely.',
	},
];

const cities = [
	'Marrakech',
	'Abu Dhabi',
	'Tokyo',
	'Los Angeles',
	'Toronto',
	'Melbourne',
	'Sydney',
	'Dubai',
	'Berlin',
	'Lagos',
	'Shanghai',
	'Nice',
	'Milan',
	'Cape Town',
	'Singapore',
	'Cairo',
	'São Paulo',
	'New York',
	'Tel Aviv',
	'Mykonos',
	'Seoul',
	'Hong Kong',
	'Paris',
	'Bangkok',
	'Zurich',
	'Mexico City',
	'Riyadh',
	'Geneva',
	'Doha',
	'London',
	'Miami',
];

export const AI = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sent, setSent] = useState(false);

	const submitFlight = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSent(true);
	};

	return (
		<>
			<section
				id='top'
				className='relative min-h-screen overflow-hidden px-4 pt-24 pb-8 sm:px-6 lg:px-10'
			>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.96),rgba(244,241,234,0.82)_34%,rgba(214,205,191,0.46)_55%,rgba(29,27,24,0.08)_100%)]' />
				<motion.div
					aria-hidden='true'
					className='absolute top-[17vh] left-1/2 h-[58vh] w-[145vw] -translate-x-1/2 sm:h-[64vh] lg:top-[12vh] lg:h-[76vh] lg:w-[110vw]'
					initial={{ opacity: 0, scale: 1.08 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
				>
					<img
						src='/sky.webp'
						alt=''
						className='absolute inset-x-[30%] top-[19%] h-[46%] w-[40%] rounded-[45%] object-cover'
					/>
					<img
						src='/window-outline-img-hero-back.webp'
						alt=''
						className='absolute inset-0 h-full w-full object-contain'
					/>
					<img
						src='/cloud.webp'
						alt=''
						className='hero-cloud absolute top-[30%] left-[37%] w-[28%] opacity-80'
					/>
					<img
						src='/window-img-hero-front.webp'
						alt='jet window'
						className='absolute inset-0 h-full w-full object-contain'
					/>
					<img
						src='/shadow-img-hero-front-over.webp'
						alt=''
						className='absolute inset-0 h-full w-full object-contain mix-blend-multiply'
					/>
					<img
						src='/window-hand.webp'
						alt=''
						className='absolute bottom-[1%] left-[47%] w-[19%] min-w-28'
					/>
				</motion.div>

				<div className='relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-[1680px] flex-col justify-between'>
					<div className='flex justify-center'>
						<p className='rounded-full border border-black/10 bg-white/30 px-4 py-2 text-[11px] text-black/60 uppercase backdrop-blur'>
							Private jet charter worldwide
						</p>
					</div>

					<motion.div
						className='mx-auto mt-16 max-w-[1120px] text-center'
						initial={{ opacity: 0, y: 34 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.9, delay: 0.15 }}
					>
						<h1 className='text-[clamp(58px,11vw,180px)] leading-[0.86] font-medium'>
							<span className='block'>We are movement</span>
						</h1>
						<div className='mt-5 text-[clamp(25px,4vw,68px)] leading-[0.98] font-medium'>
							<p>We are distinction</p>
							<p>Your freedom to enjoy life</p>
						</div>
					</motion.div>

					<motion.div
						className='mx-auto grid w-full max-w-[1680px] items-end gap-8 text-center md:grid-cols-[1fr_minmax(280px,520px)_1fr] md:text-left'
						initial={{ opacity: 0, y: 28 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.35 }}
					>
						<div className='hidden text-xs text-black/45 uppercase md:block'>
							<p>Scroll down</p>
							<p>To start the journey</p>
						</div>
						<p className='text-base leading-7 text-balance text-black/68 md:text-center lg:text-lg'>
							Every flight is designed around your comfort, time, and ambitions — so you can focus
							on what truly matters, while we take care of everything else.
						</p>
						<div className='flex justify-center md:justify-end'>
							<button
								type='button'
								onClick={() => setIsModalOpen(true)}
								className='rounded-full bg-[#1d1b18] px-6 py-4 text-xs font-semibold text-white uppercase transition hover:bg-black'
							>
								Book the Flight
							</button>
						</div>
					</motion.div>
				</div>
			</section>

			<section id='about' className='relative px-4 py-20 sm:px-6 lg:px-10 lg:py-32'>
				<div className='mx-auto max-w-[1680px]'>
					<motion.h2
						{...fadeUp}
						className='max-w-[1240px] text-[clamp(34px,5.6vw,96px)] leading-[1.02] font-medium text-[#1d1b18]'
					>
						Jesko Jets® is a private aviation operator with over 5,000 missions completed across
						150+ countries.
					</motion.h2>

					<div className='mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16'>
						<motion.div {...fadeUp} className='self-end'>
							<p className='text-3xl font-medium'>Jesko Jets</p>
							<p className='mt-2 text-sm text-black/45 uppercase'>Global private aviation</p>
						</motion.div>
						<div className='grid gap-5 md:grid-cols-2'>
							{features.map((feature, index) => (
								<motion.article
									key={feature.title}
									{...fadeUp}
									transition={{ ...fadeUp.transition, delay: index * 0.06 }}
									className='border-t border-black/15 pt-6'
								>
									<h3 className='text-2xl leading-tight font-medium'>{feature.title}</h3>
									<p className='mt-5 text-sm leading-7 text-black/58'>{feature.body}</p>
								</motion.article>
							))}
						</div>
					</div>

					<div className='mt-24 grid h-[70vh] min-h-[520px] gap-4 lg:grid-cols-[0.9fr_1.2fr_0.9fr]'>
						<img
							src='/airplane-inside-1.avif'
							alt='view from the airplane window'
							className='hidden h-full w-full rounded-md object-cover lg:block'
						/>
						<img
							src='/airplane-inside-2.avif'
							alt=''
							className='h-full w-full rounded-md object-cover'
						/>
						<img
							src='/1.avif'
							alt=''
							className='hidden h-full w-full rounded-md object-cover lg:block'
						/>
					</div>
				</div>
			</section>

			<section
				id='fleet'
				className='relative overflow-hidden bg-[#1d1b18] px-4 py-20 text-[#f4f1ea] sm:px-6 lg:px-10 lg:py-32'
			>
				<div className='mx-auto max-w-[1680px]'>
					<motion.div {...fadeUp} className='flex items-end justify-between gap-8'>
						<div>
							<p className='text-sm text-white/45 uppercase'>Fly the Legacy</p>
							<h2 className='mt-4 text-[clamp(48px,10vw,160px)] leading-[0.9] font-medium'>
								Fly in
								<br />
								Luxury
							</h2>
						</div>
						<p className='hidden max-w-sm text-3xl leading-tight text-white/80 md:block'>
							Luxury that moves with you
						</p>
					</motion.div>

					<div className='relative mt-12 grid min-h-[680px] items-center gap-10 lg:grid-cols-[0.85fr_1.2fr_0.95fr]'>
						<motion.div {...fadeUp} className='relative z-10'>
							<p className='text-4xl font-medium'>Gulfstream</p>
							<p className='text-[clamp(68px,10vw,154px)] leading-none font-medium'>650ER</p>
							<p className='mt-8 max-w-md text-sm leading-7 text-white/58'>
								Featuring wings designed to minimize anything that could disrupt its natural
								aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 AI-12 engines, the
								Gulfstream G650 is engineered for exceptional range and top-end speed.
							</p>
						</motion.div>

						<motion.img
							src='/airplane.webp'
							alt='Jet gulfstream 650ER'
							className='relative z-0 mx-auto max-h-[780px] w-full max-w-[760px] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.45)]'
							initial={{ opacity: 0, y: 80, rotate: -4 }}
							whileInView={{ opacity: 1, y: 0, rotate: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
						/>

						<motion.div {...fadeUp} className='grid gap-6'>
							{stats.map(([label, value]) => (
								<div key={label} className='border-t border-white/15 pt-4'>
									<p className='text-xs text-white/42 uppercase'>{label}</p>
									<p className='mt-2 text-xl font-medium'>{value}</p>
								</div>
							))}
						</motion.div>
					</div>

					<div className='mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]'>
						<motion.div {...fadeUp}>
							<p className='text-sm text-white/42 uppercase'>Specification</p>
							<div className='mt-6 grid gap-4'>
								{specifications.map(([label, value]) => (
									<div key={label} className='flex justify-between border-t border-white/15 pt-4'>
										<span className='text-white/48'>{label}</span>
										<span>{value}</span>
									</div>
								))}
							</div>
						</motion.div>
						<motion.div {...fadeUp} className='rounded-md bg-[#ebe7dd] p-6'>
							<img
								src='/68fb29621db5bec757204250_bd047a5208d9d1f5339a58235598af09_section.svg'
								alt='Blueprint layout of a private jet interior showing seats, a bed, tables, and sinks.'
								className='h-full w-full object-contain'
							/>
						</motion.div>
					</div>
				</div>
			</section>

			<section id='advantages' className='px-4 py-20 sm:px-6 lg:px-10 lg:py-32'>
				<div className='mx-auto max-w-[1680px]'>
					<motion.h2
						{...fadeUp}
						className='text-[clamp(42px,8vw,132px)] leading-[0.92] font-medium'
					>
						A Better Way
						<br />
						to Fly
					</motion.h2>

					<div className='mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
						{advantages.map((advantage, index) => (
							<motion.article
								key={advantage.title}
								{...fadeUp}
								transition={{ ...fadeUp.transition, delay: index * 0.05 }}
								className='group overflow-hidden rounded-md bg-[#e7e1d6]'
							>
								<div className='aspect-[4/5] overflow-hidden'>
									<img
										src={advantage.image}
										alt={advantage.title}
										className='h-full w-full object-cover transition duration-700 group-hover:scale-105'
									/>
								</div>
								<div className='p-6'>
									<h3 className='text-2xl font-medium'>{advantage.title}</h3>
									<p className='mt-5 text-sm leading-7 text-black/58'>{advantage.body}</p>
								</div>
							</motion.article>
						))}
					</div>
				</div>
			</section>

			<section
				id='global'
				className='relative overflow-hidden bg-[#d8d3c7] px-4 py-20 sm:px-6 lg:px-10 lg:py-32'
			>
				<div className='mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-[0.85fr_1.15fr]'>
					<motion.div {...fadeUp} className='relative z-10'>
						<div className='grid max-w-xl grid-cols-3 border-y border-black/15 text-center'>
							<div className='py-6'>
								<p className='text-xs text-black/45 uppercase'>Countries supported</p>
								<p className='mt-3 text-4xl font-medium'>174</p>
							</div>
							<div className='border-x border-black/15 py-6'>
								<p className='text-xs text-black/45 uppercase'>Based in</p>
								<p className='mt-3 text-2xl font-medium'>Dubai, uAE</p>
							</div>
							<div className='py-6'>
								<p className='text-xs text-black/45 uppercase'>Local time</p>
								<p className='mt-3 text-4xl font-medium'>13:47</p>
							</div>
						</div>

						<h2 className='mt-14 text-[clamp(48px,9vw,142px)] leading-[0.9] font-medium'>
							Fly anywhere
						</h2>

						<div className='mt-10 grid grid-cols-2 gap-x-6 gap-y-3 text-xl font-medium sm:grid-cols-3'>
							{cities.map((city) => (
								<p key={city}>{city}</p>
							))}
						</div>
					</motion.div>

					<motion.div
						className='relative min-h-[520px]'
						initial={{ opacity: 0, scale: 0.92 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, amount: 0.25 }}
						transition={{ duration: 1 }}
					>
						<img
							src='/planet.webp'
							alt='globe'
							className='absolute top-1/2 left-1/2 w-[120%] max-w-[980px] -translate-x-1/2 -translate-y-1/2 object-contain'
						/>
					</motion.div>
				</div>
			</section>

			<footer className='bg-[#1d1b18] px-4 py-14 text-[#f4f1ea] sm:px-6 lg:px-10'>
				<div className='mx-auto grid max-w-[1680px] gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]'>
					<div>
						<h2 className='max-w-3xl text-[clamp(38px,6vw,96px)] leading-[0.95] font-medium'>
							Fly anywhere with total comfort and control
						</h2>
						<p className='mt-8 text-white/42'>©0000 jesko jets. All rights reserved</p>
					</div>
					<div>
						<p className='text-sm text-white/42 uppercase'>For inquiries</p>
						<a className='mt-4 block text-2xl' href='mailto:info@jeskojets.com'>
							info@jeskojets.com
						</a>
						<button
							type='button'
							onClick={() => setIsModalOpen(true)}
							className='mt-5 rounded-full border border-white/20 px-5 py-3 text-xs uppercase transition hover:bg-white hover:text-[#1d1b18]'
						>
							Contact
						</button>
					</div>
					<div>
						<p className='text-sm text-white/42 uppercase'>Contact</p>
						<a className='mt-4 block text-2xl' href='tel:+971544325050'>
							+971 54 432 5050
						</a>
					</div>
				</div>
			</footer>

			{isModalOpen && (
				<div className='fixed inset-0 z-[80] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm'>
					<motion.div
						initial={{ opacity: 0, y: 30, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						className='relative w-full max-w-lg rounded-md bg-[#f4f1ea] p-6 shadow-2xl'
					>
						<button
							type='button'
							onClick={() => {
								setIsModalOpen(false);
								setSent(false);
							}}
							className='absolute top-4 right-4 rounded-full border border-black/15 px-4 py-2 text-xs uppercase'
						>
							Close
						</button>
						<p className='text-sm text-black/45 uppercase'>Contact</p>
						<h3 className='mt-3 text-4xl font-medium'>Book the Flight</h3>
						{sent ? (
							<div className='mt-10 rounded-md bg-[#1d1b18] p-8 text-[#f4f1ea]'>
								<p className='text-sm text-white/42 uppercase'>Request sent</p>
								<p className='mt-3 text-4xl font-medium'>Thank you!</p>
								<p className='mt-4 text-white/62'>Our team will get back to you shortly</p>
							</div>
						) : (
							<form onSubmit={submitFlight} className='mt-8 grid gap-4'>
								{['Name', 'email', 'Phone', 'Arriving'].map((field) => (
									<input
										key={field}
										placeholder={field}
										className='h-14 rounded-md border border-black/10 bg-white/70 px-4 transition outline-none focus:border-black/35'
									/>
								))}
								<button className='mt-2 rounded-full bg-[#1d1b18] px-6 py-4 text-xs font-semibold text-white uppercase'>
									Submit
								</button>
								<p className='text-xs text-black/45'>
									By submitting, you agree to our Privacy Policy
								</p>
								<p className='text-xs text-black/45 uppercase'>flight: Gulfstream 650ER</p>
							</form>
						)}
					</motion.div>
				</div>
			)}
		</>
	);
};
