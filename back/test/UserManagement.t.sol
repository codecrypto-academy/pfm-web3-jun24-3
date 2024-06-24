//SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test} from "forge-std/Test.sol";
import {UserManagement} from "../src/UserManagement.sol";
import {DeployUserManagement} from "../script/DeployUserManagement.s.sol";

contract UserManagementTest is Test {
    UserManagement public userManagement;

    function setUp() external {
        DeployUserManagement deployUserManagement = new DeployUserManagement();
        userManagement = deployUserManagement.run();
    }

    function test_SetOwner() public {
        address newOwner = address(1);

        vm.prank(userManagement.owner()); // Simulate as if the current owner is calling
        userManagement.setOwner(newOwner);

        assertEq(userManagement.owner(), newOwner);
    }

    function test_SetOwnerAsNoOwner() public {
        vm.expectRevert(bytes("Error: Only current owner can set new owner"));
        vm.startPrank(address(1));
        userManagement.setOwner(address(3));
        vm.stopPrank();
    }

    function test_RegisterUser() public {
        address user = address(1);
        UserManagement.Role role = UserManagement.Role.Agricultor;
        string memory email = "user@mail.com";

        userManagement.registerUser(user, role, email);

        UserManagement.UserInfo memory userInfo = userManagement.getUserInfo(
            user
        );

        assertEq(uint(userInfo.role), uint(role));
        assertEq(userInfo.email, email);
    }
}