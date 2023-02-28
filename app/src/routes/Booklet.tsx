import { UserContext } from '../App';
import { useContext, useState } from 'react';

const Booklet = () => {
    const userContext = useContext(UserContext);

    return (
        <div className="about">
            Booklet
            { userContext.account}
        </div>
    );
};

export default Booklet;