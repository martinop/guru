import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles/chat';

class PeriodPage extends React.Component {
	state = {
		inputMessage: '',
	}
	anotherMessage = (username, message, id) => (
        <div key={id} className={this.props.classes.messageBoxHolder} >
            <div className={this.props.classes.messageSender}>{username}</div>
            <div className={[this.props.classes.messageBox, this.props.classes.messagePartner].join(' ')}>
                {message}
            </div>
        </div>
    )

	myMessage = (message, _id) => (
        <div key={_id} className={this.props.classes.messageBoxHolder}>
            <div className={this.props.classes.messageBox}>{message}</div>
        </div>
	)

	sendMessage = () => {
		this.props.onSendMessage(this.state.inputMessage);
		this.setState({ inputMessage: '' });
	}
	render() {
		const { classes, messages, user, online, loading } = this.props;
		const { inputMessage } = this.state;
		const inputClasses = [classes.sendBtn, inputMessage.trim() === '' ? classes.inactive : classes.green].join(' ');
		if (loading)
			return (
				<div className={classes.loader} >
					<CircularProgress size={120} thickness={5} />
				</div>
			);
		return (
			<div>
				<div className={classes.chatMessages} >
					{messages && messages.map((m, index) => {
						const { message, id_user, username } = m;
						if (id_user === user.ced.toString())
							return this.myMessage(message, index);
						return this.anotherMessage(username, message, index);
					})}
				</div>
				<div className={classes.inputHolder}>
					{online && (
						<div className={classes.inputContainer}>
							<textarea
								className={classes.chatInput}
								value={inputMessage}
								onChange={(e) => this.setState({ inputMessage: e.target.value })}
							>
							</textarea>
							<input
								type="submit"
								value="Enviar"
								className={inputClasses}
								onClick={this.sendMessage}
							/>
						</div>
					)}
					{!online && (
						<h3 style={{ paddingLeft: '15px' }}>No puedes enviar mensajes sin conexion a internet.</h3>
					)}
				</div>
			</div>
		);
	}
}

PeriodPage.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object,
	messages: PropTypes.any,
	online: PropTypes.bool,
	loading: PropTypes.bool,
	onSendMessage: PropTypes.func,
};


export default withStyles(Styles)(PeriodPage);
