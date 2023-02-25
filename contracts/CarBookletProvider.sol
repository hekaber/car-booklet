// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Authorize} from './utils/Authorize.sol';
import {CarBooklet} from './CarBooklet.sol';

contract CarBookletProvider is Authorize {

    constructor() {
        owner = msg.sender;
    }

    event BookletCreated(CarBooklet booklet);

    function provide(address bookletOwner) external {

        CarBooklet booklet = new CarBooklet(bookletOwner);
        emit BookletCreated(booklet);
    }
}