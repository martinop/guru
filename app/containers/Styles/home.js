import ScheduleMakerWallpaper from '../HomePage/images/schedule.jpg';
import SchedulesWallpaper from '../HomePage/images/schedules.jpg';
import ScoresWallpaper from '../HomePage/images/scores.jpg';
import FinancesWallpaper from '../HomePage/images/finances.jpg';
import URUWallpaper from '../HomePage/images/uru.jpg';
import CommunityWallpaper from '../HomePage/images/community.jpg';
import CalendarWallpaper from '../HomePage/images/calendar.jpg';
import LogoutWallpaper from '../HomePage/images/logout.png';

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
  },
  scheduleWpp: {
    backgroundImage: `url(${ScheduleMakerWallpaper})`,
  },
  schedulesWpp: {
    backgroundImage: `url(${SchedulesWallpaper})`,
  },
  scoresWpp: {
    backgroundImage: `url(${ScoresWallpaper})`,
  },
  communityWpp: {
    backgroundImage: `url(${CommunityWallpaper})`,
  },
  financesWpp: {
    backgroundImage: `url(${FinancesWallpaper})`,
  },
  logoutWpp: {
    backgroundImage: `url(${LogoutWallpaper})`,
  },
  calendarWpp: {
    backgroundImage: `url(${CalendarWallpaper})`,
  },
  darkBg: {
    background: 'rgba(0, 0, 0, 0.9)',
  },
  whiteColor: {
    color: 'white',
	},
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
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
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
	marginTop: {
		marginTop: 16
	}
});