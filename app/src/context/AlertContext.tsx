import { Alert, AlertColor, AlertTitle, Button } from "@mui/material";
import { createContext, useState } from "react";
import './Context.scss';

interface IAlert {
    type: AlertColor | undefined,
    message: string
}

interface IAlertProps extends IAlert {
    setAlert: React.Dispatch<React.SetStateAction<IAlert>>;
}

export const AlertContext = createContext<IAlertProps>({
    type: undefined,
    message: '',
    setAlert: () => { }
});

const defaultAlert = { type: undefined, message: '' };

export const AlertProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
    const [alert, setAlert] = useState<IAlert>(defaultAlert);
    const contextValue: IAlertProps = {
        ...alert,
        setAlert: setAlert
    };

    const reset = () => {
        setAlert(defaultAlert)
    }

    const getAlertTitle = () => {
        return alert.type ? alert.type.charAt(0).toUpperCase() + alert.type.slice(1) : '';
    }

    return (
        <AlertContext.Provider value={contextValue}>
            <div className="alert" style={{ display: !alert.type ? 'none' : 'block' }}>
                <Alert severity={alert.type}>
                    <AlertTitle>{getAlertTitle()}</AlertTitle>
                    <div><strong>{alert.message}</strong></div>
                    <Button
                        variant="contained"
                        sx={{ mr: 1 }}
                        color="info"
                        onClick={reset}>
                        Ok
                    </Button>
                </Alert>
            </div>
                {props.children}
        </AlertContext.Provider>
    );
};