import abi from '../abi/CarBookletProvider.json';
import { ethers, Contract, Event } from "ethers";

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
        const version: string = await this.contract.getVersion();
        return version;
    }

    public async createBooklet(owner: string): Promise<string | undefined> {
        console.log(owner);
        await this.contract.provide(owner);
        const events: Array<Event> = await this.contract.queryFilter("BookletCreated");
        return events.length > 0 && Array.isArray(events[0].args) && events[0].args[0] ? events[0].args[0] : "";
    }
}

export default CarBookletProvider;