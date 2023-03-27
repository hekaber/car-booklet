import { ethers, Contract } from "ethers";

abstract class Acontract {

    protected contract: Contract;
    protected provider: ethers.providers.Web3Provider;

    constructor(
        contractABI: any,
        contractAddress: string
    ) {

        const { ethereum } = window as any;
        this.provider = new ethers.providers.Web3Provider(ethereum);
        const signer = this.provider.getSigner();
        this.contract = new Contract(
            contractAddress,
            contractABI,
            signer
        );
    }

    public getProvider() {
        return this.provider;
    }
}

export default Acontract;