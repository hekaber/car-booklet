import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import Web3 from 'web3';
import { UserContext } from '../../App';

// TODO pass this as a prop
const lightColor: string = 'rgba(255, 255, 255, 0.7)';
let alertMessage: string = "";

// declare window as any otherwise linter complains
const { ethereum } = (window as any);

const ConnectWalletButton = () => {

    const [alert, setAlert] = useState(false);
    const userContext = useContext(UserContext);

    const handleWalletConnection = async () => {
        if (!ethereum) {
            alertMessage = "Metamask is not installed.";
            setAlert(true);
        }
        if (userContext.account === undefined) {
            try {
                await ethereum.request({ method: 'eth_requestAccounts' });
                const web3Instance = new Web3(ethereum);
                userContext.setWeb3(web3Instance);
                if (web3Instance) {
                    const accounts = await web3Instance.eth.getAccounts();
                    userContext.setAccount(accounts[0]);
                }
            } catch (error: any) {
                alertMessage = error.message;
                setAlert(true);
            }
        }
        else {
            userContext.setWeb3(null);
            userContext.setAccount("");
        }
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
                {userContext.account === undefined ? "Connect wallet" : "Disconnect wallet"}
            </Button>
            {alert ?
                <Alert
                    sx={{ cursor: 'pointer' }}
                    severity='error'
                    onClick={() => setAlert(false)}>
                    {alertMessage}
                </Alert>
                : <></>}
        </>
    );
};

export default ConnectWalletButton;