import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        borderRadius: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    header: {
        display: 'flex',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    infoIcon: {
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(2),
    },
    pos: {
        marginBottom: theme.spacing(0.5),
    },
    predictionFeedback: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    feedbackPrompt: {
        padding: theme.spacing(1),
    },
}));

function PredictionRow(props) {
    const classes = useStyles();
    const { label, score } = props;

    return (
        <React.Fragment>
            <Typography>{label}</Typography>
            <Typography className={classes.pos} color='textSecondary'>
                Score: {score}
            </Typography>
        </React.Fragment>
    );
}

export default function PredictionInfoDisplay(props) {
    const classes = useStyles();
    const { predictions = [], activeScore = 0 } = props;
    const [feedbackExpanded, setFeedbackExpanded] = React.useState(false);
    const [predictionCorrect, setPredictionCorrect] = React.useState(null);

    const handleExpandClick = () => {
        setFeedbackExpanded(!feedbackExpanded);
    };

    const handleFeedbackClick = (correct) => () => {
        setPredictionCorrect(correct);
        setFeedbackExpanded(false);
    };

    React.useEffect(() => {
        setPredictionCorrect(null);
        setFeedbackExpanded(false);
    }, [activeScore]);

    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.header}>
                    {predictionCorrect === null && (
                        <InfoOutlinedIcon className={classes.infoIcon} />
                    )}
                    {predictionCorrect === true && (
                        <CheckCircleOutlineIcon
                            className={classes.infoIcon}
                            color='primary'
                        />
                    )}
                    {predictionCorrect === false && (
                        <CancelOutlinedIcon
                            className={classes.infoIcon}
                            color='secondary'
                        />
                    )}
                    <Typography variant='h5' color='textSecondary' gutterBottom>
                        Prediction Info
                    </Typography>
                </div>
                {predictions.length > 0 &&
                    predictions[activeScore].scores.map((score) => (
                        <PredictionRow
                            label={score.label}
                            score={score.score}
                        />
                    ))}
            </CardContent>
            <CardActions disableSpacing>
                <Typography className={classes.feedbackPrompt}>
                    Give feedback on this prediction
                </Typography>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: feedbackExpanded,
                    })}
                    onClick={handleExpandClick}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={feedbackExpanded} timeout='auto' unmountOnExit>
                <CardActions className={classes.predictionFeedback}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleFeedbackClick(true)}
                    >
                        Correct
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleFeedbackClick(false)}
                    >
                        Incorrect
                    </Button>
                </CardActions>
            </Collapse>
        </Card>
    );
}
