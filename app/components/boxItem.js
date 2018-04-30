import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles/boxItem';

function BoxItem({ label, image, color, classes, customClasses, onClick, disabled }) {
	const buttonClasses = customClasses ? [classes.image, customClasses.join(' ')].join(' ') : classes.image;
	const onlineLabel = (
		<Typography
			variant="subheading"
			color="inherit"
			className={classes.imageTitle}
		>
			{ label }
			<span className={classes.imageMarked} />
		</Typography>
	);
	const offlineLabel = (
		<Typography
			variant="subheading"
			color="inherit"
			className={classes.offlineTitle}
		>
			ESTA FUNCION NO ESTA DISPONIBLE SIN CONEXION
		</Typography>
	);
	const containerStyle = image ? { backgroundImage: `url(${image})` } : { backgroundColor: color };
	const backdropClass = image ? [classes.imageBackdrop, disabled ? classes.offline : null].join(' ') : classes.normalBackdrop;
	return (
		<ButtonBase
			focusRipple
			key={label}
			className={buttonClasses}
			style={{ width: '100%' }}
			onClick={onClick}
			disabled={disabled}
		>
			<span
				className={classes.imageSrc}
				style={containerStyle}
			/>
			<span className={backdropClass} />
			<span className={classes.imageButton}>
				{!disabled && onlineLabel}
				{disabled && offlineLabel}
			</span>
		</ButtonBase>
	);
}
BoxItem.propTypes = {
	classes: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	image: PropTypes.string,
	onClick: PropTypes.func,
	customClasses: PropTypes.array,
	disabled: PropTypes.bool,
};

BoxItem.defaulProps = {
	disabled: false,
};

export default withStyles(Styles)(BoxItem);
