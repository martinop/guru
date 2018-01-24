import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles/header';

function Header({ classes, user }) {
	return (
		<AppBar position="static" className={classes.nav}>
			<Toolbar>
					<Typography type="title" color="inherit" className={classes.flex}>
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
};
export default withStyles(Styles)(Header);
