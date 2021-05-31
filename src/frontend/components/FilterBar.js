import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    InputBase,
    Chip,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { HeaderText } from '../../utils/Constants';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    chipHolder: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'none',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        backgroundColor: theme.palette.primary,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function FilterBar(props) {
    const classes = useStyles();
    const { filterData, setFilterData } = props;
    const [searchText, setSearchText] = React.useState('');
    React.useEffect(() => {
        setSearchText('');
    }, [filterData]);

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleFilter = (e) => {
        if (e.key === 'Enter') {
            const newFilterData = {
                label: filterData.label,
                score: filterData.score,
            };
            if (!isNaN(e.target.value)) {
                newFilterData.score = +e.target.value;
            } else {
                newFilterData.label = e.target.value.toLowerCase();
            }
            setFilterData(newFilterData);
        }
    };

    const handleDelete = (filterToDelete) => () => {
        const newFilterData = {
            label: filterData.label,
            score: filterData.score,
        };
        if (!isNaN(filterToDelete)) {
            newFilterData.score = 0;
        } else {
            newFilterData.label = '';
        }
        setFilterData(newFilterData);
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position='static'>
                <Toolbar>
                    <Typography className={classes.title} variant='h6' noWrap>
                        {HeaderText}
                    </Typography>
                    <ul className={classes.chipHolder}>
                        {filterData.label.length > 0 && (
                            <li>
                                <Chip
                                    className={classes.chip}
                                    size='small'
                                    label={`label: ${filterData.label}`}
                                    onDelete={handleDelete(filterData.label)}
                                />
                            </li>
                        )}
                        {filterData.score > 0 && (
                            <li>
                                <Chip
                                    className={classes.chip}
                                    size='small'
                                    label={`score > ${filterData.score}`}
                                    onDelete={handleDelete(filterData.score)}
                                />
                            </li>
                        )}
                    </ul>
                    <div className={classes.search}>
                        <IconButton
                            className={classes.searchIcon}
                            onClick={handleFilter}
                        >
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            placeholder='Filter...'
                            value={searchText}
                            onChange={handleSearchTextChange}
                            onKeyDown={handleFilter}
                            fullWidth
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
