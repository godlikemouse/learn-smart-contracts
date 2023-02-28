const HelloWorld = artifacts.require("HelloWorld");

contract("HelloWorld", () => {
    let helloWorld = null;

    before(async () => {
        helloWorld = await HelloWorld.deployed();
    });

    it("Smart contract deployed", async () => {
        assert(helloWorld.address != "");
    });

    it("hello method", async () => {
        const response = await helloWorld.hello();
        assert(response == "Hello World");
    });
});
