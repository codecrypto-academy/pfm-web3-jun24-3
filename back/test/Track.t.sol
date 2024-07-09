// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/Track.sol";
import "../src/UserManagement.sol";

contract TrackTest is Test {
    Track private track;
    UserManagement private userManagement;

    address private owner = address(0x123);
    address private agricultor = address(0x124);
    address private bodegero = address(0x125);
    address private transportista = address(0x126);
    address private vendedor = address(0x127);
    address private minorista = address(0x128);

    function setUp() public {
        vm.startPrank(owner);
        userManagement = new UserManagement();
        track = new Track(address(userManagement));
        vm.stopPrank();

        registerAndSetRoles();
    }

    function registerAndSetRoles() internal {
        vm.startPrank(owner);

        UserManagement.UserInfo memory userInfo = userManagement.getUserInfo(owner);
        if (!userInfo.isRegistered) {
            userManagement.registerUser(owner, "owner@example.com", 4);
            userManagement.setUserRole(owner, uint(UserManagement.Role.Admin));
        }

        userInfo = userManagement.getUserInfo(agricultor);
        if (!userInfo.isRegistered) {
            userManagement.registerUser(agricultor, "agricultor@example.com", 0);
            userManagement.setUserRole(agricultor, uint(UserManagement.Role.Agricultor));
        }

        userInfo = userManagement.getUserInfo(bodegero);
        if (!userInfo.isRegistered) {
            userManagement.registerUser(bodegero, "bodegero@example.com", 1);
            userManagement.setUserRole(bodegero, uint(UserManagement.Role.Bodegero));
        }

        userInfo = userManagement.getUserInfo(transportista);
        if (!userInfo.isRegistered) {
            userManagement.registerUser(transportista, "transportista@example.com", 2);
            userManagement.setUserRole(transportista, uint(UserManagement.Role.Transportista));
        }

        userInfo = userManagement.getUserInfo(vendedor);
        if (!userInfo.isRegistered) {
            userManagement.registerUser(vendedor, "vendedor@example.com", 3);
            userManagement.setUserRole(vendedor, uint(UserManagement.Role.Vendedor));
        }

        userInfo = userManagement.getUserInfo(minorista);
        if (!userInfo.isRegistered) {
            userManagement.registerUser(minorista, "minorista@example.com", 3);
            userManagement.setUserRole(minorista, uint(UserManagement.Role.Cliente));
        }

        vm.stopPrank();
    }


 function testSetOwner() public {
        address newOwner = address(0x129);
        vm.prank(owner);
        track.setOwner(newOwner);
        address currentOwner = track.owner();
        emit log_named_address("Current owner", currentOwner);
        assertEq(currentOwner, newOwner);
    }


    function testFailSetOwnerNotOwner() public {
        address newOwner = address(0x129);
        vm.prank(agricultor);
        track.setOwner(newOwner);
    }

    function testAddTrackItemAsAgricultor() public {
        vm.prank(agricultor);
        track.addTrackItem(1, "2024/06/01", "Spain", "1000 kg", "Lote Uva Tipo 1", "Agricultor1", agricultor, agricultor, 0, "Precio de venta", keccak256(abi.encodePacked("itemHash")));

        Track.TrackItem[] memory items = track.getTrackItems(1);
        emit log_named_uint("Items length", items.length);
        assertEq(items.length, 1);
        emit log_named_uint("Item status", uint(items[0].status));
        assertEq(uint(items[0].status), uint(Track.Status.Disponible));
    }

    function testFailAddTrackItemAsBodegeroWithStatusDisponible() public {
        vm.prank(bodegero);
        vm.expectRevert("Error: Unauthorized role for this status");
        try track.addTrackItem(1, "2024/06/01", "Spain", "1000 kg", "Lote Uva Tipo 1", "Bodegero1", bodegero, bodegero, 0, "Precio de venta", keccak256(abi.encodePacked("itemHash"))) {
            emit log("Expected revert, but call succeeded");
            assert(false);
        } catch Error(string memory reason) {
            emit log_string(reason);
        } catch (bytes memory /* lowLevelData */) {
            emit log("Expected revert, but call reverted with unexpected error");
            assert(false);
        }
    }

    function testAddTrackItemAsBodegeroWithStatusProcesando() public {
        vm.prank(bodegero);
        track.addTrackItem(1, "2024/06/02", "Spain", "1000 kg", "Lote Uva Tipo 1", "Bodegero1", bodegero, bodegero, 1, "Precio de venta", keccak256(abi.encodePacked("itemHash")));

        Track.TrackItem[] memory items = track.getTrackItems(1);
        emit log_named_uint("Items length", items.length);
        assertEq(items.length, 1);
        emit log_named_uint("Item status", uint(items[0].status));
        assertEq(uint(items[0].status), uint(Track.Status.Procesando));
    }

    function testAddTrackItemAsTransportista() public {
        vm.prank(transportista);
        track.addTrackItem(1, "2024/06/03", "Spain", "1000 kg", "Lote Uva Tipo 1", "Transportista1", transportista, transportista, 5, "Precio de venta", keccak256(abi.encodePacked("itemHash")));

        Track.TrackItem[] memory items = track.getTrackItems(1);
        emit log_named_uint("Items length", items.length);
        assertEq(items.length, 1);
        emit log_named_uint("Item status", uint(items[0].status));
        assertEq(uint(items[0].status), uint(Track.Status.EnRuta));
    }

    function testAddTrackItemAsVendedorWithStatusPedidoRealizado() public {
        vm.prank(vendedor);
        track.addTrackItem(1, "2024/06/04", "Spain", "1000 kg", "Lote Uva Tipo 1", "Vendedor1", vendedor, vendedor, 3, "Precio de venta", keccak256(abi.encodePacked("itemHash")));

        Track.TrackItem[] memory items = track.getTrackItems(1);
        emit log_named_uint("Items length", items.length);
        assertEq(items.length, 1);
        emit log_named_uint("Item status", uint(items[0].status));
        assertEq(uint(items[0].status), uint(Track.Status.PedidoRealizado));
    }

    function testFailAddTrackItemAsMinoristaWithStatusProcesando() public {
        vm.prank(minorista);
        vm.expectRevert("Error: Unauthorized role for this status");
        try track.addTrackItem(1, "2024/06/05", "Spain", "1000 kg", "Lote Uva Tipo 1", "Minorista1", minorista, minorista, 1, "Precio de venta", keccak256(abi.encodePacked("itemHash"))) {
            emit log("Expected revert, but call succeeded");
            assert(false);
        } catch Error(string memory reason) {
            emit log_string(reason);
        } catch (bytes memory /* lowLevelData */) {
            emit log("Expected revert, but call reverted with unexpected error");
            assert(false);
        }
    }

    function testAddTrackItemAsMinoristaWithStatusEntregado() public {
        vm.prank(minorista);
        track.addTrackItem(1, "2024/06/06", "Spain", "1000 kg", "Lote Uva Tipo 1", "Minorista1", minorista, minorista, 
        4, "Precio de venta", keccak256(abi.encodePacked("itemHash")));

        Track.TrackItem[] memory items = track.getTrackItems(1);
        emit log_named_uint("Items length", items.length);
        assertEq(items.length, 1);
        emit log_named_uint("Item status", uint(items[0].status));
        assertEq(uint(items[0].status), uint(Track.Status.Entregado));
    }
}
