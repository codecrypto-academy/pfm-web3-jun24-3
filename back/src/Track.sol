//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Track {
    address public owner;
    address public user;
    uint256 public trackId;


    /// @notice Structure to represent each tracking step
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
        string status;
        string value;
        bytes32 itemHash;
    }

    /// @notice Mapping from trackId to a list of TrackItems
    mapping(uint256 => TrackItem[]) public tracks;

    /// @notice Event emitted when a new TrackItem is added
    event TrackItemAdded(uint256 indexed trackId, uint256 indexed trackItemId, string status, address owner);


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

    function addTrackItem(
        uint256 _trackId,
        string memory _date,
        string memory _location,
        string memory _quantity,
        string memory _itemType,
        string memory _name,
        address _origin,
        address _owner,
        string memory _status,
        string memory _value,
        bytes32 _itemHash
    ) public {
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
            status: _status,
            value: _value,
            itemHash: _itemHash
        });

        tracks[_trackId].push(newItem);

        emit TrackItemAdded(_trackId, trackItemId, _status, _owner);
    }

    function getTrackItems(uint256 _trackId) public view returns (TrackItem[] memory) {
        return tracks[_trackId];
    }
}
