//SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {Track} from "../src/Track.sol";

contract DeployTrack is Script {
    Track track;

    function run() external returns (Track) {
        vm.startBroadcast();
        track = new Track();
        vm.stopBroadcast();

        return track;
    }
}
