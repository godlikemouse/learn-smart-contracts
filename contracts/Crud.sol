// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Crud {
    struct User {
        uint256 id;
        string name;
    }
    User[] public users;
    uint256 public nextId;

    // This method creates a new User type and adds it to users.
    function create(string memory _name) public {
        users.push(User(++nextId, _name));
    }

    // This method is a private convenience method for finding the index
    // of a user by id.
    function find(uint256 _id) private view returns (uint256) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == _id) {
                return i;
            }
        }
        revert("User not found.");
    }

    // This method demonstrates how to return multiple values.  The memory
    // keyword is required here due to string being a complex type.
    function read(uint256 _id) public view returns (uint256, string memory) {
        return (_id, users[find(_id)].name);
    }

    // This method updates a user's name by id.
    function update(uint256 _id, string memory _name) public {
        users[find(_id)].name = _name;
    }

    // This method removes a user by id.
    function destroy(uint256 _id) public {
        delete users[find(_id)];
    }
}
