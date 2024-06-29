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
        UserManagement.Role role = UserManagement.Role.Pendiente_Asignacion_Rol;
        string memory email = "user@mail.com";

        userManagement.registerUser(user, email);

        UserManagement.UserInfo memory userInfo = userManagement.getUserInfo(
            user
        );

        assertEq(uint(userInfo.role), uint(role));
        assertEq(userInfo.email, email);
        assertEq(userInfo.isRegistered, true);
    }

    function test_RegisterUserTwice() public {
        address user = address(1);
        string memory email = "user@mail.com";

        userManagement.registerUser(user, email);
        vm.expectRevert(bytes("Error: User already registered"));
        userManagement.registerUser(user, email);
    }

    function test_SetUserRole() public {
        address user = address(1);
        UserManagement.Role role = UserManagement.Role.Agricultor;

        vm.prank(userManagement.owner()); // Simulate as if the current owner is calling
        userManagement.setUserRole(user, role);

        UserManagement.UserInfo memory userInfo = userManagement.getUserInfo(
            user
        );

        assertEq(uint(userInfo.role), uint(role));
    }

    function test_SetUserRoleAsNoOwner() public {
        vm.expectRevert(bytes("Error: Only owner can set user role"));
        vm.startPrank(address(1));
        userManagement.setUserRole(address(3), UserManagement.Role.Agricultor);
        vm.stopPrank();
    }
}
