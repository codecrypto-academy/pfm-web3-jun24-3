// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/// @title WineTraceability
/// @dev Smart contract for tracking the production process of wine in a vineyard.
contract WineTraceability {

    /// @dev Enum representing the different stages of wine production.
    enum Stage { Harvest, Fermentation, Aging, Bottling, Completed }

    /// @dev Struct to store information about each stage.
    struct WineProcess {
        uint256 timestamp;
        string description;
    }

    /// @notice Mapping to store the traceability data for each batch ID.
    mapping(uint256 => WineProcess[]) public batches;

    /// @notice Event emitted when a new stage is recorded.
    event StageRecorded(uint256 indexed batchId, Stage stage, uint256 timestamp, string description);

    /// @notice Adds a new stage record to a specific batch.
    /// @param batchId The ID of the batch.
    /// @param stage The stage of the process being recorded.
    /// @param description Description of the process.
    function recordStage(uint256 batchId, Stage stage, string calldata description) external {
        WineProcess memory newProcess = WineProcess({
            timestamp: block.timestamp,
            description: description
        });
        batches[batchId].push(newProcess);
        emit StageRecorded(batchId, stage, block.timestamp, description);
    }

    /// @notice Retrieves the traceability information for a specific batch.
    /// @param batchId The ID of the batch.
    /// @return An array of WineProcess structs containing all recorded stages.
    function getBatch(uint256 batchId) external view returns (WineProcess[] memory) {
        return batches[batchId];
    }
}
