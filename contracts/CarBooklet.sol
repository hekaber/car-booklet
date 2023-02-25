// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract CarBooklet {
    struct MaintenanceRecord {
        uint256 mileage;
        string description;
        uint256 timestamp;
    }

    address public owner;
    mapping(address => bool) authorized;

    MaintenanceRecord public record = MaintenanceRecord(0, "", 0);
    MaintenanceRecord public previousRecord;
    event RecordCreated(address);

    constructor() {
        owner = msg.sender;
    }

    function addMaintenanceRecord(uint256 mileage, string memory description)
        external
        isAuthorized
    {
        require(mileage > record.mileage, "Mileage is incorrect.");
        previousRecord = record;
        record = MaintenanceRecord(mileage, description, block.timestamp);
        emit RecordCreated(msg.sender);
    }

    function allowAuthorization(address addr) external isOwner {
        authorized[addr] = true;
    }

    function hasAuthorizedCredential(address addr) external view isOwner returns(bool) {
        return authorized[addr];
    }

    function revokeAuthorization(address addr) external isOwner {
        authorized[addr] = false;
    }

    modifier isOwner() {
        require(owner == msg.sender, "Only owner is allowed.");
        _;
    }

    modifier isAuthorized() {
        require(
            authorized[msg.sender],
            "Only authorized addresses are allowed."
        );
        _;
    }
}
