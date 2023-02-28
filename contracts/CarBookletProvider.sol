// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Authorize} from "./utils/Authorize.sol";
import {CarBooklet} from "./CarBooklet.sol";

contract CarBookletProvider is Authorize {
    mapping(address => address[]) private userBooklets;

    constructor() {
        owner = msg.sender;
    }

    event BookletCreated(address bookletAddr);

    function getVersion() external pure returns (string memory) {
        return "v1";
    }

    function provide(address bookletOwner) external isOwner {
        CarBooklet booklet = new CarBooklet(bookletOwner);
        userBooklets[bookletOwner].push(address(booklet));
        emit BookletCreated(address(booklet));
    }

    function getBooklets(address bookletOwner)
        external
        view
        isOwner
        returns (address[] memory booklets)
    {
        booklets = userBooklets[bookletOwner];
    }
}
