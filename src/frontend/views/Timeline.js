import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import FilterBar from '../components/FilterBar';
import EventList from './EventList';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            flexGrow: 1,
        },
    },
}));

export default function Timeline(props) {
    const classes = useStyles();
    const [filterData, setFilterData] = React.useState({ label: '', score: 0 });

    return (
        <React.Fragment>
            <FilterBar filterData={filterData} setFilterData={setFilterData} />
            <div className={classes.root}>
                <Paper>
                    <EventList filterData={filterData} />
                </Paper>
            </div>
        </React.Fragment>
    );
}
