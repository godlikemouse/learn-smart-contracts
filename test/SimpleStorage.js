const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", () => {
    it("Simple storage contract deployed", async () => {
        const simpleStorage = await SimpleStorage.deployed();
        assert(SimpleStorage.address != "");
    });

    it("Calling the get function", async () => {
        const simpleStorage = await SimpleStorage.deployed();
        const result = await simpleStorage.get();
        assert(result == "mydata");
    });

    it("Calling the set function", async () => {
        const simpleStorage = await SimpleStorage.deployed();
        await simpleStorage.set("hello");
        const result = await simpleStorage.get();
        assert(result == "hello");
    });
});
