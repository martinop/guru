import React from 'react';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Styles from '../Styles/home';
import ScheduleMakerWallpaper from '../HomePage/images/schedule.jpg';
import SchedulesWallpaper from '../HomePage/images/schedules.jpg';
import ScoresWallpaper from '../HomePage/images/scores.jpg';
import FinancesWallpaper from '../HomePage/images/finances.jpg';
import CommunityWallpaper from '../HomePage/images/community.jpg';
import CalendarWallpaper from '../HomePage/images/calendar.jpg';
import LogoutWallpaper from '../HomePage/images/logout.png';
import ButtonBase from 'material-ui/ButtonBase';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { classes } = this.props;
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
                MARTIN DE JESUS OCANDO PENA
                </Typography>
                <Typography type="title" className={classes.whiteColor}>
                  Ing. Computacion
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={9} sm={4} md={3}>
						<ButtonBase
							focusRipple
							key="Dasdsadas"
							className={classes.image}
							style={{
								width: '100%',
							}}
						>
							<span
								className={classes.imageSrc}
								style={{
									backgroundImage: `url(${SchedulesWallpaper})`,
								}}
							/>
							<span className={classes.imageBackdrop} />
							<span className={classes.imageButton}>
								<Typography
									type="subheading"
									color="inherit"
									className={classes.imageTitle}
								>
									HORARIO
									<span className={classes.imageMarked} />
								</Typography>
							</span>
						</ButtonBase>
						<ButtonBase
							focusRipple
							key="Dasdsad333as"
							className={[classes.image, classes.marginTop]}
							style={{
								width: '100%',
							}}
						>
							<span
								className={classes.imageSrc}
								style={{
									backgroundImage: `url(${ScheduleMakerWallpaper})`,
								}}
							/>
							<span className={classes.imageBackdrop} />
							<span className={classes.imageButton}>
								<Typography
									type="subheading"
									color="inherit"
									className={classes.imageTitle}
								>
									PREPARAR HORARIO
									<span className={classes.imageMarked} />
								</Typography>
							</span>
						</ButtonBase>
          </Grid>
          
        </Grid>
        <Grid
          container
          justify="center"
          direction="row"
          spacing={16}
        >
          <Grid item xs={9} sm={3}>
					<ButtonBase
							focusRipple
							key="Dasdsad333as"
							className={[classes.image, classes.marginTop]}
							style={{
								width: '100%',
							}}
						>
							<span
								className={classes.imageSrc}
								style={{
									backgroundImage: `url(${ScoresWallpaper})`,
								}}
							/>
							<span className={classes.imageBackdrop} />
							<span className={classes.imageButton}>
								<Typography
									type="subheading"
									color="inherit"
									className={classes.imageTitle}
								>
									CALIFICACIONES
									<span className={classes.imageMarked} />
								</Typography>
							</span>
						</ButtonBase>
          </Grid>
          <Grid item xs={9} sm={3}>
					<ButtonBase
							focusRipple
							key="Dasdsad333as"
							className={[classes.image, classes.marginTop]}
							style={{
								width: '100%',
							}}
						>
							<span
								className={classes.imageSrc}
								style={{
									backgroundImage: `url(${FinancesWallpaper})`,
								}}
							/>
							<span className={classes.imageBackdrop} />
							<span className={classes.imageButton}>
								<Typography
									type="subheading"
									color="inherit"
									className={classes.imageTitle}
								>
									FINANZAS
									<span className={classes.imageMarked} />
								</Typography>
							</span>
						</ButtonBase>
          </Grid>
          <Grid item xs={9} sm={3}>
					<ButtonBase
							focusRipple
							key="Dasdsad333as"
							className={[classes.image, classes.marginTop]}
							style={{
								width: '100%',
							}}
						>
							<span
								className={classes.imageSrc}
								style={{
									backgroundImage: `url(${CommunityWallpaper})`,
								}}
							/>
							<span className={classes.imageBackdrop} />
							<span className={classes.imageButton}>
								<Typography
									type="subheading"
									color="inherit"
									className={classes.imageTitle}
								>
									COMUNIDAD
									<span className={classes.imageMarked} />
								</Typography>
							</span>
						</ButtonBase>
          </Grid>
          
        </Grid>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { user } = state.get('login');
  return { user };
};


export default withStyles(Styles)(connect(mapStateToProps)(HomePage));
