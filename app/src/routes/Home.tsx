import { useContext, useEffect, useState } from 'react';
import type { BlockTag } from '@ethersproject/abstract-provider';

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CarBookletProvider from '../classes/contracts/CarBookletProvider';


const Home = () => {

    const [blockNumber, setBlockNumber] = useState<BlockTag>("");
    const [loading, setLoading] = useState<boolean>(true);

    const carBookletProvider = new CarBookletProvider();

    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon color="inherit" sx={{ display: 'block' }} />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Search by email address, phone number, or user UID"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { fontSize: 'default' },
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            <Tooltip title="Reload">
                                <IconButton>
                                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Paper>
    );
};

export default Home;