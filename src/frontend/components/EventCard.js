import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined'
import { MONTHS as months, toTitleCase } from '../../utils/Constants'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardText: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    '& > *': {
      marginRight: theme.spacing(2)
    }
  },
  dateText: {
    fontSize: '0.9rem'
  },
}))

function _getDateString(date) {
  const yyyy = date.getFullYear()
  const month = months[date.getMonth()]
  const dd = date.getDate()
  const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  const mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  const ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()


  return `${hh}:${mm}:${ss} on ${month} ${dd}, ${yyyy}`

}

export default function EventCard(props) {
  const classes = useStyles()
  const { event, setModalOpenEvent } = props
  const { videoStream, timestamp, imageSource, predictions } = event
  const time = new Date(parseInt(timestamp)*1000)
  const count = predictions.length

  const handleDetailsClick = () => {
    setModalOpenEvent(event)
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={imageSource}
        title={videoStream}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {toTitleCase(videoStream)}
        </Typography>
        <div>
          <div className={classes.cardText}>
            <NewReleasesOutlinedIcon color='primary'/>
            <Typography>
              {count} predictions
            </Typography>
          </div>
          <div className={classes.cardText}>
            <AccessTimeIcon  color='primary'/>
            <Typography className={classes.dateText}>
              {_getDateString(time)}
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleDetailsClick}>
          Details
        </Button>
      </CardActions>
    </Card>
  )
}