import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Styles from './Styles/modal';
import formatMoney from '../utils/formatMoney';

const FinanceModal = ({ classes, open, close, data: { finance, fees } }) => {
	console.log(finance, fees);
	const SICuotas = 3 - fees.length;
	const cuotas = [...Array.from(Array(SICuotas)), ...fees];
	const totalDebt = fees.reduce((prev, current) => prev + current.amount, 0);
	const showCuota = (data) => {
		const classNames = [classes.bold];
		const variant = data ? 'display2' : 'display1';
		if (data) classNames.push(classes.red);
		return (
			<Typography className={classNames.join(' ')} variant={variant} gutterBottom>
				{ data ? data.date : 'Sin Informacion' }
			</Typography>
		);
	};

	if (!finance)
		return null;
	return (
		<Dialog
			open={open}
			onClose={close}
			onBackdropClick={close}
			onEscapeKeyDown={close}
			aria-labelledby="mis-finanzas"
			maxWidth="md"
			className={classes.container}
			fullWidth
		>
			<DialogTitle disableTypography>
				<Typography className={classes.title} variant="display2" gutterBottom>
					Estado de cuenta
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Grid
					container
					spacing={24}
				>
					<Grid item xs={12} sm={6} >
						<div>
							<Typography className={classes.subTitle} variant="headline">
								Información Administrativa
							</Typography>
							<Divider className={classes.divider} />
							<Typography variant="title" className={classes.bold}>
								Costo de la hora credito:
							</Typography>
							<Typography className={[classes.bold, classes.blue].join(' ')} variant="display2" gutterBottom>
								{ formatMoney(finance.hc_cost) }
							</Typography>
							<Typography className={classes.bold} variant="title" gutterBottom>
								Vencimiento de cuotas
							</Typography>
							<Typography variant="title">
								Primera cuota:
							</Typography>
							{ showCuota(cuotas[0]) }
							<Typography variant="title">
								Segunda cuota:
							</Typography>
							{ showCuota(cuotas[1]) }
							<Typography variant="title">
								Tercera cuota:
							</Typography>
							{ showCuota(cuotas[2]) }
						</div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<div>
							<Typography className={classes.subTitle} variant="headline">
								Información Personal
							</Typography>
							<Divider className={classes.divider} />
							<Typography variant="title" className={classes.bold}>
								Disponible:
							</Typography>
							<Typography className={[classes.bold, classes.green].join(' ')} variant="display2" gutterBottom>
								{ formatMoney(finance.debt) }
							</Typography>
							<Typography variant="title" className={classes.bold}>
								Deuda total:
							</Typography>
							<Typography className={[classes.bold, classes.red].join(' ')} variant="display2" gutterBottom>
								{ formatMoney(totalDebt) }
							</Typography>
							<Typography variant="title" className={classes.bold}>
								Monto del trimestre:
							</Typography>
							<Typography className={classes.bold} variant="display2" gutterBottom>
								{ formatMoney(finance.payments) }
							</Typography>
							<Typography variant="title" className={classes.bold}>
								Monto historico gastado:
							</Typography>
							<Typography className={classes.bold} variant="display2" gutterBottom>
								{ formatMoney(finance.charges) }
							</Typography>
						</div>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};

FinanceModal.propTypes = {
	open: PropTypes.bool,
	data: PropTypes.any,
	close: PropTypes.func,
	classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(FinanceModal);
