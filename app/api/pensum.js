export default (cookie) =>
	fetch(`http://guru-sv.risky.rocks/API/pensum?cookie=${cookie}`)
	.then((response) => response.json());
