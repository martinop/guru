export default (cookie) =>
	fetch(`http://guru-sv.risky.rocks/API/schedule/v2?cookie=${cookie}`)
	.then((response) => response.json());

