import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config({ path: __dirname + '/env/.env' })

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: 'localhost',
  networks: {
    goerli: {
      url: process.env.VITE_APP_GOERLI_DEV_URL,
      accounts: [process.env.VITE_APP_PRIVATE_KEY]
    }
  }
};

export default config;
