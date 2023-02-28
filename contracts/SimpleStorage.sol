// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract SimpleStorage {
    string public data = "mydata";

    function set(string memory _data) public {
        data = _data;
    }

    function get() public view returns (string memory) {
        return data;
    }
}
