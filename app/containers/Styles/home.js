import URUWallpaper from '../HomePage/images/uru.jpg';

export default (theme) => ({
	root: {
		flex: '1 1 auto',
		marginTop: 40,
	},
	boxTitleContainer: {
		position: 'absolute',
		bottom: '0',
		left: 0,
		padding: '15px',
		width: '100%',
		background: 'rgba(0, 0, 0, 0.6)',
	},
	boxTitle: {
		color: 'white',
		userSelect: 'none',
	},
	boxContent: {
		marginTop: '16px',
		display: 'block',
		position: 'relative',
		overflow: 'hidden',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		height: '160px',
	},
	scheduleBoxContent: {
		marginTop: '0px !important',
	},
	mainBoxContent: {
		width: '100%',
		display: 'block',
		position: 'relative',
		overflow: 'hidden',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		height: '100%',
		backgroundImage: `url(${URUWallpaper})`,
		[theme.breakpoints.down('xs')]: {
			height: 200,
		},
	},
	whiteColor: {
		color: 'white',
	},
	marginTop: {
		marginTop: 16,
	},
});
