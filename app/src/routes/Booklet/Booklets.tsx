import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import CarBookletProvider from '../../classes/contracts/CarBookletProvider';
import BookletList from '../../components/BookletList/BookletList';
import { getContractsByAddress } from '../../classes/contracts/Utilities';
import { Button, Paper } from "@mui/material";

const Booklets = () => {
    const [booklets, setBooklets] = useState<Array<string>>([]);
    const userContext = useContext(UserContext);
    const carBookletProvider = new CarBookletProvider();

    const getBooklets = async () => {
        const fetchedBooklets: Array<string> = await carBookletProvider.getBooklets(userContext.account);
        setBooklets(fetchedBooklets);
    }

    const deployBooklet = async () => {
        const contractAddress = await carBookletProvider.createBooklet(userContext.account);
        const txs = await getContractsByAddress(userContext.account);
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