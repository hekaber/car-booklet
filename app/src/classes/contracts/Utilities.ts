import AlchemyApi from '../utils/AlchemyApi';
import { AssetTransfersCategory, AssetTransfersResponse } from 'alchemy-sdk';

export const getContractsByAddress = async (account: string | null): Promise<AssetTransfersResponse | undefined> => {

    if (!account) {
        return undefined;
    }

    const addr = account;
    const alchemyApi = AlchemyApi.getAlchemyInstance();

    try {
        const providerAddress = import.meta.env.VITE_CONTRACT_PROVIDER_ADDRESS;

        const txHashes = await alchemyApi.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: addr,
            toAddress: import.meta.env.VITE_CONTRACT_SEPOLIA_PROVIDER_ADDRESS,
            category: [
                AssetTransfersCategory.EXTERNAL,
                AssetTransfersCategory.INTERNAL,
                AssetTransfersCategory.ERC20,
                AssetTransfersCategory.ERC721
            ]
        });
        return txHashes;
    } catch (error) {
        console.log(error);
    }

    return undefined;
}


