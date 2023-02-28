import Typography from '@mui/material/Typography';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import { Folder } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import { Link } from 'react-router-dom';

interface BookletListProps {
    items: any[];
    title: string;
    emptyMessage: string;
}

export default function BookletList(props: BookletListProps) {
    const { items, title, emptyMessage } = props;

    return (
        <>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
               {title}
            </Typography>
            <List>
                { items.length === 0
                    ? <Typography sx = {{ my: 5, mx: 2 }} color="text.secondary" align="center">
                            {emptyMessage}
                    </Typography>
                    : items.map((item, index) => {
                        return (
                            <ListItem key={index} >
                                <ListItemIcon>
                                    <Folder />
                                </ListItemIcon>
                                <Link to="">
                                    <ListItemText
                                        primary={item}
                                        secondary="booklet"
                                    />
                                </Link>
                            </ListItem>
                        );
                    })
                }
            </List>
        </>
    );
}