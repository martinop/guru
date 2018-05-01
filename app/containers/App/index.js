import React, { PureComponent } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import LoginPage from 'containers/LoginPage/Loadable';
import ToolsPage from 'containers/ToolsPage/Loadable';
import ScoresPage from 'containers/ScoresPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import PeriodPage from 'containers/PeriodPage/Loadable';
import CoursePage from 'containers/CoursePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PrivateRoute from '../../utils/privateRoute';
import Styles from '../Styles/app';
import Header from '../../components/header';
import isOnline from '../../utils/isOnline';

import LoginActions from '../../redux/redux-login';

class App extends PureComponent {
	state = {
		online: true,
	}
	componentWillMount() {
		isOnline().then(() => this.setState({ online: true })).catch(() => this.setState({ online: false }));
		this.props.attemptWithSession();
	}
	render() {
		const { classes, user } = this.props;
		return (
			<div className={classes.root}>
				{!this.state.online && (
					<div style={{ background: '#ff5951', color: 'white', padding: '5px 0px', fontSize: '18px', textAlign: 'center' }}>
						La aplicacion web esta funcionando de forma offline
					</div>
				)}
				<Header user={user} />
				<Switch>
					<Route exact path="/" component={LoginPage} />
					<PrivateRoute path="/tools" online={this.state.online} user={user} component={ToolsPage} />
					<PrivateRoute path="/home" online={this.state.online} user={user} component={HomePage} />
					<PrivateRoute path="/scores" online={this.state.online} user={user} component={ScoresPage} />
					<PrivateRoute path="/period" online={this.state.online} user={user} component={PeriodPage} />
					<PrivateRoute path="/course" online={this.state.online} user={user} component={CoursePage} />
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
