// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// This simple contract demonstrates the ability to receive payments and map
// those payments to account addresses.

// TODO: add ownership and limit balanceOf to owner only

contract MappingPayable {
    mapping(address => uint256) balances;
    uint256 total;

    // The external keyword is used as an optimization technique to
    // lower the cost of gas used when calling this function
    // see: https://docs.alchemy.com/docs/solidity-payable-functions for
    // details.  The payable keyword is used to allow the method to receive
    // ether.
    function deposit() external payable {
        balances[msg.sender] += msg.value;
        total += msg.value;
    }

    // This method retrieves the balance of a specified address.
    function balanceOf(address _address) public view returns (uint256) {
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
            "Withrawl amount exceeds account balance"
        );

        total -= _amount;
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }
}
