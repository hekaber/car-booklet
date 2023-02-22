import type { BlockTag } from '@ethersproject/abstract-provider';
import { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import AlchemyApi from '../utils/AlchemyApi';

const alchemy = AlchemyApi.getAlchemyInstance();

const Home = () => {


    const [blockNumber, setBlockNumber] = useState<BlockTag>("");
    const [loading, setLoading] = useState(true);

    async function getBlockNumber() {
        const bNum: BlockTag = await alchemy.core.getBlockNumber();
        setBlockNumber(bNum);
        setLoading(false);
    }

    useEffect(() => {
        getBlockNumber();
    }, []);

    return (
        <>
            <div>HELLO</div>
        </>
        // <>
        //     <div className="block-container">
        //         <div className="title">Latest Block</div>
        //         <div className="block-number">Block Number:
        //             <Circles
        //                 height="20"
        //                 width="20"
        //                 color="#000000"
        //                 ariaLabel="circles-loading"
        //                 wrapperStyle={{
        //                     display: loading ? 'inline' : 'none',
        //                     marginLeft: '1em'
        //                 }}
        //                 wrapperClass=""
        //                 visible={loading}
        //             />
        //             {!loading && blockNumber}
        //         </div>
        //         <BlockInfo
        //             blockNumber={blockNumber}
        //         />
        //     </div>
        //     <div className="block-container">
        //         <div className="subtitle">Transactions</div>
        //         <BlockTransactions
        //             blockNumber={blockNumber}
        //         />
        //     </div>
        //     <ContractForm />
        // </>
    );
};

export default Home;