import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarBooklet from '../classes/contracts/CarBooklet';
import MaintenanceCard from '../components/MaintenanceCard/MaintenanceCard';

const Booklet = () => {
    const { bookletAddress } = useParams();
    const [mapId, setMapId] = useState<Number>(0);

    // TODO: set alert when no carBooklet or something else
    const carBooklet = bookletAddress ? new CarBooklet(bookletAddress) : null;

    const init = async () => {
        console.log("Get last map id");
        console.log(carBooklet);
        const lastMapId = carBooklet ? await carBooklet.getLastMaintenanceId() : 0;
        console.log(lastMapId);
        setMapId(lastMapId);
    }

    useEffect(() => { init() }, []);

    const maintenanceCards = () => {

        if (mapId === 0) {
            return <></>;
        }

        let cards = [];
        for (let i = 1; i <= mapId; i++) {
            cards.push(<MaintenanceCard maintenanceId={i} carBooklet={carBooklet} />);
        }
        return cards;
    }

    return (
        <div className="about">
            <>
                Booklet<br />
                {bookletAddress}<br />
                {maintenanceCards()}
            </>
        </div>
    );
};

export default Booklet;