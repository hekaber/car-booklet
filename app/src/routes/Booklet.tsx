import { UserContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarBooklet from '../classes/contracts/CarBooklet';

const Booklet = () => {
    const userContext = useContext(UserContext);
    const { bookletAddress } = useParams();
    const [mapId, setMapId] = useState<Number>(0);

    // TODO: set alert when no carBooklet or something else
    const carBooklet = bookletAddress ? new CarBooklet(bookletAddress) : null;

    const getLastMaintenanceId = async () => {
        const lastMapId = carBooklet ? await carBooklet.getLastMaintenanceId() : 0;
        setMapId(lastMapId);
    }

    useEffect(() => { getLastMaintenanceId() }, []);
    
    return (
        <div className="about">
            User<br/>
            {userContext.account}<br />
            Booklet<br />
            {bookletAddress}<br />{mapId}
        </div>
    );
};

export default Booklet;