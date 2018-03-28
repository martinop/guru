import React, { PureComponent } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import LoginPage from 'containers/LoginPage/Loadable';
import ToolsPage from 'containers/ToolsPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PrivateRoute from '../../utils/privateRoute';
import Styles from '../Styles/app';
import Header from '../../components/header';

import LoginActions from '../../redux/redux-login';

class App extends PureComponent {
	componentWillMount() {
		this.props.attemptWithSession();
	}
	render() {
		const { classes, user } = this.props;
		return (
			<div className={classes.root}>
				<Header user={user} />
				<Switch>
					<Route exact path="/" component={LoginPage} />
					<PrivateRoute path="/tools" user={user} component={ToolsPage} />
					<PrivateRoute path="/home" user={user} component={HomePage} />
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object,
	attemptWithSession: PropTypes.func,
};


const mapStateToProps = (state) => {
	const { fetching, user } = state.get('login');
	return { fetching, user };
};

const mapDispatchToProps = (dispatch) => ({
	attemptWithSession: () => dispatch(LoginActions.loginWithSession()),
});

export default withRouter(withStyles(Styles)(connect(mapStateToProps, mapDispatchToProps)(App)));
