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

Ensure truffle and npm is installed

    yay -S truffle nodejs

Next install the npm dependencies for truffle:

    npm i

## Local Development Mode

Start truffle in development mode:

    truffle develop

## Testnet Development Mode (Görli)

The `truffle-config.js` has been setup to work with the Görli testnet.  To use the Görli testnet, create a file called `.secrets` at the root.

    touch .secrets

Populate the file with the following JSON:

    {
        "seed": "<your-mnemonic-seed>",
        "apiKey": "<your-infura-api-key>"
    }

The seed can be retrieved after starting truffle in development mode. For example:

    Mnemonic: off brother wonder crime sweet shoulder ugly defy dwarf crowd bundle inhale

The `seed` and `apiKey` are only needed to run on non-local testnet chains. If you are only running in local development mode, then you can leave both `seed` and `apiKey` as empty strings.

    {
        "seed": "",
        "apiKey": ""
    }

The `apiKey` requires a free account and a project to be setup on [infura.io](infura.io).  Once a new Etherum project has been created, change the network selection to `Görli` and copy the `API Key` into the `.settings` file replacing `apiKey` value.

Finally, start truffle using the Görli network:

    truffle develop --network gorli

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
