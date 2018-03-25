const config = {
	url: 'https://ipv4.icanhazip.com/',
	timeout: 5000,
	interval: 5000,
};

const isOnline = () =>
	new Promise((resolve) => {
		const xhr = new XMLHttpRequest();
		xhr.onerror = resolve(false);
		xhr.ontimeout = resolve(false);
		xhr.onload = () => {
			const response = xhr.responseText.trim();
			if (!response)
				resolve(false);
			else
                resolve(true);
		};

		xhr.open('GET', config.url);
		xhr.timeout = config.url;
		xhr.send();
	});

export default isOnline;
