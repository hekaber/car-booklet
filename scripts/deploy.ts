import { ethers } from "hardhat";

async function main() {

  const CarBooklet = await ethers.getContractFactory("CarBooklet");
  const carBooklet = await CarBooklet.deploy();

  await carBooklet.deployed();

  console.log(`CarBooklet deployed to ${carBooklet.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
