//SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {Track} from "../src/Track.sol";
import {UserManagement} from "../src/UserManagement.sol";

contract DeployTrack is Script {
    Track track;
    UserManagement userManagement;

    function run() external returns (Track, UserManagement) {
        vm.startBroadcast();

        // Deploy UserManagement contract
        userManagement = new UserManagement();

        // Deploy Track contract with the address of UserManagement contract
        track = new Track(address(userManagement));

        vm.stopBroadcast();

        return (track, userManagement);
    }
}
