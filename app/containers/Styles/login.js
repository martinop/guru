export default (theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 90,
	},
	paper: {
		padding: '25px 50px',
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	title: {
		fontWeight: 700,
		fontSize: '5rem',
		color: '#00509e',
	},
	sendIcon: {
		marginLeft: 10,
	},
	loginBtn: {
		marginTop: 20,
	},
	description: {
		marginTop: 10,
		fontWeight: 300,
	},
	buttonProgress: {
		position: 'absolute',
		top: '65%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	wrapper: {
		margin: theme.spacing.unit,
		position: 'relative',
	},
});
