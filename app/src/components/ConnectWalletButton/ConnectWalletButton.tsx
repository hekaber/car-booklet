import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import Web3Provider from '../../utils/Web3Provider';

// TODO pass this as a prop
const lightColor: string = 'rgba(255, 255, 255, 0.7)';
let alertMessage: string = "";

// declare window as any otherwise linter complains
const { ethereum } = (window as any);

const ConnectWalletButton = () => {

    const [alert, setAlert] = useState(false);
    const userContext = useContext(UserContext);

    const handleWalletConnection = async () => {

        if (!userContext.account) {
            try {
                const web3 = await Web3Provider.getWeb3Instance();
                if (web3) {
                    const accounts = await web3.eth.getAccounts();
                    userContext.setWeb3(web3);
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
                {!userContext.account ? "Connect wallet" : "Disconnect wallet"}
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