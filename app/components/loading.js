import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import { CircularProgress } from 'material-ui/Progress';

const Loading = ({ classes }) => (
    <Grid
	container
	justify="center"
	direction="row"
	spacing={40}
    >
        <Grid item xs={11} sm={8} md={6} >
            <Paper className={classes.container} >
                <CircularProgress size={84} thickness={5} />
            </Paper>
        </Grid>
    </Grid>
);

const Styles = {
	container: {
		marginTop: '50px',
		textAlign: 'center',
		padding: '30px',
	},
};

Loading.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(Loading);
