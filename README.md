## Development Environment Setup

### Dependencies

Ensure truffle and ganache are installed

    yay -S truffle ganache-bin

Start Ganache

    ganache losslesscut --no-sandbox

Select "Quickstart" from the Ganache UI. Take note of the RPC Server information.

Update the truffle-config.js with the RPC info for the `development` JSON section.

### Building

    truffle compile

### Deploying

    truffle deploy

To ensure latest code changes execute the following:

    truffle deploy --reset

To configure Ganache to use the deployed development contract. Click the "Contracts" tab in the Ganache UI and add the `truffle-config.js` file. Deploy the contract again and the contract addresses should show up correctly in the Ganache UI.

### Testing

To run the test suite, execute the following:

    truffle test

To interactively communicate with the contract:

    truffle console

At the truffle console, interact with the contract:

    truffle(development)> let instance = await SimpleSmartContract.deployed()
    truffle(development)> let accounts = await web3.eth.getAccounts()
