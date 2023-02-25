// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Authorize} from './utils/Authorize.sol';

contract CarBookletProvider is Authorize {

    constructor() {
        owner = msg.sender;
    }


}