import { UserContext } from '../App';
import { useContext, useState } from 'react';

const CarDashboard = () => {
    const userContext = useContext(UserContext);

    return (
        <div className="about">
            Car dashboard
            { userContext.account}
        </div>
    );
};

export default CarDashboard;