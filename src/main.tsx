import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'src/App';

if ('scrollRestoration' in history) {
	history.scrollRestoration = 'manual';
}

const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

if (favicon) {
	const faviconFrames = ['/jlogo.png', '/jlogo-white.png'];
	let activeFrame = 0;

	window.setInterval(() => {
		activeFrame = (activeFrame + 1) % faviconFrames.length;
		favicon.href = faviconFrames[activeFrame];
	}, 12000);
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
