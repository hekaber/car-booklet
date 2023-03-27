import { useContext, useEffect, useState } from 'react';
import CarBookletProvider from '../../classes/contracts/CarBookletProvider';
import BookletList from '../../components/BookletList/BookletList';
import { getContractsByAddress } from '../../classes/contracts/Utilities';
import { Button, Paper } from "@mui/material";
import { useMetaMask } from 'metamask-react';
import { AlertContext } from '../../context/AlertContext';

const Booklets = () => {

    const { account } = useMetaMask();
    const [booklets, setBooklets] = useState<Array<string>>([]);
    const { setAlert } = useContext(AlertContext);
    const carBookletProvider = new CarBookletProvider();

    const getBooklets = async () => {
        const fetchedBooklets: Array<string> = await carBookletProvider.getBooklets(account);
        setBooklets(fetchedBooklets);
    }

    const deployBooklet = async () => {

        let contractAddress = null;
        try {
            console.log("Before call");
            contractAddress = await carBookletProvider.createBooklet(account);
        } catch (error) {
            const err = error as Error;
            const regex = /reason="([^"]+)"/;
            const match = err.message.match(regex);
            setAlert({ type: 'error', message: match ? match[1] : 'unknown' });
        }

        const txs = await getContractsByAddress(account);
        console.log("CONTRACT CREATED", contractAddress);
        console.log("TXs", txs);
    }


    useEffect(() => { getBooklets(); }, []);

    return (
        <>
            <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
                <BookletList
                    items={booklets}
                    title="My booklets"
                    emptyMessage='No booklets available'
                />
            </Paper>
            <Button variant="contained" sx={{ mr: 1 }} onClick={deployBooklet}>
                Add booklet
            </Button>
        </>
    );
}

export default Booklets;
