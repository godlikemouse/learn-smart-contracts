const HelloWorld = artifacts.require("HelloWorld");

contract("HelloWorld", () => {
    it("Smart contract deployed", async () => {
        const helloWorld = await HelloWorld.deployed();
        assert(helloWorld.address != "");
    });

    it("hello method", async () => {
	    const helloWorld = await HelloWorld.deployed();
	    const response = await helloWorld.hello();
	    assert(response == "Hello World");
    });
});
