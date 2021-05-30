import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import FilterBar from '../components/FilterBar'
import EventList from './EventList'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      flexGrow: 1
    },
  },
}));

export default function Timeline(props) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <FilterBar />
      <div className={classes.root}>
        <Paper>
          <EventList />
        </Paper>
      </div>
    </React.Fragment>
  )
}