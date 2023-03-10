import { Card, CardContent, Typography } from "@mui/material";
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
        <Card sx={{ minWidth: 275 , marginBottom: 2}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {maintenance?.mileage} km.
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <>
                        Maintenance date: {maintenance?.timestamp ? new Date(maintenance.timestamp * 1000).toDateString() : "Not specified"}
                    </>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    { maintenance?.description }
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MaintenanceCard;