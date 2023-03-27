import abi from '../abi/CarBooklet.json'
import { BigNumber } from 'ethers';
import { IMaintenanceRecord } from '../interfaces/Interfaces';
import Acontract from './Acontract';

class CarBooklet extends Acontract {

    constructor(contractAddress: string) {
        super(
            abi.abi,
            contractAddress
        );
    }

    public async getLastMaintenanceId(): Promise<Number> {

        const tx: BigNumber = await this.contract.mapId();
        return tx.toNumber();
    }

    public async getMaintenanceRecord(id: number): Promise<IMaintenanceRecord> {

        const tx: any = await this.contract.getMaintenanceRecord(id);
        return { mileage: tx.mileage.toNumber(), description: tx.description, timestamp: tx.timestamp.toNumber()};
    }

    public async addMaintenanceRecord(mileage: number, description: string) {

        try {
            await this.contract.addMaintenanceRecord(mileage, description);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("unknown event occured");
        }
    }

    public waitFor(callback: () => void, eventName: string) {
        this.contract.on(eventName, callback);
    }
}

export default CarBooklet;