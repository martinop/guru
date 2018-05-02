import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import Styles from './Styles/header';
import Logout from '../api/logout';
import LoginActions from '../redux/redux-login';

function Header({ classes, user, history, attemptLogout }) {
	const logout = () =>
		Logout().then(() => {
			attemptLogout();

		}).catch((err) => console.log(err));
	return (
		<AppBar position="static" className={classes.nav}>
			<Toolbar>
					<Typography
						onClick={() => history.push('/home')}
						variant="title"
						color="inherit"
						className={classes.flex}
						style={{ cursor: 'pointer' }}
					>
						GURU
					</Typography>
					{user ? <Button onClick={() => history.push('/home')} color="inherit">Inicio</Button> : null}
					{user ? <Button onClick={logout} color="inherit">Salir</Button> : null}
			</Toolbar>
		</AppBar>
	);
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object,
	history: PropTypes.object,
	attemptLogout: PropTypes.func,
};

const mapStateToProps = (state) => {
	const { user } = state.get('login');
	return { user };
};
const mapDispatchToProps = (dispatch) => ({
	attemptLogout: () => dispatch(LoginActions.logoutRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(Styles)(Header)));
