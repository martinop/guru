import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

const FinanceModal = ({ open, close, data }) => (
    <Dialog
	open={open}
	onClose={close}
	onBackdropClick={close}
	onEscapeKeyDown={close}
	aria-labelledby="mi-horario"
	maxWidth={false}
    >
        <DialogTitle>Estado de cuenta</DialogTitle>
        <div style={{ padding: 30 }}>
			{JSON.stringify(data)}
        </div>
    </Dialog>
);

FinanceModal.propTypes = {
	open: PropTypes.bool,
	data: PropTypes.any,
	close: PropTypes.func,
};

export default FinanceModal;
