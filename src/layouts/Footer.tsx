import { motion } from 'motion/react';
import { MdFlightTakeoff } from 'react-icons/md';

export const Footer = () => {
	return (
		<motion.div
			className='fixed bottom-8 left-1/2 z-30 flex items-center gap-1 rounded-full bg-white/10 p-1.5 shadow-[0_16px_42px_rgba(0,0,0,0.28)] sm:bottom-8'
			style={{ x: '-50%' }}
		>
			<button className='text-textdark rounded-full bg-white px-6 py-3'>
				<p className='text-xs leading-none font-bold'>Book the Flight</p>
			</button>
			<button
				aria-label='Open booking form'
				className='flex size-10 items-center justify-center rounded-full bg-white'
			>
				<MdFlightTakeoff className='text-textdark text-2xl' />
			</button>
		</motion.div>
	);
};
