import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from '@react-spring/web';

import BoundingBoxDisplay from '../components/EventDetailsModal/BoundingBoxDisplay';
import PredictionInfoDisplay from '../components/EventDetailsModal/PredictionInfoDisplay';
import PredictionSelector from '../components/EventDetailsModal/PredictionSelector';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
    },
    paper: {
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

export default function EventDetailsModal(props) {
    const classes = useStyles();
    const { openModalEvent, setOpenModalEvent } = props;
    const [open, setOpen] = React.useState(false);
    const [activeScore, setActiveScore] = React.useState(0);
    const [selectedPrediction, setSelectedPrediction] = React.useState({});

    const handleClose = () => {
        setOpen(false);
        setOpenModalEvent({});
        setActiveScore(0);
    };

    React.useEffect(() => {
        if (Object.keys(openModalEvent).length > 0) {
            setOpen(true);
            setSelectedPrediction(openModalEvent.predictions[activeScore]);
        }
    }, [openModalEvent, activeScore]);

    return (
        <div>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <BoundingBoxDisplay
                            imageSource={openModalEvent.imageSource}
                            boundingBox={selectedPrediction.boundingBox}
                        />
                        <PredictionInfoDisplay
                            predictions={openModalEvent.predictions}
                            activeScore={activeScore}
                        />
                        {openModalEvent?.predictions?.length > 1 && (
                            <PredictionSelector
                                activeScore={activeScore}
                                setActiveScore={setActiveScore}
                                numScores={openModalEvent?.predictions?.length}
                            />
                        )}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
