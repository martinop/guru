import React from 'react';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Styles from '../Styles/home';
import ScheduleMakerWallpaper from '../HomePage/images/schedule.jpg';
import SchedulesWallpaper from '../HomePage/images/schedules.jpg';
import ScoresWallpaper from '../HomePage/images/scores.jpg';
import FinancesWallpaper from '../HomePage/images/finances.jpg';
import CommunityWallpaper from '../HomePage/images/community.jpg';
// import CalendarWallpaper from '../HomePage/images/calendar.jpg';
// import LogoutWallpaper from '../HomePage/images/logout.png';
import BoxItem from '../../components/boxItem';
import ScheduleModal from '../../components/scheduleModal';
import mySchedule from '../../api/mySchedule';

import isOnline from '../../utils/isOnline';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
	state = {
		scheduleModal: false,
		schedule: {},
		online: true,
	}
	componentDidMount() {
		mySchedule().then((schedule) => this.setState({ schedule }));
		isOnline().then(() => this.setState({ online: true })).catch(() => this.setState({ online: false }));
	}
	render() {
		const { classes, user, history: { push } } = this.props;
		const { scheduleModal, schedule, online } = this.state;
		return (
			<div className={classes.root}>
				<Grid
					container
					justify="center"
					direction="row"
					spacing={16}
				>
					<Grid item xs={9} sm={5} md={6}>
						<Paper elevation={0} className={classes.mainBoxContent}>
						<div className={classes.boxTitleContainer}>
							<Typography type="headline" className={classes.whiteColor}>
							{user.name}
							</Typography>
							<Typography type="title" className={classes.whiteColor}>
							Ing. Computacion
							</Typography>
						</div>
						</Paper>
					</Grid>
					<Grid item xs={9} sm={4} md={3}>
						<BoxItem
							label="Horario"
							image={SchedulesWallpaper}
							onClick={() => this.setState({ scheduleModal: true })}
						/>
						<BoxItem
							label="Preparar Horario"
							image={ScheduleMakerWallpaper}
							customClasses={[classes.marginTop]}
							onClick={() => push('/tools')}
							disabled={!online}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					justify="center"
					direction="row"
					spacing={16}
				>
					<Grid item xs={9} sm={3}>
						<BoxItem
							label="Calificaciones"
							image={ScoresWallpaper}
							customClasses={[classes.marginTop]}
						/>
						</Grid>
					<Grid item xs={9} sm={3}>
						<BoxItem
							label="Finanzas"
							image={FinancesWallpaper}
							customClasses={[classes.marginTop]}
						/>
					</Grid>
					<Grid item xs={9} sm={3}>
						<BoxItem
							label="Comunidad"
							image={CommunityWallpaper}
							customClasses={[classes.marginTop]}
						/>
					</Grid>
				</Grid>
				<ScheduleModal
					open={scheduleModal}
					data={schedule}
					close={() => this.setState({ scheduleModal: false })}
				/>
			</div>
		);
	}
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object,
	history: PropTypes.shape({
		push: React.PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = (state) => {
	const { user } = state.get('login');
	return { user };
};

const wStyles = withStyles(Styles)(HomePage);
const wRouter = withRouter(wStyles);

export default connect(mapStateToProps)(wRouter);
