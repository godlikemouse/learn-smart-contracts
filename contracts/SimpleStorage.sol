// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// This is a simple storage contract which demonstrates the ability to update
// a stored string and retrieve its value.

contract SimpleStorage {
    string public data = "mydata";

    // The memory keyword tells solidity to create a chunk of space for the
    // variable at method runtime, guaranteeing its size and structure for future
    // use in that method instead of allocating it in storage
    function set(string memory _data) public {
        data = _data;
    }

    // The view keyword is used when the function is readonly and does not
    // modify the state of the contract or emit events
    function get() public view returns (string memory) {
        return data;
    }
}
