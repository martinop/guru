export default (theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 30,
	},
	grid: {
		padding: 15,
	},
	processBtn: {
		marginTop: 16,
	},
	buttonProgress: {
		position: 'absolute',
		top: '65%',
		left: '40%',
		marginTop: -12,
		marginLeft: -12,
	},
	wrapper: {
		position: 'relative',
	},
	mBottom: {
		marginBottom: 20,
	},
	mRight: {
		marginRight: 10,
	},
	pensumProgress: {
		margin: `0 ${theme.spacing.unit * 2}px`,
	},
	gridLoading: {
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		padding: 30,
	},
});
