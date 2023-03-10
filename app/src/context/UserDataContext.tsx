import React, { useState, createContext, useEffect } from "react";
import CarBookletProvider from "../classes/contracts/CarBookletProvider";
import { useMetaMask } from 'metamask-react';

interface IData {
    authorized: boolean;
}

interface IUserState {
    data: IData | null;
    isLoading: boolean;
}

interface IUserStateProps extends IUserState {
    setUserData: React.Dispatch<React.SetStateAction<IUserState>>;
}

interface LayoutProps {
    children: React.ReactNode
}

export const UserDataContext = createContext<IUserStateProps>({
    data: null,
    isLoading: true,
    setUserData: () => {}
});

export const UserDataProvider: React.FC<LayoutProps> = ({ children }) => {

    const [userState, setUserState] = useState<IUserState>({
        data: null,
        isLoading: true
    });
    const { account } = useMetaMask();

    const getAuthorization = async () => {
        const carBookletProvider = new CarBookletProvider();
        const authorized = await carBookletProvider.isAuthorized(account);
        const data = {
            authorized: authorized
        }
        setUserState({ data: data, isLoading: false });
    }

    useEffect(() => {
        getAuthorization();
    }, [account]);

    return (
        <UserDataContext.Provider value={{...userState, setUserData: setUserState}}>
            { children }
        </UserDataContext.Provider>
    );
};
