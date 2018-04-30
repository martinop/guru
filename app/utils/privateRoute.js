import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Route,
    Redirect,
    withRouter,
  } from 'react-router-dom';
import Loading from '../components/loading';

const PrivateRoute = ({ component: Component, user, fetching, ...rest }) => {
	if (fetching)
		return (
			<Loading />
		);
	else if (!fetching && !user)
		return <Redirect to={{ pathname: '/' }} />;
	return (
		<Route
			{...rest}
			render={(props) => <Component {...props} user={user} />}
		/>
	);
};

PrivateRoute.propTypes = {
	component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
	location: PropTypes.object,
	fetching: PropTypes.bool,
	user: PropTypes.any,
};

const mapStateToProps = (state) => {
	const { fetching, user } = state.get('login');
	return { fetching, user };
};

const wRouter = withRouter(PrivateRoute);
export default connect(mapStateToProps)(wRouter);
