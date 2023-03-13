import abi from '../abi/CarBookletProvider.json';
import { Event } from "ethers";
import Acontract from './Acontract';
import { ethers, Contract } from 'ethers';

class CarBookletProvider extends Acontract{

    constructor() {
        super(
            abi.abi,
            import.meta.env.VITE_CONTRACT_PROVIDER_ADDRESS
        );
    }

    public async isAuthorized(account: string | null): Promise<boolean> {
        return account ? this.connectOwner().hasAuthorizedCredential(account) : false;
    }

    public async getVersion(): Promise<string> {
        const version: string = await this.connectOwner().getVersion();
        return version;
    }

    public async getBooklets(bookletOwner: string | null): Promise<Array<string>> {
        const tx: Array<string> = await this.connectOwner().getBooklets(bookletOwner);
        return tx;
    }

    public async createBooklet(bookletOwner: string | null): Promise<string | undefined> {

        if (!bookletOwner) {
            return undefined;
        }

        await this.contract.provide(bookletOwner);
        const events: Array<Event> = await this.contract.queryFilter("BookletCreated");
        return events.length > 0 && Array.isArray(events[0].args) && events[0].args[0] ? events[0].args[0] : "";
    }

    public async grantAccess(account: string | null): Promise<string | undefined> {

        if (!account) {
            return undefined;
        }

        await this.contract.grantAccess(account, {
            from: account,
            value: ethers.utils.parseEther("0.01")
        });
        const events: Array<Event> = await this.contract.queryFilter("AccessGranted");
        return events.length > 0 && Array.isArray(events[0].args) && events[0].args[0] ? events[0].args[0] : "";
    }

    private connectOwner(): Contract {
        return this.contract.connect(import.meta.env.VITE_CONTRACT_PROVIDER_OWNER);
    }
}

export default CarBookletProvider;