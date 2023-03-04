import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CarBooklet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCarBookletFixture() {

    // Contracts are deployed using the first signer/account by default
    const [deployer, otherAccount] = await ethers.getSigners();

    const CarBooklet = await ethers.getContractFactory("CarBooklet");
    const carBooklet = await CarBooklet.deploy(otherAccount.address);

    return { carBooklet, deployer, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      const { carBooklet, deployer, otherAccount } = await loadFixture(deployCarBookletFixture);
      expect(await carBooklet.owner()).to.equal(otherAccount.address);
    });

  });

  describe("Actions", function () {

    describe("Authorization", function () {

      it("Should add an authorized address and check is the address is authorized", async function () {
        const { carBooklet, deployer, otherAccount } = await loadFixture(deployCarBookletFixture);
        await carBooklet.connect(otherAccount).allowAuthorization(deployer.address);
        expect(await carBooklet.connect(otherAccount).hasAuthorizedCredential(deployer.address)).to.equal(true);
      });

      it("Should revoke an authorized address", async function () {
        const { carBooklet, deployer, otherAccount } = await loadFixture(deployCarBookletFixture);
        await carBooklet.connect(otherAccount).allowAuthorization(deployer.address);
        await carBooklet.connect(otherAccount).revokeAuthorization(deployer.address);
        expect(await carBooklet.connect(otherAccount.address).hasAuthorizedCredential(deployer.address)).to.equal(false);
      });
    });

    describe("Records", function () {

      it("Should receive and store the maintenance records to carBooklet", async function () {
        const { carBooklet, deployer, otherAccount } = await loadFixture(deployCarBookletFixture);
        await carBooklet.connect(otherAccount).allowAuthorization(deployer.address);

        const description = "First maintenance";
        const mileage = 3000;

        const tx = await carBooklet.connect(deployer).addMaintenanceRecord(mileage, description);
        const events = await carBooklet.queryFilter("RecordCreated");
        const recordId = events[0].args[0];
        const currRecord = await carBooklet.getMaintenanceRecord(recordId);

        expect((await currRecord).mileage.toNumber()).to.equal(mileage);
        expect((await currRecord).description).to.equal(description);
      });

      it("Should avoid to store new records with lower mileage", async function () {
        const { carBooklet, deployer, otherAccount } = await loadFixture(deployCarBookletFixture);
        await carBooklet.connect(otherAccount).allowAuthorization(deployer.address);

        const firstDescription = "First maintenance";
        const firstMileage = 3000;

        const secondDescription = "Second maintenance";
        const secondMileage = 2000;

        await carBooklet.connect(deployer).addMaintenanceRecord(firstMileage, firstDescription);

        await expect(carBooklet.connect(deployer).addMaintenanceRecord(secondMileage, secondDescription)).to.be.revertedWith('Mileage is incorrect.');
      });

      it("Should get the top map Id", async function () {
        const { carBooklet, deployer, otherAccount } = await loadFixture(deployCarBookletFixture);
        await carBooklet.connect(otherAccount).allowAuthorization(deployer.address);

        const firstDescription = "First maintenance";
        const firstMileage = 3000;

        const secondDescription = "Second maintenance";
        const secondMileage = 10000;

        await carBooklet.connect(deployer).addMaintenanceRecord(firstMileage, firstDescription);
        await carBooklet.connect(deployer).addMaintenanceRecord(secondMileage, secondDescription);

        expect(await carBooklet.mapId()).to.be.equal(2);
      });
    });

    describe("Events", function () {
      it("Should emit an event on record creation", async function () {
        const { carBooklet, deployer, otherAccount } = await loadFixture(deployCarBookletFixture);
        await carBooklet.connect(otherAccount).allowAuthorization(deployer.address);

        const description = "First maintenance";
        const mileage = 3000;
        const mapId = 1;

        await expect(carBooklet.connect(deployer).addMaintenanceRecord(mileage, description))
          .to.emit(carBooklet, "RecordCreated")
          .withArgs(mapId);
      });
    });
  });
});
