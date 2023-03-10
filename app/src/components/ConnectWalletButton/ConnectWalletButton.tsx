import Button from '@mui/material/Button';
import { useMetaMask } from "metamask-react";

// TODO pass this as a prop
const lightColor: string = 'rgba(255, 255, 255, 0.7)';

const ConnectWalletButton = () => {

    const { status, connect } = useMetaMask();

    const redirectToMetaMask = () => {
        window.location.replace('https://metamask.io');
    };

    const disconnect = () => {

    }

    const button = () => {
        switch (status) {
            case "initializing":
                return { action: undefined, text: "Connecting..." };
            case "unavailable":
                return { action: redirectToMetaMask, text: "Get Metamask" };
            case "notConnected":
                return { action: connect, text: "Connect wallet" };
            case "connecting":
                return { action: undefined, text: "Connecting..." };
            case "connected":
                return { action: disconnect, text: "Disconnect" };
            default:
                return { action: connect, text: "Connect wallet" };
        }
    };
    return (
        <>
            <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
                onClick={button().action}
            >
                {button().text}
            </Button>
        </>
    );
};

export default ConnectWalletButton;