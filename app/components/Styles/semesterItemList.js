export default (theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	coursesSelector: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	noActiveCourse: {
		margin: 3,
	},
	activeCourse: {
		backgroundColor: '#00509e',
		color: 'white',
		'&:hover': {
			backgroundColor: '#0d4984',
		},
	},
	dispersionCourse: {
		backgroundColor: 'red',
		color: 'white',
		'&:hover': {
			backgroundColor: 'red',
		},
	},
});
