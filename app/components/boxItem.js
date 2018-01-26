import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles/boxItem';

function BoxItem({ label, image, classes, customClasses, onClick }) {
	const buttonClasses = customClasses ? [classes.image, customClasses.join(' ')].join(' ') : classes.image;
	return (
		<ButtonBase
			focusRipple
			key={label}
			className={buttonClasses}
			style={{ width: '100%' }}
			onClick={onClick}
		>
			<span
				className={classes.imageSrc}
				style={{ backgroundImage: `url(${image})` }}
			/>
			<span className={classes.imageBackdrop} />
			<span className={classes.imageButton}>
				<Typography
					type="subheading"
					color="inherit"
					className={classes.imageTitle}
				>
					{ label }
					<span className={classes.imageMarked} />
				</Typography>
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
};

export default withStyles(Styles)(BoxItem);
