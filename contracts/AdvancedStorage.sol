// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// This contract demonstrates a slightly more advanced approach to storing and
// updating state as well as defining more functions for interaction.

contract AdvancedStorage {
    uint256[] public ids;

    // This method adds an id to to the list of ids.
    function add(uint256 id) public {
        ids.push(id);
    }

    // This method retrives an id at the specified position.
    function get(uint256 position) public view returns (uint256) {
        return ids[position];
    }

    // This method retrives all current ids.
    function getAll() public view returns (uint256[] memory) {
        return ids;
    }

    // This method retrives the length of the ids.
    function length() public view returns (uint256) {
        return ids.length;
    }
}
