import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const waitForWindowLoad = () =>
	new Promise<void>((resolve) => {
		if (document.readyState === 'complete') {
			resolve();
			return;
		}

		window.addEventListener('load', () => resolve(), { once: true });
	});

const waitForImages = async () => {
	const images = Array.from(document.images);

	await Promise.all(
		images.map(async (image) => {
			if (!image.complete) {
				await new Promise<void>((resolve) => {
					image.addEventListener('load', () => resolve(), { once: true });
					image.addEventListener('error', () => resolve(), { once: true });
				});
			}

			if ('decode' in image) {
				await image.decode().catch(() => undefined);
			}
		})
	);
};

export const LoadingScreen = () => {
	const [isVisible, setIsVisible] = useState(true);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		let isCancelled = false;
		document.body.classList.add('is-loading');

		const minimumDisplay = new Promise<void>((resolve) => {
			window.setTimeout(resolve, prefersReducedMotion ? 700 : 1900);
		});

		const fontsReady = document.fonts?.ready ?? Promise.resolve();
		const safetyTimer = window.setTimeout(() => {
			if (!isCancelled) setIsVisible(false);
		}, 8000);

		Promise.all([waitForWindowLoad(), waitForImages(), fontsReady, minimumDisplay]).then(() => {
			if (isCancelled) return;
			window.clearTimeout(safetyTimer);
			setIsVisible(false);
		});

		return () => {
			isCancelled = true;
			window.clearTimeout(safetyTimer);
		};
	}, [prefersReducedMotion]);

	const finishLoading = () => {
		document.body.classList.remove('is-loading');
	};
	const loadingBackdropBlur = prefersReducedMotion ? 'blur(0px)' : 'blur(18px)';

	return (
		<AnimatePresence onExitComplete={finishLoading}>
			{isVisible ? (
				<motion.div
					key='loading-screen'
					role='status'
					aria-label='Loading Jesko Jets'
					className='z-loading fixed inset-0 flex items-center justify-center overflow-hidden px-6 text-center text-white'
					initial={{ backdropFilter: loadingBackdropBlur }}
					animate={{ backdropFilter: loadingBackdropBlur }}
					exit={{ backdropFilter: 'blur(0px)' }}
					transition={{ duration: prefersReducedMotion ? 0.25 : 1.35, ease: [0.22, 1, 0.36, 1] }}
				>
					<motion.div
						aria-hidden='true'
						className='absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,#2b211f_0%,#211918_56%,#191413_100%)]'
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: prefersReducedMotion ? 0.25 : 1.25,
							ease: [0.22, 1, 0.36, 1],
						}}
					/>
					<motion.div
						className='relative z-10'
						initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10, filter: 'blur(14px)' }}
						animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
						exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(14px)' }}
						transition={{
							duration: prefersReducedMotion ? 0.2 : 1.15,
							delay: prefersReducedMotion ? 0 : 0.18,
							ease: [0.22, 1, 0.36, 1],
						}}
					>
						<div className='text-[9px] leading-none font-bold tracking-[0.02em] uppercase sm:text-[10px]'>
							Jesko Jets
						</div>
						<div className='mt-3 text-[clamp(1.25rem,2vw,2rem)] leading-[0.9] font-medium tracking-[-0.055em]'>
							Private jet charter
							<br />
							worldwide
						</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};
