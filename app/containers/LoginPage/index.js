/* eslint-disable react/no-array-index-key */

import React from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import bindInput from 'utils/bindInput';
import { Redirect, withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import LoginActions from '../../redux/redux-login';
import Styles from '../Styles/login';

class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

	state = {
		courses: [],
		id: '',
		password: '',
	}

	handlePressLogin = () => {
		const { id, password } = this.state;
		this.props.attemptLogin(id, password);
	}

	render() {
		const { classes, fetching, user } = this.props;
		if (user)
			return <Redirect to="/home" />;
		return (
			<div className={classes.root} >
				<Grid
					container
					alignItems="center"
					justify="center"
					direction="row"
				>
					<Grid item xs={10} sm={6} md={4} lg={3}>
						<Paper className={classes.paper}>
							<Typography
								type="display3"
								className={classes.title}
							>
								Guru
							</Typography>
							<form noValidate autoComplete="off">
								<TextField
									label="Cedula"
									margin="normal"
									onChange={bindInput(this, 'id')}
									fullWidth
								/>
								<TextField
									label="Contrasena"
									margin="normal"
									type="password"
									onChange={bindInput(this, 'password')}
									fullWidth
								/>
								<div className={classes.wrapper}>
									<Button
										variant="raised"
										onClick={this.handlePressLogin}
										className={classes.loginBtn}
										color="primary"
										disabled={fetching}
									>
										Ingresar
										<Send className={classes.sendIcon} />
									</Button>
									{fetching && <CircularProgress size={24} className={classes.buttonProgress} />}

								</div>
							</form>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

LoginPage.propTypes = {
	classes: PropTypes.object.isRequired,
	fetching: PropTypes.bool,
	user: PropTypes.object,
	attemptLogin: PropTypes.func,
};

const mapStateToProps = (state) => {
	const { fetching, error, user } = state.get('login');
	return { fetching, error, user };
};

const mapDispatchToProps = (dispatch) => ({
	attemptLogin: (id, password) => dispatch(LoginActions.loginRequest(id, password)),
});

const wStyle = withStyles(Styles)(LoginPage);
const wRouter = withRouter(wStyle);

export default connect(mapStateToProps, mapDispatchToProps)(wRouter);
