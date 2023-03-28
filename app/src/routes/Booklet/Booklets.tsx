import { useContext, useEffect, useState } from 'react';
import CarBookletProvider from '../../classes/contracts/CarBookletProvider';
import BookletList from '../../components/BookletList/BookletList';
import { Button, CircularProgress, Container, Paper } from "@mui/material";
import { useMetaMask } from 'metamask-react';
import { AlertContext } from '../../context/AlertContext';
import { parseMMError } from '../../classes/utils/errors';

const Booklets = () => {

    const { account, status } = useMetaMask();
    const [booklets, setBooklets] = useState<Array<string>>([]);
    const [creating, setCreating] = useState<boolean>(false);
    const { setAlert } = useContext(AlertContext);
    const carBookletProvider = new CarBookletProvider();

    const getBooklets = async () => {
        if (account) {
            const fetchedBooklets: Array<string> = await carBookletProvider.getBooklets(account);
            setBooklets(fetchedBooklets);
        }
    }

    const creationCB = (address: string) => {
        console.log('callback', address);
        getBooklets();
        setCreating(false);
    }

    const deployBooklet = async () => {

        let contractAddress = null;
        try {
            contractAddress = await carBookletProvider.createBooklet(account);
            carBookletProvider.waitFor("BookletCreated", creationCB);
            setCreating(true);
        } catch (error: any) {
            const errMsg = parseMMError(error as Error);
            setAlert({ type: 'error', message: errMsg });
        }
    }


    useEffect(() => { getBooklets(); }, []);

    return (
        <>
            <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
                <Container>
                    { status !== "connected"
                        ? <>Connect your wallet</>
                        : <>
                            {creating ? <CircularProgress /> : <></>}
                            <BookletList
                                items={booklets}
                                title="My booklets"
                                emptyMessage='No booklets available'
                            />
                            <Button variant="contained" sx={{ width: '100%', mr: 1 }} onClick={deployBooklet}>
                                Add booklet
                            </Button>
                        </>
                    }

                </Container>
            </Paper>
        </>
    );
}

export default Booklets;
