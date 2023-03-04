import abi from '../abi/CarBookletProvider.json';
import { Event } from "ethers";
import Acontract from './Acontract';

class CarBookletProvider extends Acontract{

    constructor() {
        super(
            abi.abi,
            import.meta.env.VITE_CONTRACT_PROVIDER_ADDRESS
        );
    }

    public async getVersion(): Promise<string> {
        const version: string = await this.contract.getVersion();
        return version;
    }

    public async getBooklets(bookletOwner: string): Promise<Array<string>> {
        const tx: Array<string> = await this.contract.getBooklets(bookletOwner);
        return tx;
    }

    public async createBooklet(bookletOwner: string): Promise<string | undefined> {

        await this.contract.provide(bookletOwner);
        const events: Array<Event> = await this.contract.queryFilter("BookletCreated");
        return events.length > 0 && Array.isArray(events[0].args) && events[0].args[0] ? events[0].args[0] : "";
    }
}

export default CarBookletProvider;