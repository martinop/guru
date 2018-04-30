export default (theme) => ({
	image: {
		position: 'relative',
		height: 200,
		[theme.breakpoints.down('xs')]: {
			width: '100% !important', // Overrides inline-style
			height: 200,
		},
		'&:hover': {
			zIndex: 1,
		},
		'&:hover $imageBackdrop': {
			opacity: 0.15,
		},
		'&:hover $imageMarked': {
			opacity: 0,
		},
		'&:hover $imageTitle': {
			background: 'rgba(0, 0, 0, 0.7)',
			border: '4px solid currentColor',
		},
	},
	imageButton: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.common.white,
	},
	imageSrc: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: 'cover',
		backgroundPosition: 'center 40%',
	},
	imageBackdrop: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: theme.palette.common.black,
		opacity: 0.7,
		transition: theme.transitions.create('opacity'),
	},
	normalBackdrop: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		opacity: 0.7,
	},
	offline: {
		opacity: 0.9,
	},
	offlineTitle: {
		position: 'relative',
		fontSize: 20,
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
		[theme.breakpoints.down('xs')]: {
			fontSize: 25,
		},
	},
	imageTitle: {
		position: 'relative',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
		[theme.breakpoints.down('xs')]: {
			fontSize: 25,
		},
	},
	imageMarked: {
		height: 3,
		width: 18,
		backgroundColor: theme.palette.common.white,
		position: 'absolute',
		bottom: -2,
		left: 'calc(50% - 9px)',
		transition: theme.transitions.create('opacity'),
	},
});
