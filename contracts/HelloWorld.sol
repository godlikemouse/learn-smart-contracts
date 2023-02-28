// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// This is a simple contract demonstrating how to invoke a method.

contract HelloWorld {
    // The pure keyword is used to denote that this function does not
    // read or modify state.
    function hello() public pure returns (string memory) {
        return "Hello World";
    }
}
