import { useEffect, useState } from "react";
import CarBooklet from "../../classes/contracts/CarBooklet";
import { IMaintenanceRecord } from "../../classes/utils/Interfaces";


interface IMCProps {
    maintenanceId: number;
    carBooklet: CarBooklet | null;
}

const MaintenanceCard = (props: IMCProps) => {

    const { maintenanceId, carBooklet } = props;
    const [maintenance, setMaintenance] = useState<IMaintenanceRecord | null>(null);

    const getMaintenanceData = async () => {
        const data: IMaintenanceRecord | null = carBooklet ? await carBooklet.getMaintenanceRecord(maintenanceId) : null;
        console.log("Maintenance data", data);
        setMaintenance(data);
    }

    useEffect(() => { getMaintenanceData() }, []);

    return (
        <>
            <div>Mileage: {maintenance?.mileage }</div>
            <div>Description: { maintenance?.description}</div>
            <div>Time: { maintenance?.timestamp}</div>
        </>
    );
}

export default MaintenanceCard;