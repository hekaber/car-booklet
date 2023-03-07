import abi from '../abi/CarBookletProvider.json';
import { Event } from "ethers";
import Acontract from './Acontract';
import { Contract } from 'ethers';

class CarBookletProvider extends Acontract{

    constructor() {
        super(
            abi.abi,
            import.meta.env.VITE_CONTRACT_PROVIDER_ADDRESS
        );
    }

    private connectOwner(): Contract {
        return this.contract.connect(import.meta.env.VITE_CONTRACT_PROVIDER_OWNER);
    }

    public async getVersion(): Promise<string> {
        const version: string = await this.connectOwner().getVersion();
        return version;
    }

    public async getBooklets(bookletOwner: string): Promise<Array<string>> {
        const tx: Array<string> = await this.connectOwner().getBooklets(bookletOwner);
        return tx;
    }

    public async createBooklet(bookletOwner: string): Promise<string | undefined> {

        await this.contract.provide(bookletOwner);
        const events: Array<Event> = await this.contract.queryFilter("BookletCreated");
        return events.length > 0 && Array.isArray(events[0].args) && events[0].args[0] ? events[0].args[0] : "";
    }
}

export default CarBookletProvider;