import { Utils } from "alchemy-sdk";
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import { useEffect, useState } from "react";
import CarBooklet from "../../classes/contracts/CarBooklet";
import CarBookletProvider from "../../classes/contracts/CarBookletProvider";
import AlchemyApi from "../../classes/utils/AlchemyApi";

const NetworkStatus = () => {

    const [statusData, setStatusData] = useState(null);
    const { account } = useMetaMask();


    const alchemy = AlchemyApi.getAlchemyInstance();

    const initData = async () => {
        const carBooklet = new CarBooklet(account ?? '');
        console.log("account", account);

        let result = null;
        try {
            result = await carBooklet.getProvider().getGasPrice();

            console.log(result.toNumber());
            console.log(ethers.utils.formatEther(result.toNumber()));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        initData();
    }, []);

    return (
        <>
            STATUS
        </>
    );
}

export default NetworkStatus;