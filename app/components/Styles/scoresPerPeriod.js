export default () => ({
	summary: {
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	circle: {
		width: '32px',
		height: '32px',
		borderRadius: '100%',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	circleText: {
		fontWeight: '600',
		color: 'white',
	},
	red: {
		backgroundColor: '#ff4949',
	},
	green: {
		backgroundColor: '#5bf45c',
		'& $circleText': {
			color: '#212020de',
		},
	},
	super: {
		backgroundColor: '#00509e',
	},
});
