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
    const [owner, otherAccount] = await ethers.getSigners();

    const CarBooklet = await ethers.getContractFactory("CarBooklet");
    const carBooklet = await CarBooklet.deploy();

    return { carBooklet, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      const { carBooklet, owner, otherAccount } = await loadFixture(deployCarBookletFixture);
      expect(await carBooklet.owner()).to.equal(owner.address);
    });

  });

  describe("Actions", function () {

    describe("Authorization", function () {

      it("Should add an aothorized address and check is the address is authorized", async function () {
        const { carBooklet, owner, otherAccount } = await loadFixture(deployCarBookletFixture);
        await carBooklet.allowAuthorization(otherAccount.address);
        expect(await carBooklet.hasAuthorizedCredential(otherAccount.address)).to.equal(true);
      });
    });

    describe("Records", function () {

      it("Should receive and store the maintenance records to carBooklet", async function () {
        const { carBooklet, owner, otherAccount } = await loadFixture(deployCarBookletFixture);
        await carBooklet.allowAuthorization(otherAccount.address);

        const description = "First maintenance";
        const mileage = 3000;

        await (carBooklet.connect(otherAccount).addMaintenanceRecord(mileage, description));
        const currRecord = carBooklet.record();
        expect((await currRecord).mileage.toNumber()).to.equal(mileage);
        expect((await currRecord).description).to.equal(description);
      });
    });

    describe("Events", function () {
      it("Should emit an event on record creation", async function () {
        const { carBooklet, owner, otherAccount } = await loadFixture(deployCarBookletFixture);
        await carBooklet.allowAuthorization(otherAccount.address);

        const description = "First maintenance";
        const mileage = 3000;

        await expect(carBooklet.connect(otherAccount).addMaintenanceRecord(mileage, description))
          .to.emit(carBooklet, "RecordCreated")
          .withArgs(otherAccount.address);
      });
    });
  });
});
