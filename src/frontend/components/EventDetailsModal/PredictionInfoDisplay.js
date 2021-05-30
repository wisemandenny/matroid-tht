import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardContent, Typography } from '@material-ui/core'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),

  },
  header: {
    display: 'flex'
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
    marginBottom: 12,
  },
}))

function PredictionRow(props) {
  const classes = useStyles()
  const { label, score } = props

  return (
    <React.Fragment>
      <Typography >
        {label}
      </Typography>
      <Typography className={classes.pos} color='textSecondary'>
        Score: {score}
      </Typography>
    </React.Fragment>
  )
}

export default function PredictionInfoDisplay(props) {
  const classes = useStyles()
  const { predictions = [], activeScore = 0 } = props
  console.log(predictions)
  console.log(activeScore)
  console.log(predictions[activeScore])

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.header}>
          <InfoOutlinedIcon className={classes.infoIcon} color='primary'/>
          <Typography variant='h5' color='textSecondary' gutterBottom>
            Prediction Info
          </Typography>
        </div>
        {predictions.length > 0 && predictions[activeScore].scores.map((score) => <PredictionRow label={score.label} score={score.score} />)}
      </CardContent>
    </Card>
  )


}