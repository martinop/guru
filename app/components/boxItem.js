import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles/boxItem';

function BoxItem({ label, image, classes, customClasses, onClick, disabled }) {
	const buttonClasses = customClasses ? [classes.image, customClasses.join(' ')].join(' ') : classes.image;
	const onlineLabel = (
		<Typography
			type="subheading"
			color="inherit"
			className={classes.imageTitle}
		>
			{ label }
			<span className={classes.imageMarked} />
		</Typography>
	);
	const offlineLabel = (
		<Typography
			type="subheading"
			color="inherit"
			className={classes.offlineTitle}
		>
			ESTA FUNCION NO ESTA DISPONIBLE SIN CONEXION
		</Typography>
	);
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
				style={{ backgroundImage: `url(${image})` }}
			/>
			<span className={[classes.imageBackdrop, disabled ? classes.offline : null].join(' ')} />
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
	image: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	customClasses: PropTypes.array,
	disabled: PropTypes.bool,
};

BoxItem.defaulProps = {
	disabled: false,
};

export default withStyles(Styles)(BoxItem);
