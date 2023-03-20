import { useContext } from 'react';
import { useMetaMask } from 'metamask-react';

import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { UserDataContext } from '../context/UserDataContext';
import { AppBar, Button, Grid, IconButton, Paper, TextField, Toolbar, Tooltip } from '@mui/material';
import CarBookletProvider from '../classes/contracts/CarBookletProvider';
import { AlertContext } from '../context/AlertContext';



const Home = () => {
    const { data } = useContext(UserDataContext);
    const { setAlert } = useContext(AlertContext);
    const { account } = useMetaMask();
    const { authorized } = data;

    const allowAccess = async () => {
        const carBookletProvider = new CarBookletProvider();
        try {
            await carBookletProvider.grantAccess(account);
        } catch (error: any) {
            const regex = /reason="([^"]+)"/;
            const match = error.message.match(regex);
            console.log(match);
            setAlert({ type: 'error', message: match[1] });
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
            {authorized ?
                <>Access Granted</>
                :
                <Button variant="contained" sx={{ mr: 1 }} onClick={allowAccess}>
                    Get access
                </Button>
            }
        </Paper>
    );
};

export default Home;