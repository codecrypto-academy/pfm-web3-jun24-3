//SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test, console} from "forge-std/Test.sol";
import {Track} from "../src/Track.sol";

contract TrackTest is Test {
    Track public track;

    //Contract state Initialization for each test execution
    function setUp() external {
        track = new Track();
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
        track.setOwner(address(1));
        assertEq(track.owner(), address(1));
    }

    function test_SetUserAsOwner() public {
        track.setUser(address(2));
        assertEq(track.user(), address(2));
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
