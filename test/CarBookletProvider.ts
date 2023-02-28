import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CarBookletProvider", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployCarBookletProviderFixture() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const CarBookletProvider = await ethers.getContractFactory("CarBookletProvider");
        const carBookletProvider = await CarBookletProvider.deploy();

        return { carBookletProvider, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should set the correct owner", async function () {
            const { carBookletProvider, owner, otherAccount } = await loadFixture(deployCarBookletProviderFixture);
            expect(await carBookletProvider.owner()).to.equal(owner.address);
        });

    });

    describe("Actions", function () {

        describe("Booklet creation", function () {

            it("Should create a booklet with an owner", async function () {

                const { carBookletProvider, owner, otherAccount } = await loadFixture(deployCarBookletProviderFixture);
                await carBookletProvider.provide(otherAccount.address);
                const events = await carBookletProvider.queryFilter("BookletCreated");
                const CarBooklet = await ethers.getContractFactory("CarBooklet");
                const carBooklet = await CarBooklet.attach(events[0].args[0]);

                expect(await carBooklet.owner()).to.equal(otherAccount.address);
            });

            it("Should create a mapping data that binds the owner with his booklets.", async function () {

                const { carBookletProvider, owner, otherAccount } = await loadFixture(deployCarBookletProviderFixture);
                await carBookletProvider.provide(otherAccount.address);
                const events = await carBookletProvider.queryFilter("BookletCreated");
                const CarBooklet = await ethers.getContractFactory("CarBooklet");
                const carBooklet = await CarBooklet.attach(events[0].args[0]);
                
                const storedContract = await carBookletProvider.getBooklets(otherAccount.address);
                expect(storedContract[0]).to.equal(carBooklet.address);
            });
        });
    });
});
