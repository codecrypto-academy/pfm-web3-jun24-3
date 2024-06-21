//SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract Track {
    address public owner;
    address public user;
    uint256 public trackId;

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

    function setUser(address _user) public {
        //Only owner can set user
        require(msg.sender == owner, "Error: Only current owner can set user");
        user = _user;
    }

    function setTrackId(uint256 _trackId) public {
        trackId = _trackId;
    }
}
