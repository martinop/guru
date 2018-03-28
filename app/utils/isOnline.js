const config = {
	url: 'https://ipv4.icanhazip.com/',
	timeout: 5000,
	interval: 5000,
};

const isOnline = () =>
	new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onerror = () => reject();
		xhr.ontimeout = () => reject();
		xhr.onload = () => {
			const response = xhr.responseText.trim();
			if (!response)
				reject();
			else
                resolve();
		};
		xhr.open('GET', config.url);
		xhr.timeout = config.url;
		xhr.send();
	});

export default isOnline;
