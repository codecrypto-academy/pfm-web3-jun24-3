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
        string memory email = "user@mail.com";
        uint role = 6;

        userManagement.registerUser(user, email, role);

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
        uint role = 6;

        userManagement.registerUser(user, email, role);
        vm.expectRevert(bytes("Error: User already registered"));
        userManagement.registerUser(user, email, role);
    }

    function test_SetUserRole() public {
        address user = address(1);
        UserManagement.Role role = UserManagement.Role.Agricultor;

        vm.prank(userManagement.owner()); // Simulate as if the current owner is calling
        userManagement.setUserRole(user, uint(role));

        UserManagement.UserInfo memory userInfo = userManagement.getUserInfo(
            user
        );

        assertEq(uint(userInfo.role), uint(role));
    }

    function test_SetUserRoleAsNoOwner() public {
        vm.expectRevert(bytes("Error: Only owner can set user role"));
        vm.startPrank(address(1));
        userManagement.setUserRole(
            address(3),
            uint(UserManagement.Role.Agricultor)
        );
        vm.stopPrank();
    }

    function test_GetRoles() public view {
        UserManagement.Role[] memory roles = userManagement.getRoles();

        assertEq(uint(roles[0]), uint(UserManagement.Role.Agricultor));
        assertEq(uint(roles[1]), uint(UserManagement.Role.Bodegero));
        assertEq(uint(roles[2]), uint(UserManagement.Role.Transportista));
        assertEq(uint(roles[3]), uint(UserManagement.Role.Vendedor));
        assertEq(uint(roles[4]), uint(UserManagement.Role.Admin));
        assertEq(uint(roles[5]), uint(UserManagement.Role.Cliente));
        assertEq(
            uint(roles[6]),
            uint(UserManagement.Role.Pendiente_Asignacion_Rol)
        );
    }

    function test_GetRolesAsString() public view {
        string[] memory roles = userManagement.getRolesAsString();

        assertEq(roles[0], "Agricultor");
        assertEq(roles[1], "Bodegero");
        assertEq(roles[2], "Transportista");
        assertEq(roles[3], "Vendedor");
        assertEq(roles[4], "Admin");
        assertEq(roles[5], "Cliente");
        assertEq(roles[6], "Pendiente_Asignacion_Rol");
    }
}
