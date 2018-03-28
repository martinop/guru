import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Schedule from '../components/schedule';

const ScheduleModal = ({ open, data, close }) => (
    <Dialog
	open={open}
	onClose={close}
	onBackdropClick={close}
	onEscapeKeyDown={close}
	aria-labelledby="mi-horario"
	maxWidth={false}
    >
        <DialogTitle>Horario de clases</DialogTitle>
        <div style={{ padding: 30 }}>
            <Schedule days={data} />
        </div>
    </Dialog>
);

ScheduleModal.propTypes = {
	open: PropTypes.bool,
	data: PropTypes.any,
	close: PropTypes.func,
};

export default ScheduleModal;
