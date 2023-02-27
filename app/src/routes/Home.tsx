import { useContext, useEffect, useState } from 'react';
import type { BlockTag } from '@ethersproject/abstract-provider';
import { UserContext } from '../App';
import { getContractsByAddress } from '../classes/contracts/Utilities';

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { Circles } from 'react-loader-spinner';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CarBookletProvider from '../classes/contracts/CarBookletProvider';


const Home = () => {

    const userContext = useContext(UserContext);
    const [blockNumber, setBlockNumber] = useState<BlockTag>("");
    const [loading, setLoading] = useState<boolean>(true);

    const carBookletProvider = new CarBookletProvider();
    const deployBooklet = async () => {
        const owner = await carBookletProvider.getVersion();
        console.log(owner);
    }

    useEffect(() => {
        getContractsByAddress(userContext.account);

    }, []);

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
                            <Button variant="contained" sx={{ mr: 1 }} onClick={deployBooklet}>
                                Add booklet
                            </Button>
                            <Tooltip title="Reload">
                                <IconButton>
                                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                No booklets for this wallet yet
            </Typography>
        </Paper>
    );
};

export default Home;