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
    uint256 public mapId;
    mapping(uint256 => MaintenanceRecord) private maintenanceRecords;
    event RecordCreated(uint256);

    constructor(address _owner) {
        owner = _owner;
        authorized[owner] = true;
    }

    function addMaintenanceRecord(uint256 mileage, string memory description)
        external
        isAuthorized
    {
        MaintenanceRecord memory record = maintenanceRecords[mapId];
        require(mileage > record.mileage, "Mileage is incorrect.");
        record = MaintenanceRecord(mileage, description, block.timestamp);
        ++mapId;
        maintenanceRecords[mapId] = record;

        emit RecordCreated(mapId);
    }

    function getMaintenanceRecord(uint256 _mapId)
        external
        view
        isAuthorized
        returns (MaintenanceRecord memory record)
    {
        return maintenanceRecords[_mapId];
    }
}
