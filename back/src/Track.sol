// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./UserManagement.sol";

contract Track {
    address public owner;
    UserManagement userManagement;

    constructor(address _userManagementAddress) {
        owner = msg.sender;
        userManagement = UserManagement(_userManagementAddress);
    }

    enum Status { Disponible, Procesando, Embotellado, PedidoRealizado, Entregado, EnRuta }

    struct TrackItem {
        uint256 trackId;
        uint256 trackItemId;
        string date;
        string location;
        string quantity;
        string itemType;
        string name;
        address origin;
        address owner;
        Status status;
        string value;
        bytes32 itemHash;
    }

    mapping(uint256 => TrackItem[]) public tracks;

    event TrackItemAdded(uint256 indexed trackId, uint256 indexed trackItemId, Status status, address owner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Error: Only owner can perform this action");
        _;
    }

    function setOwner(address _owner) public onlyOwner {
        owner = _owner;
    }

    function addTrackItem(
        uint256 _trackId,
        string memory _date,
        string memory _location,
        string memory _quantity,
        string memory _itemType,
        string memory _name,
        address _origin,
        address _owner,
        uint256 _status,
        string memory _value,
        bytes32 _itemHash
    ) public {
        UserManagement.UserInfo memory userInfo = userManagement.getUserInfo(msg.sender);
        /*require(
            canAddItem(userInfo.role, Status(_status)),
            "Error: Unauthorized role for this status"
        );*/

        uint256 trackItemId = tracks[_trackId].length + 1;

        TrackItem memory newItem = TrackItem({
            trackId: _trackId,
            trackItemId: trackItemId,
            date: _date,
            location: _location,
            quantity: _quantity,
            itemType: _itemType,
            name: _name,
            origin: _origin,
            owner: _owner,
            status: Status(_status),
            value: _value,
            itemHash: _itemHash
        });

        tracks[_trackId].push(newItem);

        emit TrackItemAdded(_trackId, trackItemId, Status(_status), _owner);
    }

    function canAddItem(UserManagement.Role role, Status status) internal pure returns (bool) {
        if (status == Status.Disponible && role == UserManagement.Role.Agricultor) {
            return true;
        } else if ((status == Status.Procesando || status == Status.Embotellado) && role == UserManagement.Role.Bodegero) {
            return true;
        } else if (status == Status.EnRuta && role == UserManagement.Role.Transportista) {
            return true;
        } else if (status == Status.PedidoRealizado && role == UserManagement.Role.Vendedor) {
            return true;
        } else if (status == Status.Entregado && (role == UserManagement.Role.Vendedor || role == UserManagement.Role.Cliente)) {
            return true;
        }
        return false;
    }

    function getTrackItems(uint256 _trackId) public view returns (TrackItem[] memory) {
        return tracks[_trackId];
    }
}
