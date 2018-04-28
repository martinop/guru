import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import Styles from './Styles/header';

function Header({ classes, user, history }) {
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
					{user ? <Button color="inherit">Salir</Button> : null}
			</Toolbar>
		</AppBar>
	);
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object,
	history: PropTypes.object,
};
export default withRouter(withStyles(Styles)(Header));
