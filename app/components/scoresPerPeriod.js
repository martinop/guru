import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
import Styles from './Styles/scoresPerPeriod';

const ScoresPerPeriod = ({ classes, scores }) => {
	const handleClass = (score) => {
		let classe;
		if (score >= 17)
			classe = classes.super;
		else if (score >= 10)
			classe = classes.green;
		else if (score < 10)
			classe = classes.red;
		return classe;
	};

	return (
        <div className={classes.root}>
            {scores && scores.map((score, index) => (
                <ExpansionPanel key={index}>
                    <ExpansionPanelSummary classes={{ content: classes.summary }} expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="display1">{score.period}</Typography>
                        <block>
                            <div className={[classes.circle, handleClass(score.prom)].join(' ')}>
                                <Typography variant="title" className={classes.circleText}>{parseInt(score.prom)}</Typography>
                            </div>
                        </block>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
	);
};


ScoresPerPeriod.propTypes = {
	classes: PropTypes.object.isRequired,
	scores: PropTypes.any,
};

export default withStyles(Styles)(ScoresPerPeriod);
