// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Authorize} from "./utils/Authorize.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract CarBooklet is Authorize {
    struct MaintenanceRecord {
        uint256 mileage;
        string description;
        uint256 timestamp;
    }

    MaintenanceRecord public record = MaintenanceRecord(0, "", 0);
    MaintenanceRecord public previousRecord;
    event RecordCreated(address);

    constructor(address _owner) {
        owner = _owner;
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
}
