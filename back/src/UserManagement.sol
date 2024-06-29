//SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract UserManagement {
    enum Role {
        Agricultor,
        Bodegero,
        Transportista,
        Vendedor,
        Pendiente_Asignacion_Rol
    }
    address public owner;

    struct UserInfo {
        Role role;
        string email;
        bool isRegistered;
    }

    mapping(address => UserInfo) public users;

    constructor() {
        owner = msg.sender;
    }

    function setOwner(address _owner) public {
        //Only current owner can set new owner
        require(
            msg.sender == owner,
            "Error: Only current owner can set new owner"
        );
        owner = _owner;
    }

    function registerUser(address _user, string memory _email) public {
        if(users[_user].isRegistered) {
            revert("Error: User already registered");
        }
        users[_user] = UserInfo(Role.Pendiente_Asignacion_Rol, _email, true);
    }

    function getUserInfo(address _user) public view returns (UserInfo memory) {
        return users[_user];
    }

    function setUserRole(address _user, Role _role) public {
        //Only owner can set user role
        require(msg.sender == owner, "Error: Only owner can set user role");
        if (_role == Role.Pendiente_Asignacion_Rol) {
            revert("Error: Invalid role");
        }

        users[_user].role = _role;
    }

    function getRoles() public pure returns (Role[] memory) {
        Role[] memory roles = new Role[](5);
        roles[0] = Role.Agricultor;
        roles[1] = Role.Bodegero;
        roles[2] = Role.Transportista;
        roles[3] = Role.Vendedor;
        roles[4] = Role.Pendiente_Asignacion_Rol;
        return roles;
    }
}
