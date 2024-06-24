//SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test, console} from "forge-std/Test.sol";
import {Track} from "../src/Track.sol";
import {DeployTrack} from "../script/DeployTrack.s.sol";

contract TrackTest is Test {
    Track public track;

    //Contract state Initialization for each test execution
    function setUp() external {
        DeployTrack deployTrack = new DeployTrack();
        track = deployTrack.run();
        track.setTrackId(0);
    }

    function test_SetTrackId() public {
        track.setTrackId(100);
        assertEq(track.trackId(), 100);
    }

    function testFuzz_SetTrackId(uint256 x) public {
        track.setTrackId(x);
        assertEq(track.trackId(), x);
    }

    function test_SetOwnerAsOwner() public {
        address newOwner = address(1);

        vm.prank(track.owner()); // Simulate as if the current owner is calling
        track.setOwner(newOwner);

        assertEq(track.owner(), newOwner);
    }

    function test_SetUserAsOwner() public {
        address newUser = address(2);

        vm.prank(track.owner()); // Simulate as if the current owner is calling
        track.setUser(newUser);

        assertEq(track.user(), newUser);
    }

    function test_SetOwnerAsNoOwner() public {
        vm.expectRevert(bytes("Error: Only current owner can set new owner"));
        vm.startPrank(address(1));
        track.setOwner(address(3));
        vm.stopPrank();
    }

    function test_SetUserAsNoOwner() public {
        vm.expectRevert(bytes("Error: Only current owner can set user"));
        vm.startPrank(address(1));
        track.setUser(address(3));
        vm.stopPrank();
    }
}
