// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// This simple contract demonstrates the ability to receive payments and map
// those payments to account addresses.

contract MappingPayable {
    mapping(address => uint256) balances;
    uint256 total;
    address owner;

    // The construtor will assign the owner address based on the
    // address responsible for deplying the contract.
    constructor() {
        owner = msg.sender;
    }

    // The external keyword is used as an optimization technique to
    // lower the cost of gas used when calling this function
    // see: https://docs.alchemy.com/docs/solidity-payable-functions for
    // details.  The payable keyword is used to allow the method to receive
    // ether.
    function deposit() external payable {
        balances[msg.sender] += msg.value;
        total += msg.value;
    }

    // This method retrieves the balance of a specified address.  The owner can
    // retrieve any balance.  Non-owner requests can only retrive the balance of
    // their own address.
    function balanceOf(address _address) public view returns (uint256) {
        require(
            _address == msg.sender || msg.sender == owner,
            "Invalid permission to view address balance."
        );
        return balances[_address];
    }

    // This method retrieves the total balance for the contract.
    function balance() public view returns (uint256) {
        return total;
    }

    // This method allows for the issuer to withdraw from their own account.
    function withdraw(uint256 _amount) public {
        require(
            _amount <= balances[msg.sender],
            "Withdrawl amount exceeds account balance"
        );

        total -= _amount;
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }
}
