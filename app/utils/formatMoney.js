export default (n, dd, tt, cc) => {
	const c = isNaN((cc = Math.abs(cc))) ? 2 : cc;
	const d = dd === undefined ? '.' : dd;
	const t = tt === undefined ? ',' : tt;
	const s = n < 0 ? '-' : '';
	const i = `${parseInt((n = Math.abs(+n || 0).toFixed(c)))}`;
	let j = (j = i.length) > 3 ? j % 3 : 0;
	return (
		s +
		(j ? i.substr(0, j) + t : '') +
		i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${t}`) +
		(c ? d + Math.abs(n - i).toFixed(c).slice(2) : '')
	);
};
