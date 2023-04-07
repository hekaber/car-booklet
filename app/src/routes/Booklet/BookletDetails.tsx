import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarBooklet from '../../classes/contracts/CarBooklet';
import MaintenanceCard from '../../components/MaintenanceCard/MaintenanceCard';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Button, Box, InputAdornment, TextField,
    Typography
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AlertContext } from '../../context/AlertContext';
import { parseMMError } from '../../classes/utils/errors';
import { useMetaMask } from 'metamask-react';


const BookletDetails = () => {

    const { bookletAddress } = useParams();
    const { status } = useMetaMask();
    const [mapId, setMapId] = useState<Number>(0);
    const [mileage, setMileage] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [waitingForCreate, setWaitingForCreate] = useState<boolean>(false);
    const { setAlert } = useContext(AlertContext);
    const carBooklet = bookletAddress ? new CarBooklet(bookletAddress) : null;

    const creationCB = () => {
        setWaitingForCreate(false);
        init();
    }

    const handleSubmit = async () => {

        try {
            await carBooklet?.addMaintenanceRecord(mileage, description);
            carBooklet?.waitFor("RecordCreated", creationCB);
            setWaitingForCreate(true);
            setAlert({
                type: 'success', message: `Creating record, this might take a few seconds.`
            });
        } catch (error: any) {
            setAlert({
                type: 'error', message: parseMMError(error as Error)
            });
        }

    }

    const init = async () => {
        if (!carBooklet) {
            setAlert({
                type: 'error', message: 'No Car booklet available!'
            })
        }
        const lastMapId: Number = carBooklet ? await carBooklet.getLastMaintenanceId() : 0;
        setMapId(lastMapId);
    }

    useEffect(() => { init() }, [mapId]);

    const maintenanceCards = () => {

        if (mapId === 0) {
            return <></>;
        }

        let cards = waitingForCreate
            ? [
                <MaintenanceCard
                    key={mapId.valueOf() + 1}
                    maintenanceId={mapId.valueOf() + 1}
                    withData={false}
                />
            ]
            : [];
        for (let i = mapId.valueOf(); i >= 1; i--) {
            cards.push(<MaintenanceCard key={i} maintenanceId={i} carBooklet={carBooklet} />);
        }
        return cards;
    }

    return (
        <>
            {
                status === "connected"
                    ?
                    <>
                        <Box>
                            <br />
                            Booklet<br />
                            {bookletAddress}<br />
                        </Box>
                        <Accordion sx={{ background: 'grey' }}>
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
                                        sx={{ m: 1, width: '25ch' }}
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
                        {maintenanceCards()}
                        </>
                    : <Box>
                        No access to the booklet
                    </Box>
            }
        </>
    );
};

export default BookletDetails;