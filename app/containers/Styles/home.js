import ScheduleMakerWallpaper from '../HomePage/images/schedule.jpg';
import SchedulesWallpaper from '../HomePage/images/schedules.jpg';
import ScoresWallpaper from '../HomePage/images/scores.jpg';
import FinancesWallpaper from '../HomePage/images/finances.jpg';
import URUWallpaper from '../HomePage/images/uru.jpg';
import CommunityWallpaper from '../HomePage/images/community.jpg';
import CalendarWallpaper from '../HomePage/images/calendar.jpg';
import LogoutWallpaper from '../HomePage/images/logout.png';

export default () => ({
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
});