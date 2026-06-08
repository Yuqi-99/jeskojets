import { Outlet } from 'react-router-dom';
import { Footer } from 'src/layouts/Footer';
import { Header } from 'src/layouts/Header';

export const RootLayout = () => {
	return (
		<main className='bg-[#f4f1ea] text-[#1d1b18]'>
			<div className='relative mx-auto flex min-h-screen w-full flex-col items-stretch justify-start overflow-hidden'>
				<Header />
				<Outlet />
				<Footer />
			</div>
		</main>
	);
};
