export default (theme) => ({
	container: {
		padding: '30px 100px 60px 100px',
		[theme.breakpoints.down('sm')]: {
			padding: '30px 60px 60px 60px',
		},
		[theme.breakpoints.down('xs')]: {
			padding: '60px 20px 60px 20px',
			justifyContent: 'center',
		},
	},
	title: {
		paddingBottom: '0px !important',
		display: 'flex',
		alignItems: 'flex-end',
		'& h1': {
			color: '#000000c9',
		},
	},
	boxItem: {
		height: '115px',
	},
	content: {
		padding: '15px',
	},
	activeCourse: {
		border: 'solid #000000c2 15px',
	},
});
