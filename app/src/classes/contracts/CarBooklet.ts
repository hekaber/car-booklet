import abi from '../abi/CarBooklet.json'
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
}

export default CarBooklet;