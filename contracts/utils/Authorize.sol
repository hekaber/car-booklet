// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

abstract contract Authorize {
    address public owner;
    mapping(address => bool) authorized;

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