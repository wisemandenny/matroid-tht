import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import EventCard from '../components/EventCard'
import EventDetailsModal from '../views/EventDetailsModal'
import { getData } from '../../utils/ServerMethods'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}))

function filterEvents(events, filterData) {
  const filteredEvents = events.filter((event) => {
    let shouldInclude = false
    event.predictions.forEach((prediction) => {
      prediction.scores.forEach((score) => {
        if (!shouldInclude && score.label.toLowerCase().includes(filterData.label) && score.score > filterData.score) {
          shouldInclude = true
        }
      })
    })
    return shouldInclude
  })
  return filteredEvents
}

export default function EventList(props) {
  const classes = useStyles()
  const { filterData } = props
  const [events, setEvents] = React.useState([])
  const [openModalEvent, setOpenModalEvent] = React.useState({})

  React.useEffect(() => {
    async function fetchData() {
      const newEvents = await getData()
      setEvents(newEvents)
    }
    fetchData()
  }, [])

  if (events.length === 0) {
    return (
      <CircularProgress />
    )
  } 
  else {
    return (
      <Container className={classes.cardGrid}>
        <Grid 
          container 
          spacing={4}
        >
          {filterEvents(events, filterData).map((event) => (
            <Grid item key={event.videoStream.concat(event.timestamp)} xs={12} sm={6} md={4}>
              <EventCard event={event} setModalOpenEvent={setOpenModalEvent}/>
            </Grid>
          ))}
        </Grid>
        <EventDetailsModal openModalEvent={openModalEvent} setOpenModalEvent={setOpenModalEvent} />
      </Container>
    )
  }
}