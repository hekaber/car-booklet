import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarBooklet from '../../classes/contracts/CarBooklet';
import MaintenanceCard from '../../components/MaintenanceCard/MaintenanceCard';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Button, Box, InputAdornment, TextField,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Booklet = () => {
    const { bookletAddress } = useParams();
    const [mapId, setMapId] = useState<Number>(0);
    const [mileage, setMileage] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    // TODO: set alert when no carBooklet or something else
    const carBooklet = bookletAddress ? new CarBooklet(bookletAddress) : null;

    const handleSubmit = async () => {
        const recordId = await carBooklet?.addMaintenanceRecord(mileage, description);
    }

    const init = async () => {
        const lastMapId: Number = carBooklet ? await carBooklet.getLastMaintenanceId() : 0;
        setMapId(lastMapId);
    }

    useEffect(() => { init() }, []);

    const maintenanceCards = () => {

        if (mapId === 0) {
            return <></>;
        }

        let cards = [];
        for (let i = 1; i <= mapId; i++) {
            cards.push(<MaintenanceCard key={i} maintenanceId={i} carBooklet={carBooklet} />);
        }
        return cards;
    }

    return (
        <>
            <Accordion sx={{ background: 'grey'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>New record</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        <TextField
                            label="Mileage"
                            id="mileage"
                            sx={{ m: 1, width: '25ch'}}
                            onChange={(newVal) => { setMileage(parseInt(newVal.target.value)) }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">km</InputAdornment>,
                            }}
                        />
                        <TextField
                            label="Description"
                            id="description"
                            onChange={(newVal) => { setDescription(newVal.target.value) }}
                            sx={{ m: 1, width: '75ch' }}
                            multiline
                            rows={4}
                            defaultValue=""
                            InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                        />
                        <Button variant="contained" sx={{ mr: 1 }} onClick={handleSubmit}>
                            Add
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <br />
            Booklet<br />
            {bookletAddress}<br />
            {maintenanceCards()}
        </>
    );
};

export default Booklet;