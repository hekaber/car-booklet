import { Alchemy, Network } from 'alchemy-sdk';

class AlchemyApi {

    private static alchemyInstance: Alchemy;
    private static readonly settings = {
        apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
        network: Network.ETH_GOERLI,
    };
    private constructor() { }

    static getAlchemyInstance(): Alchemy {
        console.log(AlchemyApi.settings);
        if (!AlchemyApi.alchemyInstance) {
            AlchemyApi.alchemyInstance = new Alchemy(AlchemyApi.settings)
        }
        return AlchemyApi.alchemyInstance;
    }
}

export default AlchemyApi;