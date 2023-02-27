import abi from '../abi/CarBookletProvider.json';
import { ethers, Contract } from "ethers";

class CarBookletProvider {
    private contractABI = abi.abi;
    private contract: Contract;

    constructor() {

        const { ethereum } = window as any;

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        this.contract = new Contract(
            import.meta.env.VITE_CONTRACT_PROVIDER_ADDRESS,
            this.contractABI,
            signer
        );
    }

    public async getVersion(): Promise<string> {
        const version = await this.contract.getVersion();
        return version;
    }
}

export default CarBookletProvider;