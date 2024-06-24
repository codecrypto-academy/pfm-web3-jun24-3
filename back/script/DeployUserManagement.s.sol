//SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {UserManagement} from "../src/UserManagement.sol";

contract DeployUserManagement is Script {
    UserManagement userManagement;

    function run() external returns (UserManagement) {
        vm.startBroadcast();
        userManagement = new UserManagement();
        vm.stopBroadcast();

        return userManagement;
    }
}
