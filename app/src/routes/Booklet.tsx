import { UserContext } from '../App';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

const Booklet = () => {
    const userContext = useContext(UserContext);
    const { bookletAddress } = useParams();
    return (
        <div className="about">
            User<br/>
            {userContext.account}<br />
            Booklet<br />
            {bookletAddress}
        </div>
    );
};

export default Booklet;