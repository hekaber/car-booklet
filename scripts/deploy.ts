import { ethers } from "hardhat";

async function main() {

  const CarBookletProvider = await ethers.getContractFactory("CarBookletProvider");
  const carBookletProvider = await CarBookletProvider.deploy();

  await carBookletProvider.deployed();

  console.log(`CarBookletProvider deployed to ${carBookletProvider.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
