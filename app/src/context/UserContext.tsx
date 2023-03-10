import React, { useState, createContext, useEffect } from "react";

interface IData {
    authorized: boolean;
}

interface IUserState {
    data: IData | null;
    isLoading: boolean;
}

interface IUserStateProps extends IUserState {
    setUserState: React.Dispatch<React.SetStateAction<IUserState>>;
}

interface LayoutProps {
    children: React.ReactNode
}

export const UserContext = createContext<IUserStateProps>({
    data: null,
    isLoading: true,
    setUserState: () => {}
});

export const UserDataProvider: React.FC<LayoutProps> = ({ children }) => {

    const [userState, setUserState] = useState<IUserState>({
        data: null,
        isLoading: true
    });

    useEffect(() => {

    }, []);

    return (
        <UserContext.Provider value={{...userState, setUserState}}>
            { children }
        </UserContext.Provider>
    );
};