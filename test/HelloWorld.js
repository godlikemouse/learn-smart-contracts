const HelloWorld = artifacts.require("HelloWorld");

contract("HelloWorld", () => {
    it("Smart contract deployed", async () => {
        const helloWorld = await HelloWorld.deployed();
        assert(HelloWorld.address != "");
    });
});
