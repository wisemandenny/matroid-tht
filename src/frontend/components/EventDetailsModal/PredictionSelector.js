import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) =>({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    boxShadow: theme.shadows[1],
    borderRadius: theme.spacing(1)
  },
}));

export default function PredictionSelector(props) {
  const classes = useStyles()
  const { activeScore = 0, setActiveScore, numScores = 1 } = props

 const handleNext = () => {
    setActiveScore((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveScore((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      className={classes.root}
      variant="dots"
      steps={numScores}
      position='static'
      activeStep={activeScore}
      nextButton={
        <Button size='small' onClick={handleNext} disabled={activeScore === numScores - 1}>
          Next
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button size='small' onClick={handleBack} disabled={activeScore === 0}>
          Back
          <KeyboardArrowLeft />
        </Button>
      }
    />
  )
}