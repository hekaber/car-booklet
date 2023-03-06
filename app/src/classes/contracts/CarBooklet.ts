import abi from '../abi/CarBooklet.json'
import { IMaintenanceRecord } from '../utils/Interfaces';
import Acontract from './Acontract';

class CarBooklet extends Acontract {

    constructor(contractAddress: string) {
        super(
            abi.abi,
            contractAddress
        );
    }

    public async getLastMaintenanceId(): Promise<Number> {

        const tx: Number = await this.contract.mapId();
        return tx;
    }

    public async getMaintenanceRecord(id: number): Promise<IMaintenanceRecord> {

        const tx: any = await this.contract.getMaintenanceRecord(id);
        return tx;
    }

    public async addMaintenanceRecord(mileage: number, description: string) {

        this.contract.addMaintenanceRecord(mileage, description);
        const events = await this.contract.queryFilter("RecordCreated");
        return events[0] && events[0].args ? events[0].args[0] : 0;
    }
}

export default CarBooklet;