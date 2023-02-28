## Development Environment Setup

### Dependencies

Ensure truffle is installed

    yay -S truffle

Start truffle development:

    truffle develop

Select "Quickstart" from the Ganache UI. Take note of the RPC Server information.

Update the truffle-config.js with the RPC info for the `development` JSON section.

### Building

    truffle compile

Or under truffle development:

    truffle(develop)> compile

### Deploying

    truffle deploy

Or under truffle development:

    truffle(develop)> deploy

To ensure latest code changes execute the following:

    truffle deploy --reset

Or under truffle development:

    truffle(develop)> deploy --reset

To configure Ganache to use the deployed development contract. Click the "Contracts" tab in the Ganache UI and add the `truffle-config.js` file. Deploy the contract again and the contract addresses should show up correctly in the Ganache UI.

### Testing

To run the test suite, execute the following:

    truffle test

Or under truffle development:

    test

At the truffle console, interact with the contract:

    truffle(develop)> let ssc = await SimpleSmartContract.deployed()
    truffle(develop)> let hw = await HelloWorld.deployed()
    truffle(develop)> hw.hello()
    truffle(develop)> let acc = await web3.eth.getAccounts()
