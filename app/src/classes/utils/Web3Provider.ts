import Web3 from 'web3';

class Web3Provider {

    private static web3Instance: Web3;

    private constructor() { }

    static async getWeb3Instance(): Promise<Web3> {
        const { ethereum } = (window as any);
        if (!ethereum) {
            throw new Error("Metamask is not installed");
        }

        if (Web3Provider.web3Instance) {
            return Web3Provider.web3Instance;
        }

        await ethereum.request({ method: 'eth_requestAccounts' });
        Web3Provider.web3Instance = new Web3(ethereum);
        return Web3Provider.web3Instance;
    }
}

export default Web3Provider;