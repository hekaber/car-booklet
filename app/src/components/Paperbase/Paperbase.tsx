import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from '../Navigator/Navigator';
import Header from '../Header/Header';
import theme from './Theme';
import { useLocation } from 'react-router-dom';
import { HOME_ROUTE, routeMap } from '../../classes/utils/constants';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://carbooklet.io/">
                carbooklet.io
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

interface IProps {
    children?: React.ReactNode;
}

const drawerWidth = 256;

export default function Paperbase(props: IProps) {

    const [mobileOpen, setMobileOpen] = useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const location = useLocation();
    const homeRoute = routeMap.get(HOME_ROUTE);
    const currRouteName: string | undefined = routeMap.get(location.pathname);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    {isSmUp ? null : (
                        <Navigator
                            currRouteName={ currRouteName ?? homeRoute}
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        />
                    )}
                    <Navigator
                        currRouteName={currRouteName ?? homeRoute}
                        PaperProps={{ style: { width: drawerWidth } }}
                        sx={{ display: { sm: 'block', xs: 'none' } }}
                    />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header
                        onDrawerToggle={handleDrawerToggle}
                        currRouteName={currRouteName ?? homeRoute}
                    />
                    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                        {props.children}
                    </Box>
                    <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
                        <Copyright />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}