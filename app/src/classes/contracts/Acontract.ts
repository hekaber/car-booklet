import { ethers, Contract } from "ethers";

abstract class Acontract {

    protected contract: Contract;

    constructor(
        contractABI: any,
        contractAddress: string
    ) {

        const { ethereum } = window as any;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        this.contract = new Contract(
            contractAddress,
            contractABI,
            signer
        );
    }
}

export default Acontract;