import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { HOME_ROUTE, CONTACT_ROUTE, BOOKLET_LIST_ROUTE, routeMap } from '../../classes/utils/constants';

const categories = [
    {
        id: 'Menu',
        children: [
            {
                id: 'Home',
                icon: <PeopleIcon />,
                link: HOME_ROUTE
            },
            { id: 'Booklets', icon: <DnsRoundedIcon />, link: BOOKLET_LIST_ROUTE },
            { id: 'Contact', icon: <PermMediaOutlinedIcon />, link: CONTACT_ROUTE },
        ],
    }
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

interface NavigatorProps extends DrawerProps {
    listItemClick: (routeName?: string) => void;
}

export default function Navigator(props: NavigatorProps) {

    const { listItemClick, ...other } = props;
    const location = useLocation();
    const homeRoute = routeMap.get(HOME_ROUTE);
    const currRoute: string | undefined = routeMap.get(location.pathname);
    const [currItemId, setCurrItemId] = useState(currRoute ?? homeRoute);

    const handleListItemClick = (link: string | undefined, itemId: string) => {
        listItemClick(link);
        setCurrItemId(itemId);
    }

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    Car Booklet
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Project Overview</ListItemText>
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#101F33' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, link }) => (
                            <Link key={childId} to={link ?? '#'} onClick={() => handleListItemClick(link, childId)}>
                                <ListItem disablePadding>
                                    <ListItemButton selected={childId === currItemId} sx={item}>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText>
                                            {childId}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}