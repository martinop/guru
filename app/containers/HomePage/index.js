import React from 'react';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Styles from '../Styles/home';

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
          <Grid item xs={9} sm={4} md={6}>
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
            <Paper elevation={0} className={[classes.boxContent, classes.scheduleBoxContent, classes.schedulesWpp].join(' ')}>
              <div className={classes.boxTitleContainer}>
                <Typography type="headline" className={classes.boxTitle}>
                  Horario
                </Typography>
              </div>
            </Paper>
            <Paper elevation={0} className={[classes.boxContent, classes.scheduleWpp].join(' ')}>
              <div className={classes.boxTitleContainer}>
                <Typography type="headline" className={classes.boxTitle}>
                  Prepara tu horario
                </Typography>
              </div>
            </Paper>
          </Grid>
          
        </Grid>
        <Grid
          container
          justify="center"
          direction="row"
          spacing={16}
        >
          <Grid item xs={9} sm={3}>
            <Paper elevation={0} className={[classes.boxContent, classes.scoresWpp].join(' ')}>
              <div className={classes.boxTitleContainer}>
                <Typography type="headline" className={classes.boxTitle}>
                  Calificaciones
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={9} sm={3}>
            <Paper elevation={0} className={[classes.boxContent, classes.financesWpp].join(' ')}>
              <div className={classes.boxTitleContainer}>
                <Typography type="headline" className={classes.boxTitle}>
                  Finanzas
                </Typography>
              </div>
            </Paper>
            <div className={classes.darkBg} />
          </Grid>
          <Grid item xs={9} sm={3}>
            <Paper elevation={0} className={[classes.boxContent, classes.communityWpp].join(' ')}>
              <div className={classes.boxTitleContainer}>
                <Typography type="headline" className={classes.boxTitle}>
                  Comunidad
                </Typography>
              </div>
            </Paper>
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
