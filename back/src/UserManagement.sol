//SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract UserManagement {
    enum Role {
        Agricultor,
        Bodegero,
        Transportista,
        Vendedor
    }
    address public owner;

    struct UserInfo {
        Role role;
        string email;
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

    function registerUser(
        address _user,
        Role _role,
        string memory _email
    ) public {
        users[_user] = UserInfo(_role, _email);
    }

    function getUserInfo(address _user) public view returns (UserInfo memory) {
        return users[_user];
    }
}
