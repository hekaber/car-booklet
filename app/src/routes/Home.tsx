import { useContext, useEffect, useState } from 'react';
import type { BlockTag } from '@ethersproject/abstract-provider';
import abi from "../classes/abi/CarBooklet.json";
import { UserContext } from '../App';
import AlchemyApi from '../classes/utils/AlchemyApi';

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { Circles } from 'react-loader-spinner';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { AssetTransfersCategory } from 'alchemy-sdk';


const alchemy = AlchemyApi.getAlchemyInstance();

const Home = () => {

    const userContext = useContext(UserContext);
    const [blockNumber, setBlockNumber] = useState<BlockTag>("");
    const [loading, setLoading] = useState<boolean>(true);

    async function getContractsByAddress() {
        const addr = userContext.account;
        console.log("TOTO");
        try {
            const providerAddress = import.meta.env.VITE_CONTRACT_PROVIDER_ADDRESS;
            console.log("ADDR_USER", addr);
            console.log("PROVIDER_ADDR", providerAddress);
            
            const txHashes = await alchemy.core.getAssetTransfers({
                fromBlock: "0x0",
                fromAddress: addr,
                toAddress: import.meta.env.VITE_CONTRACT_PROVIDER_ADDRESS,
                category: [
                    AssetTransfersCategory.EXTERNAL,
                    AssetTransfersCategory.INTERNAL,
                    AssetTransfersCategory.ERC20,
                    AssetTransfersCategory.ERC721
                ]
            });
            console.log("Transactions", txHashes);
        } catch (error) {
            console.log(error);
        }
        const bNum: BlockTag = await alchemy.core.getBlockNumber();
        setBlockNumber(bNum);
        setLoading(false);
    }

    const deployBooklet = async () => {

    }

    useEffect(() => {
        getContractsByAddress();
    }, []);

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
                            <Button variant="contained" sx={{ mr: 1 }} onClick={deployBooklet}>
                                Add booklet
                            </Button>
                            <Tooltip title="Reload">
                                <IconButton>
                                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                No booklets for this wallet yet
            </Typography>
        </Paper>
    );
};

export default Home;