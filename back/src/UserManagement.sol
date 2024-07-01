//SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract UserManagement {
    enum Role {
        Agricultor,
        Bodegero,
        Transportista,
        Vendedor,
        Admin,
        Cliente,
        Pendiente_Asignacion_Rol 
    }
    address public owner;

    struct UserInfo {
        Role role;
        string email;
        bool isRegistered;
    }

    address[] public userAddresses;

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
        userAddresses.push(_user);
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

    function getAllUsers() public view returns (address[] memory) {
        return userAddresses;
    }

    function getRoles() public pure returns (Role[] memory) {
        Role[] memory roles = new Role[](7);
        roles[0] = Role.Agricultor;
        roles[1] = Role.Bodegero;
        roles[2] = Role.Transportista;
        roles[3] = Role.Vendedor;
        roles[4] = Role.Admin;
        roles[5] = Role.Cliente;
        roles[6] = Role.Pendiente_Asignacion_Rol;
        return roles;
    }

    function getRolesAsString() public pure returns (string[] memory) {
        string[] memory roles = new string[](7);
        roles[0] = roleToString(Role.Agricultor);
        roles[1] = roleToString(Role.Bodegero);
        roles[2] = roleToString(Role.Transportista);
        roles[3] = roleToString(Role.Vendedor);
        roles[4] = roleToString(Role.Admin);
        roles[5] = roleToString(Role.Cliente);
        roles[6] = roleToString(Role.Pendiente_Asignacion_Rol);
        return roles;
    }

    function roleToString(Role _role) internal pure returns (string memory) {
        if (_role == Role.Agricultor) return "Agricultor";
        if (_role == Role.Bodegero) return "Bodegero";
        if (_role == Role.Transportista) return "Transportista";
        if (_role == Role.Vendedor) return "Vendedor";
        if (_role == Role.Admin) return "Admin";
        if (_role == Role.Cliente) return "Cliente";
        if (_role == Role.Pendiente_Asignacion_Rol) return "Pendiente_Asignacion_Rol";
        return "";
    }

}
