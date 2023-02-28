const SimpleSmartContract = artifacts.require("SimpleSmartContract");

contract("SimpleSmartContract", () => {
  it("Smart contract deployed", async () => {
    const simpleSmartContract = await SimpleSmartContract.deployed();
    assert(simpleSmartContract.address != "");
  });
});
