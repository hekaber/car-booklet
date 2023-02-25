// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

abstract contract Authorize {
    address public owner;
    mapping(address => bool) authorized;

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