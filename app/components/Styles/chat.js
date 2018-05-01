export default () => ({
	chatMessages: {
		padding: '10px',
		height: '552px',
		overflowY: 'scroll',
		overflowX: 'hidden',
		display: 'flex',
		flexFlow: 'row wrap',
		alignContent: 'flex-start',
		marginBottom: '20px',
		flex: '1',
	},
	messageBoxHolder: {
		width: '100%',
		margin: '0 0 15px',
		display: 'flex',
		flexFlow: 'column',
		alignItems: 'flex-end',
	},
	messageBox: {
		padding: '6px 10px',
		borderRadius: '6px 0 6px 0',
		position: 'relative',
		background: 'rgba(32, 125, 214, 0.8)',
		color: '#FFFFFF',
		fontSize: '13px',
		lineHeight: '16px',
		'&:after': {
			content: '""',
			position: 'absolute',
			border: '10px solid transparent',
			borderTop: '10px solid rgba(32, 125, 214, 0.8)',
			borderRight: 'none',
			bottom: '-20px',
			right: '10px',
		},
	},
	inputContainer: {
		display: 'flex',
		width: '100%',
	},
	messageSender: {
		fontSize: '12px',
		margin: '0 0 10px',
		color: '#32325D',
		alignSelf: 'flex-start',
		fontWeight: '600',
	},
	messagePartner: {
		background: '#F7F7F9',
		alignSelf: 'flex-start',
		color: '#32325D',
		'&:after': {
			right: 'auto',
			bottom: 'auto',
			top: '-20px',
			left: '9px',
			border: '10px solid transparent',
			borderBottom: '10px solid #F7F7F9',
			borderLeft: 'none',
		},
	},
	inputHolder: {
		display: 'flex',
		flex: '1',
	},
	chatInput: {
		backgroundColor: '#f1f1f1',
		resize: 'none',
		padding: '5px 10px',
		height: '40px',
		fontSize: '14px',
		color: '#999999',
		flex: '1',
		lineHeight: '30px',
		border: 'none',
	},
	sendBtn: {
		color: 'white',
		fontSize: '15px',
		padding: '0 15px',
		border: '0',
		width: '100px !important',
		borderRadius: '0',
		height: '40px',
		lineHeight: '0px',
	},
	green: {
		backgroundColor: '#2ECC71',
		boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2) inset',
		letterSpacing: '0',
	},
	inactive: {
		backgroundColor: '#f1f1f1',
		boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2) inset !important',
		color: '#999999 !important',
		cursor: 'not-allowed',
	},
	loader: {
		textAlign: 'center',
		paddingBottom: '50px',
	},
});
