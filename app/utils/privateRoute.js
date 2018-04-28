import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import {
    Route,
    Redirect,
    withRouter,
  } from 'react-router-dom';

import { CircularProgress } from 'material-ui/Progress';

const PrivateRoute = ({ classes, component: Component, user, fetching, ...rest }) => {
	if (fetching)
		return (
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
	else if (!fetching && !user)
		return <Redirect to={{ pathname: '/' }} />;
	return (
		<Route
			{...rest}
			render={(props) => <Component {...props} />}
		/>
	);
};

const Styles = {
	container: {
		marginTop: '50px',
		textAlign: 'center',
		padding: '30px',
	},
};

PrivateRoute.propTypes = {
	component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
	location: PropTypes.object,
	fetching: PropTypes.bool,
	user: PropTypes.any,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	const { fetching, user } = state.get('login');
	return { fetching, user };
};

const wRouter = withRouter(PrivateRoute);
const wStyle = withStyles(Styles)(wRouter);
export default connect(mapStateToProps)(wStyle);
