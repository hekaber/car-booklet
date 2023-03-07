// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Authorize} from "./utils/Authorize.sol";
import {CarBooklet} from "./CarBooklet.sol";

contract CarBookletProvider is Authorize {
    mapping(address => address[]) private userBooklets;
    mapping(address => uint) private balances;

    constructor() {
        owner = msg.sender;
    }

    event BookletCreated(address bookletAddr);
    event AccessGranted(address requester);

    /**
        Pay 0.1 eth to get access to the protected provider functionalities
    */
    function grantAccess(address requester) external payable {

        require(!authorized[requester], "Requester has already access");
        // TODO: transfer eth to CarBookletProvider owner? or store it in balance?
        // reminder => send this using ethers call func on ts side
        require(msg.value >= 0.1 ether, "Minimum amount to send is 0.1 ETH");
        address payable pOwner = payable(owner);
        pOwner.transfer(msg.value);
        authorized[requester] = true;
        emit AccessGranted(requester);
    }

    function checkAccess(address requester) external view isOwner returns(bool) {
        return authorized[requester];
    }

    function getVersion() external pure returns (string memory) {
        return "v1";
    }

    function provide(address bookletOwner) external isAuthorized {
        CarBooklet booklet = new CarBooklet(bookletOwner);
        userBooklets[bookletOwner].push(address(booklet));
        emit BookletCreated(address(booklet));
    }

    function getBooklets(address bookletOwner)
        external
        view
        isAuthorized
        returns (address[] memory booklets)
    {
        booklets = userBooklets[bookletOwner];
    }
}
