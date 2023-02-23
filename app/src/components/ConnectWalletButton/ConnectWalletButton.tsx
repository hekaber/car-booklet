import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import Web3 from 'web3';
import { UserContext } from '../../App';

// TODO pass this as a prop
const lightColor = 'rgba(255, 255, 255, 0.7)';
const { ethereum } = window;

const ConnectWalletButton = () => {

    const [alert, setAlert] = useState(false);
    const userContext = useContext(UserContext);

    const handleWalletConnection = async () => {
        if (!ethereum) {
            setAlert(true);
        }
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const web3Instance = new Web3(ethereum);
            userContext.setWeb3(web3Instance);
            if (web3Instance) {
                const accounts = await web3Instance.eth.getAccounts();
                console.log("ACCOUNT", accounts[0])
                userContext.setAccount(accounts[0]);
            }
        } catch (error) {
            console.error(error);
        }
        console.error("User context", userContext);
    }

    return (
        <>
            <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
                onClick={handleWalletConnection}
            >
                Connect wallet
            </Button>
            {alert ? <Alert severity='error'>Metamask is not installed!</Alert> : <></> }
        </>
    );
};

export default ConnectWalletButton;