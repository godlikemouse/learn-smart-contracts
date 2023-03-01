# Learn how to write Ethereum smart contracts

This repository covers the modified code following the freeCodeCamp.org tutorial
[Build 5 Dapps on the Ethereum Blockchain - Beginner Tutorial](https://www.youtube.com/watch?v=8wMKq7HvbKw) on YouTube. This repository has been updated to work with React instead of vanilla JavaScript and webpack.

# Development Environment Setup

For my setup, I used Arch Linux. Please adapt the packages to your particular OS and distribution.

## Organization

Each contract has a corresponding test and ui implementation. You will find the matching name under `/test` and `/ui` respectively.

-   `/contracts` The Solidity contract source code.
-   `/migrations` The contract deployment source code.
-   `/test` The contract test source code.
-   `/ui` The web front end for each contract.

## Dependencies

Ensure truffle is installed

    yay -S truffle

## Local Development Mode

Start truffle in development mode:

    truffle develop

## Building

Compile contracts directly from the command line:

    truffle compile

Or under truffle development:

    truffle(develop)> compile

## Deploying

Deploy contracts directly from the command line:

    truffle deploy

Or under truffle development:

    truffle(develop)> deploy

To ensure latest code changes execute the following:

    truffle deploy --reset

Or under truffle development:

    truffle(develop)> deploy --reset

## Testing

To run the test suite, execute the following:

    truffle test

Or under truffle development:

    test

At the truffle console, interact with the contract:

    truffle(develop)> let hw = await HelloWorld.deployed()
    truffle(develop)> hw.hello()
