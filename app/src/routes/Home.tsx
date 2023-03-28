import { useContext } from 'react';
import { useMetaMask } from 'metamask-react';

import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { UserDataContext } from '../context/UserDataContext';
import { AppBar, Button, Container, Grid, IconButton, Paper, TextField, Toolbar, Tooltip } from '@mui/material';
import CarBookletProvider from '../classes/contracts/CarBookletProvider';
import { AlertContext } from '../context/AlertContext';
import NetworkStatus from '../components/NetworkStatus/NetworkStatus';
import { parseMMError } from '../classes/utils/errors';
import { Box } from '@mui/system';



const Home = () => {
    const { data } = useContext(UserDataContext);
    const { setAlert } = useContext(AlertContext);
    const { account, status } = useMetaMask();
    const { authorized } = data;

    const allowAccess = async () => {
        const carBookletProvider = new CarBookletProvider();
        try {
            await carBookletProvider.grantAccess(account);
        } catch (error: any) {
            const errMsg = parseMMError(error as Error);
            setAlert({ type: 'error', message: errMsg });
        }
    }

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
            <Container>
                {status !== "connected"
                    ? <Box>Please connect your wallet</Box>
                    : <>
                        {authorized && status === "connected" ?
                            <Box>Access Granted</Box>
                            :
                            <Button variant="contained" sx={{ mr: 1 }} onClick={allowAccess}>
                                Get access
                            </Button>
                        }
                    </>
                }
                <NetworkStatus />
            </Container>
        </Paper>
    );
};

export default Home;